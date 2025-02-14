// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AdaWacana
 * @dev Contract untuk mengelola wishlist (wacana) dengan stake donasi
 */
contract AdaWacana is ReentrancyGuard, Pausable, Ownable {
    struct Wacana {
        address creator; // Pembuat wacana
        address verifier; // Validator yang ditunjuk
        uint256 deadline; // Batas waktu penyelesaian
        uint256 stake; // Jumlah ETH yang dipertaruhkan
        string title; // Judul wacana
        string description; // Deskripsi wacana
        WacanaStatus status; // Status wacana
        bool creatorConfirmed; // Konfirmasi dari creator
        bool verifierConfirmed; // Konfirmasi dari validator
        uint256 createdAt; // Waktu pembuatan
        uint256 completedAt; // Waktu penyelesaian
    }

    enum WacanaStatus {
        Active, // Wacana sedang berjalan
        Completed, // Wacana berhasil (dikonfirmasi kedua pihak)
        Failed, // Wacana gagal (self-report atau timeout)
        Cancelled // Wacana dibatalkan
    }

    // Events
    event WacanaCreated(
        uint256 indexed wacanaId,
        address indexed creator,
        address indexed verifier,
        uint256 deadline,
        uint256 stake
    );

    event CreatorConfirmed(uint256 indexed wacanaId);
    event VerifierConfirmed(uint256 indexed wacanaId);
    event WacanaCompleted(uint256 indexed wacanaId);
    event WacanaFailed(uint256 indexed wacanaId, address indexed charity);
    event WacanaCancelled(uint256 indexed wacanaId);
    event SelfReportFailed(uint256 indexed wacanaId);
    event CharityAddressUpdated(address indexed newCharity);
    event MinimumStakeUpdated(uint256 newMinimumStake);

    uint256 public wacanaCounter;
    uint256 public minimumStake;
    address public charityAddress;
    mapping(uint256 => Wacana) public wacanas;
    mapping(address => uint256[]) public userWacanas;
    mapping(address => uint256[]) public verifierWacanas;

    modifier onlyCreator(uint256 _wacanaId) {
        require(msg.sender == wacanas[_wacanaId].creator, "Not the creator");
        _;
    }

    modifier onlyVerifier(uint256 _wacanaId) {
        require(msg.sender == wacanas[_wacanaId].verifier, "Not the verifier");
        _;
    }

    modifier wacanaExists(uint256 _wacanaId) {
        require(
            wacanas[_wacanaId].creator != address(0),
            "Wacana does not exist"
        );
        _;
    }

    modifier wacanaActive(uint256 _wacanaId) {
        require(
            wacanas[_wacanaId].status == WacanaStatus.Active,
            "Wacana not active"
        );
        _;
    }

    constructor(
        address initialOwner,
        address _charityAddress,
        uint256 _minimumStake
    ) Ownable(initialOwner) {
        require(_charityAddress != address(0), "Invalid charity address");
        charityAddress = _charityAddress;
        minimumStake = _minimumStake;
    }

    function createWacana(
        address _verifier,
        uint256 _deadline,
        string memory _title,
        string memory _description
    ) external payable whenNotPaused nonReentrant {
        require(msg.value >= minimumStake, "Stake too low");
        require(_verifier != address(0), "Invalid verifier address");
        require(_verifier != msg.sender, "Cannot verify own wacana");
        require(_deadline > block.timestamp, "Invalid deadline");
        require(bytes(_title).length > 0, "Title required");

        uint256 wacanaId = wacanaCounter++;

        Wacana storage newWacana = wacanas[wacanaId];
        newWacana.creator = msg.sender;
        newWacana.verifier = _verifier;
        newWacana.deadline = _deadline;
        newWacana.stake = msg.value;
        newWacana.title = _title;
        newWacana.description = _description;
        newWacana.status = WacanaStatus.Active;
        newWacana.creatorConfirmed = false;
        newWacana.verifierConfirmed = false;
        newWacana.createdAt = block.timestamp;

        userWacanas[msg.sender].push(wacanaId);
        verifierWacanas[_verifier].push(wacanaId);

        emit WacanaCreated(
            wacanaId,
            msg.sender,
            _verifier,
            _deadline,
            msg.value
        );
    }

    function confirmCompletion(
        uint256 _wacanaId
    )
        external
        whenNotPaused
        nonReentrant
        wacanaExists(_wacanaId)
        wacanaActive(_wacanaId)
    {
        Wacana storage wacana = wacanas[_wacanaId];
        require(block.timestamp <= wacana.deadline, "Deadline passed");
        require(
            msg.sender == wacana.creator || msg.sender == wacana.verifier,
            "Not authorized"
        );

        if (msg.sender == wacana.creator) {
            require(!wacana.creatorConfirmed, "Already confirmed");
            wacana.creatorConfirmed = true;
            emit CreatorConfirmed(_wacanaId);
        } else {
            require(!wacana.verifierConfirmed, "Already confirmed");
            wacana.verifierConfirmed = true;
            emit VerifierConfirmed(_wacanaId);
        }

        // Jika kedua pihak sudah konfirmasi, selesaikan wacana
        if (wacana.creatorConfirmed && wacana.verifierConfirmed) {
            wacana.status = WacanaStatus.Completed;
            wacana.completedAt = block.timestamp;

            // Kembalikan stake ke creator
            (bool success, ) = wacana.creator.call{value: wacana.stake}("");
            require(success, "Transfer failed");

            emit WacanaCompleted(_wacanaId);
        }
    }

    function selfReportFailure(
        uint256 _wacanaId
    )
        external
        whenNotPaused
        nonReentrant
        wacanaExists(_wacanaId)
        wacanaActive(_wacanaId)
        onlyCreator(_wacanaId)
    {
        Wacana storage wacana = wacanas[_wacanaId];
        wacana.status = WacanaStatus.Failed;
        wacana.completedAt = block.timestamp;

        // Kirim stake ke charity
        (bool success, ) = charityAddress.call{value: wacana.stake}("");
        require(success, "Transfer failed");

        emit SelfReportFailed(_wacanaId);
        emit WacanaFailed(_wacanaId, charityAddress);
    }

    function processTimeout(
        uint256 _wacanaId
    )
        external
        whenNotPaused
        nonReentrant
        wacanaExists(_wacanaId)
        wacanaActive(_wacanaId)
    {
        Wacana storage wacana = wacanas[_wacanaId];
        require(block.timestamp > wacana.deadline, "Deadline not passed");
        require(
            !wacana.creatorConfirmed || !wacana.verifierConfirmed,
            "Already confirmed by both"
        );

        wacana.status = WacanaStatus.Failed;
        wacana.completedAt = block.timestamp;

        // Kirim stake ke charity
        (bool success, ) = charityAddress.call{value: wacana.stake}("");
        require(success, "Transfer failed");

        emit WacanaFailed(_wacanaId, charityAddress);
    }

    function getWacana(
        uint256 _wacanaId
    )
        external
        view
        returns (
            address creator,
            address verifier,
            uint256 deadline,
            uint256 stake,
            string memory title,
            string memory description,
            WacanaStatus status,
            bool creatorConfirmed,
            bool verifierConfirmed,
            uint256 createdAt,
            uint256 completedAt
        )
    {
        Wacana memory wacana = wacanas[_wacanaId];
        return (
            wacana.creator,
            wacana.verifier,
            wacana.deadline,
            wacana.stake,
            wacana.title,
            wacana.description,
            wacana.status,
            wacana.creatorConfirmed,
            wacana.verifierConfirmed,
            wacana.createdAt,
            wacana.completedAt
        );
    }

    function getUserWacanas(
        address _user
    ) external view returns (uint256[] memory) {
        return userWacanas[_user];
    }

    function getVerifierWacanas(
        address _verifier
    ) external view returns (uint256[] memory) {
        return verifierWacanas[_verifier];
    }

    function updateCharityAddress(
        address _newCharityAddress
    ) external onlyOwner {
        require(_newCharityAddress != address(0), "Invalid charity address");
        charityAddress = _newCharityAddress;
        emit CharityAddressUpdated(_newCharityAddress);
    }

    function updateMinimumStake(uint256 _newMinimumStake) external onlyOwner {
        minimumStake = _newMinimumStake;
        emit MinimumStakeUpdated(_newMinimumStake);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
