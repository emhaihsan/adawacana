// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {AdaWacana} from "../src/AdaWacana.sol";

contract AdaWacanaTest is Test {
    AdaWacana public adaWacana;
    address public owner;
    address public charity;
    address public user1;
    address public user2;
    uint256 public minimumStake;

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
    event SelfReportFailed(uint256 indexed wacanaId);

    function setUp() public {
        owner = makeAddr("owner");
        charity = makeAddr("charity");
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        minimumStake = 0.1 ether;

        vm.prank(owner);
        adaWacana = new AdaWacana(owner, charity, minimumStake);
    }

    function test_InitialState() public {
        assertEq(adaWacana.owner(), owner);
        assertEq(adaWacana.charityAddress(), charity);
        assertEq(adaWacana.minimumStake(), minimumStake);
        assertEq(adaWacana.wacanaCounter(), 0);
    }

    function test_CreateWacana() public {
        string memory title = "Learn Solidity";
        string memory description = "Complete the Solidity course";
        uint256 deadline = block.timestamp + 7 days;
        uint256 stake = 0.5 ether;

        vm.deal(user1, stake);

        vm.prank(user1);
        vm.expectEmit(true, true, true, true);
        emit WacanaCreated(0, user1, user2, deadline, stake);

        adaWacana.createWacana{value: stake}(
            user2,
            deadline,
            title,
            description
        );

        (
            address creator,
            address verifier,
            uint256 wacanaDeadline,
            uint256 wacanaStake,
            string memory wacanaTitle,
            string memory wacanaDescription,
            AdaWacana.WacanaStatus status,
            bool creatorConfirmed,
            bool verifierConfirmed,
            uint256 createdAt,
            uint256 completedAt
        ) = adaWacana.getWacana(0);

        assertEq(creator, user1);
        assertEq(verifier, user2);
        assertEq(wacanaDeadline, deadline);
        assertEq(wacanaStake, stake);
        assertEq(wacanaTitle, title);
        assertEq(wacanaDescription, description);
        assertEq(uint(status), uint(AdaWacana.WacanaStatus.Active));
        assertEq(creatorConfirmed, false);
        assertEq(verifierConfirmed, false);
        assertGt(createdAt, 0);
        assertEq(completedAt, 0);

        // Test wacana tracking
        uint256[] memory userWacanas = adaWacana.getUserWacanas(user1);
        uint256[] memory verifierWacanas = adaWacana.getVerifierWacanas(user2);

        assertEq(userWacanas.length, 1);
        assertEq(verifierWacanas.length, 1);
        assertEq(userWacanas[0], 0);
        assertEq(verifierWacanas[0], 0);
    }

    function testFail_CreateWacanaWithLowStake() public {
        vm.deal(user1, 0.05 ether);

        vm.prank(user1);
        adaWacana.createWacana{value: 0.05 ether}(
            user2,
            block.timestamp + 1 days,
            "Test",
            "Test Description"
        );
    }

    function test_SuccessfulCompletion() public {
        // Setup: Create wacana
        uint256 stake = 0.5 ether;
        vm.deal(user1, stake);

        vm.prank(user1);
        adaWacana.createWacana{value: stake}(
            user2,
            block.timestamp + 7 days,
            "Test",
            "Test Description"
        );

        uint256 initialBalance = user1.balance;

        // Creator confirms
        vm.prank(user1);
        vm.expectEmit(true, false, false, false);
        emit CreatorConfirmed(0);
        adaWacana.confirmCompletion(0);

        // Verifier confirms
        vm.prank(user2);
        vm.expectEmit(true, false, false, false);
        emit VerifierConfirmed(0);
        vm.expectEmit(true, false, false, false);
        emit WacanaCompleted(0);
        adaWacana.confirmCompletion(0);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            AdaWacana.WacanaStatus status,
            bool creatorConfirmed,
            bool verifierConfirmed,
            ,
            uint256 completedAt
        ) = adaWacana.getWacana(0);

        assertEq(uint(status), uint(AdaWacana.WacanaStatus.Completed));
        assertTrue(creatorConfirmed);
        assertTrue(verifierConfirmed);
        assertGt(completedAt, 0);
        assertEq(user1.balance, initialBalance + stake);
    }

    function test_SelfReportFailure() public {
        // Setup: Create wacana
        uint256 stake = 0.5 ether;
        vm.deal(user1, stake);

        vm.prank(user1);
        adaWacana.createWacana{value: stake}(
            user2,
            block.timestamp + 7 days,
            "Test",
            "Test Description"
        );

        uint256 initialCharityBalance = charity.balance;

        // Self report failure
        vm.prank(user1);
        vm.expectEmit(true, false, false, false);
        emit SelfReportFailed(0);
        vm.expectEmit(true, true, false, false);
        emit WacanaFailed(0, charity);
        adaWacana.selfReportFailure(0);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            AdaWacana.WacanaStatus status,
            ,
            ,
            ,
            uint256 completedAt
        ) = adaWacana.getWacana(0);

        assertEq(uint(status), uint(AdaWacana.WacanaStatus.Failed));
        assertGt(completedAt, 0);
        assertEq(charity.balance, initialCharityBalance + stake);
    }

    function test_TimeoutFailure() public {
        // Setup: Create wacana
        uint256 stake = 0.5 ether;
        vm.deal(user1, stake);

        vm.prank(user1);
        adaWacana.createWacana{value: stake}(
            user2,
            block.timestamp + 1 days,
            "Test",
            "Test Description"
        );

        uint256 initialCharityBalance = charity.balance;

        // Move time past deadline
        vm.warp(block.timestamp + 2 days);

        // Process timeout
        vm.expectEmit(true, true, false, false);
        emit WacanaFailed(0, charity);
        adaWacana.processTimeout(0);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            AdaWacana.WacanaStatus status,
            ,
            ,
            ,
            uint256 completedAt
        ) = adaWacana.getWacana(0);

        assertEq(uint(status), uint(AdaWacana.WacanaStatus.Failed));
        assertGt(completedAt, 0);
        assertEq(charity.balance, initialCharityBalance + stake);
    }

    function test_PartialConfirmationTimeout() public {
        // Setup: Create wacana
        uint256 stake = 0.5 ether;
        vm.deal(user1, stake);

        vm.prank(user1);
        adaWacana.createWacana{value: stake}(
            user2,
            block.timestamp + 1 days,
            "Test",
            "Test Description"
        );

        // Creator confirms but verifier doesn't
        vm.prank(user1);
        adaWacana.confirmCompletion(0);

        uint256 initialCharityBalance = charity.balance;

        // Move time past deadline
        vm.warp(block.timestamp + 2 days);

        // Process timeout
        vm.expectEmit(true, true, false, false);
        emit WacanaFailed(0, charity);
        adaWacana.processTimeout(0);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            AdaWacana.WacanaStatus status,
            bool creatorConfirmed,
            bool verifierConfirmed,
            ,
            uint256 completedAt
        ) = adaWacana.getWacana(0);

        assertEq(uint(status), uint(AdaWacana.WacanaStatus.Failed));
        assertTrue(creatorConfirmed);
        assertFalse(verifierConfirmed);
        assertGt(completedAt, 0);
        assertEq(charity.balance, initialCharityBalance + stake);
    }

    function testFail_ConfirmAfterDeadline() public {
        // Setup: Create wacana
        uint256 stake = 0.5 ether;
        vm.deal(user1, stake);

        vm.prank(user1);
        adaWacana.createWacana{value: stake}(
            user2,
            block.timestamp + 1 days,
            "Test",
            "Test Description"
        );

        // Move time past deadline
        vm.warp(block.timestamp + 2 days);

        // Try to confirm after deadline
        vm.prank(user1);
        adaWacana.confirmCompletion(0);
    }

    function test_UpdateCharityAddress() public {
        address newCharity = makeAddr("newCharity");

        vm.prank(owner);
        adaWacana.updateCharityAddress(newCharity);

        assertEq(adaWacana.charityAddress(), newCharity);
    }

    function testFail_UpdateCharityAddressNonOwner() public {
        address newCharity = makeAddr("newCharity");

        vm.prank(user1);
        adaWacana.updateCharityAddress(newCharity);
    }

    receive() external payable {}
}
