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
        assertGt(createdAt, 0);
        assertEq(completedAt, 0);
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

    function test_CompleteWacana() public {
        // First create a wacana
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

        // Complete the wacana
        vm.prank(user2);
        adaWacana.completeWacana(0);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            AdaWacana.WacanaStatus status,
            ,
            uint256 completedAt
        ) = adaWacana.getWacana(0);

        assertEq(uint(status), uint(AdaWacana.WacanaStatus.Completed));
        assertGt(completedAt, 0);
        assertEq(user1.balance, initialBalance + stake);
    }

    function test_FailWacana() public {
        // First create a wacana
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

        // Warp time past deadline
        vm.warp(block.timestamp + 2 days);

        // Fail the wacana
        vm.prank(user2);
        adaWacana.failWacana(0);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            AdaWacana.WacanaStatus status,
            ,
            uint256 completedAt
        ) = adaWacana.getWacana(0);

        assertEq(uint(status), uint(AdaWacana.WacanaStatus.Failed));
        assertGt(completedAt, 0);
        assertEq(charity.balance, initialCharityBalance + stake);
    }

    function test_CancelWacana() public {
        // First create a wacana
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

        // Cancel the wacana
        vm.prank(user1);
        adaWacana.cancelWacana(0);

        (
            ,
            ,
            ,
            ,
            ,
            ,
            AdaWacana.WacanaStatus status,
            ,
            uint256 completedAt
        ) = adaWacana.getWacana(0);

        assertEq(uint(status), uint(AdaWacana.WacanaStatus.Cancelled));
        assertEq(user1.balance, initialBalance + stake);
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
