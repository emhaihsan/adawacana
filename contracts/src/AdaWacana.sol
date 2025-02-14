// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AdaWacana
 * @dev A smart contract for managing commitments (wacana) with financial stakes
 */
contract AdaWacana is ReentrancyGuard, Pausable, Ownable {
    // Struct untuk menyimpan data wacana
    struct Wacana {
        address creator;        // Pembuat wacana
        address verifier;       // Verifikator yang ditunjuk
        uint256 deadline;       // Batas waktu penyelesaian
        uint256 stake;         // Jumlah ETH yang dipertaruhkan
        string title;          // Judul wacana
        string description;    // Deskripsi wacana
        WacanaStatus status;   // Status wacana
        uint256 createdAt;     // Waktu pembuatan
        uint256 completedAt;   // Waktu penyelesaian
    }

    // Enum untuk status wacana
    enum WacanaStatus {
        Active,     // Wacana sedang berjalan
        Completed,  // Wacana berhasil diselesaikan
        Failed,     // Wacana gagal dan donasi dikirim
        Cancelled   // Wacana dibatalkan (hanya jika verifier belum dikonfirmasi)
    }

    // Events
    event WacanaCreated(
        uint256 indexed wacanaId,
        address indexed creator,
        address indexed verifier,
        uint256 deadline,
        uint256 stake
    );
    
    event WacanaVerified(uint256 indexed wacanaId, address indexed verifier);
    event WacanaCompleted(uint256 indexed wacanaId);
    event WacanaFailed(uint256 indexed wacanaId, address indexed charity);
    event WacanaCancelled(uint256 indexed wacanaId);
    event CharityAddressUpdated(address indexed newCharity);
    event MinimumStakeUpdated(uint256 newMinimumStake);

    // State variables
    uint256 public wacanaCounter;
    uint256 public minimumStake;
    address public charityAddress;
    mapping(uint256 => Wacana) public wacanas;
    mapping(address => uint256[]) public userWacanas;
    mapping(address => uint256[]) public verifierWacanas;

    // Modifiers
    modifier onlyCreator(uint256 _wacanaId) {
        require(msg.sender == wacanas[_wacanaId].creator, "Not the creator");
        _;
    }

    modifier onlyVerifier(uint256 _wacanaId) {
        require(msg.sender == wacanas[_wacanaId].verifier, "Not the verifier");
        _;
    }

    modifier wacanaExists(uint256 _wacanaId) {
        require(wacanas[_wacanaId].creator != address(0), "Wacana does not exist");
        _;
    }

    modifier wacanaActive(uint256 _wacanaId) {
        require(wacanas[_wacanaId].status == WacanaStatus.Active, "Wacana not active");
        _;
    }

    /**
     * @dev Constructor untuk menginisialisasi kontrak
     * @param _charityAddress Alamat charity default
     * @param _minimumStake Minimum stake dalam wei
     */
    constructor(address _charityAddress, uint256 _minimumStake) {
        require(_charityAddress != address(0), "Invalid charity address");
        charityAddress = _charityAddress;
        minimumStake = _minimumStake;
    }

    /**
     * @dev Membuat wacana baru
     * @param _verifier Alamat verifikator
     * @param _deadline Batas waktu penyelesaian (UNIX timestamp)
     * @param _title Judul wacana
     * @param _description Deskripsi wacana
     */
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
        newWacana.createdAt = block.timestamp;

        userWacanas[msg.sender].push(wacanaId);
        verifierWacanas[_verifier].push(wacanaId);

        emit WacanaCreated(wacanaId, msg.sender, _verifier, _deadline, msg.value);
    }

    /**
     * @dev Menandai wacana sebagai selesai
     * @param _wacanaId ID wacana
     */
    function completeWacana(uint256 _wacanaId) 
        external 
        whenNotPaused
        nonReentrant 
        wacanaExists(_wacanaId)
        wacanaActive(_wacanaId)
        onlyVerifier(_wacanaId)
    {
        Wacana storage wacana = wacanas[_wacanaId];
        wacana.status = WacanaStatus.Completed;
        wacana.completedAt = block.timestamp;

        // Kembalikan stake ke creator
        (bool success, ) = wacana.creator.call{value: wacana.stake}("");
        require(success, "Transfer failed");

        emit WacanaCompleted(_wacanaId);
    }

    /**
     * @dev Menandai wacana sebagai gagal
     * @param _wacanaId ID wacana
     */
    function failWacana(uint256 _wacanaId)
        external
        whenNotPaused
        nonReentrant
        wacanaExists(_wacanaId)
        wacanaActive(_wacanaId)
        onlyVerifier(_wacanaId)
    {
        Wacana storage wacana = wacanas[_wacanaId];
        require(block.timestamp > wacana.deadline, "Deadline not passed");

        wacana.status = WacanaStatus.Failed;
        wacana.completedAt = block.timestamp;

        // Kirim stake ke charity
        (bool success, ) = charityAddress.call{value: wacana.stake}("");
        require(success, "Transfer failed");

        emit WacanaFailed(_wacanaId, charityAddress);
    }

    /**
     * @dev Membatalkan wacana yang belum diverifikasi
     * @param _wacanaId ID wacana
     */
    function cancelWacana(uint256 _wacanaId)
        external
        whenNotPaused
        nonReentrant
        wacanaExists(_wacanaId)
        wacanaActive(_wacanaId)
        onlyCreator(_wacanaId)
    {
        Wacana storage wacana = wacanas[_wacanaId];
        wacana.status = WacanaStatus.Cancelled;

        // Kembalikan stake ke creator
        (bool success, ) = wacana.creator.call{value: wacana.stake}("");
        require(success, "Transfer failed");

        emit WacanaCancelled(_wacanaId);
    }

    /**
     * @dev Mengupdate alamat charity
     * @param _newCharityAddress Alamat charity baru
     */
    function updateCharityAddress(address _newCharityAddress) external onlyOwner {
        require(_newCharityAddress != address(0), "Invalid charity address");
        charityAddress = _newCharityAddress;
        emit CharityAddressUpdated(_newCharityAddress);
    }

    /**
     * @dev Mengupdate minimum stake
     * @param _newMinimumStake Minimum stake baru dalam wei
     */
    function updateMinimumStake(uint256 _newMinimumStake) external onlyOwner {
        minimumStake = _newMinimumStake;
        emit MinimumStakeUpdated(_newMinimumStake);
    }

    /**
     * @dev Mendapatkan wacana berdasarkan ID
     * @param _wacanaId ID wacana
     */
    function getWacana(uint256 _wacanaId) external view returns (
        address creator,
        address verifier,
        uint256 deadline,
        uint256 stake,
        string memory title,
        string memory description,
        WacanaStatus status,
        uint256 createdAt,
        uint256 completedAt
    ) {
        Wacana memory wacana = wacanas[_wacanaId];
        return (
            wacana.creator,
            wacana.verifier,
            wacana.deadline,
            wacana.stake,
            wacana.title,
            wacana.description,
            wacana.status,
            wacana.createdAt,
            wacana.completedAt
        );
    }

    /**
     * @dev Mendapatkan daftar wacana user
     * @param _user Alamat user
     */
    function getUserWacanas(address _user) external view returns (uint256[] memory) {
        return userWacanas[_user];
    }

    /**
     * @dev Mendapatkan daftar wacana yang perlu diverifikasi
     * @param _verifier Alamat verifikator
     */
    function getVerifierWacanas(address _verifier) external view returns (uint256[] memory) {
        return verifierWacanas[_verifier];
    }

    /**
     * @dev Pause kontrak
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause kontrak
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
