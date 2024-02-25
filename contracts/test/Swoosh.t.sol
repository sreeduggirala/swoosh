//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "forge-std/Test.sol";
import "../src/Swoosh.sol";

contract SwooshTest is Test {
    Swoosh swoosh;
    address mainUser = 0x9fEF0fD65A488D806b6433186A117e8Ac9a775DF;

    function setUp() external {
        swoosh = new Swoosh();
        vm.startPrank(mainUser);
        vm.deal(mainUser, 100);
    }

    function testDeposit() external {
        swoosh.deposit{value: 10}();
        assertEq(swoosh.getBalance(mainUser), 10);
    }

    function testWithdraw() external {
        swoosh.deposit{value: 10}();
        swoosh.withdraw(5);
        assertEq(swoosh.getBalance(mainUser), 5);
    }

    function testAddFriend() external {
        swoosh.addFriend(0x9fEF0fD65A488D806b6433186A117e8Ac9a775DF);

    }
}
