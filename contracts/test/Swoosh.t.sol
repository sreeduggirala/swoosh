//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "forge-std/Test.sol";
import "../src/Swoosh.sol";
import "./TestERC20.sol";

contract SwooshTest is Test {
    struct Request {
        uint256 id;
        address creditor; // the person requesting the money
        address[] debtors; // people who owe the money
        address[] paid;
        address[] rejected;
        uint256 amount;
        string message;
        string imageURI;
        uint256 timestamp;
        bool fulfilled; //if everyone pays back
        bool cancelled; // if issues decides to cancel
    }
    Swoosh swoosh;
    TestERC20 erc20;
    address mainUser = 0x9fEF0fD65A488D806b6433186A117e8Ac9a775DF;
    address sree = 0x8B603f2890694cF31689dFDA28Ff5e79917243e9;

    function setUp() external {
        erc20 = new TestERC20();
        swoosh = new Swoosh(address(erc20));
        erc20.mint(mainUser, 1000);
        vm.startPrank(mainUser);
        erc20.approve(address(swoosh), 1000);
        vm.stopPrank();
        erc20.mint(sree, 1000);
        vm.startPrank(sree);
        erc20.approve(address(swoosh), 1000);
        vm.stopPrank();
    }

    function testTokenBalance() external {
        assertEq(erc20.balanceOf(address(this)), 0);
        assertEq(erc20.balanceOf(sree), 1000);
        assertEq(erc20.balanceOf(mainUser), 1000);
    }

    function testDeposit() external {
        vm.startPrank(mainUser);
        swoosh.deposit(10);
        assertEq(swoosh.getBalance(mainUser), 10);
    }

    function testWithdraw() external {
        vm.startPrank(mainUser);
        swoosh.deposit(10);
        swoosh.withdraw(5);
        assertEq(swoosh.getBalance(mainUser), 5);
    }

    function testRequest() external {
        address[] memory from = new address[](1);
        from[0] = sree;
        vm.startPrank(mainUser);
        swoosh.request(from, 1, "hi", "");
        Swoosh.Request[] memory requestsOut = swoosh.getRequestsOut(mainUser);

        Swoosh.Request memory currentRequest = requestsOut[
            requestsOut.length - 1
        ];

        assertEq(currentRequest.debtors[0], sree);
        assertEq(currentRequest.amount, 1);
        assertEq(currentRequest.message, "hi");
        assertEq(currentRequest.imageURI, "");
    }

    function testPay() external {
        vm.startPrank(mainUser);
        swoosh.deposit(50);
        address to = sree;
        swoosh.pay(to, 10, "hi", "");

        Swoosh.Payment[] memory paymentsOut = swoosh.getPayments(mainUser);

        Swoosh.Payment memory currentPayment = paymentsOut[
            paymentsOut.length - 1
        ];

        assertEq(currentPayment.debtor, sree);
        assertEq(currentPayment.amount, 10);
        assertEq(currentPayment.message, "hi");
        assertEq(currentPayment.imageURI, "");
    }

    function testDecline() external {
        vm.startPrank(sree);
        swoosh.deposit(10);

        address[] memory from = new address[](1);
        from[0] = address(mainUser);
        swoosh.request(from, 1, "hi", "");
        vm.stopPrank();
        Swoosh.Request[] memory requestsOut = swoosh.getRequestsOut(sree);
        Swoosh.Request memory currentRequest = requestsOut[
            requestsOut.length - 1
        ];
        vm.startPrank(mainUser);
        swoosh.decline(currentRequest.id);
    }

    function testAccept() external {
        vm.startPrank(sree);
        swoosh.deposit(10);

        address[] memory from = new address[](1);
        from[0] = address(mainUser);
        swoosh.request(from, 1, "hi", "");
        vm.stopPrank();
        Swoosh.Request[] memory requestsOut = swoosh.getRequestsOut(sree);
        Swoosh.Request memory currentRequest = requestsOut[
            requestsOut.length - 1
        ];
        vm.startPrank(mainUser);
        swoosh.deposit(10);

        swoosh.accept(currentRequest.id);
    }

    function testAcceptAll() external {
        vm.startPrank(sree);
        swoosh.deposit(100);

        address[] memory from = new address[](1);
        from[0] = address(mainUser);
        swoosh.request(from, 1, "hi", "");
        swoosh.request(from, 2, "hi 2", "");
        vm.stopPrank();
        vm.startPrank(mainUser);
        swoosh.deposit(10);
        swoosh.acceptAll();
    }

    function testNudge() external {
        address[] memory from = new address[](1);
        from[0] = sree;
        vm.startPrank(mainUser);
        swoosh.request(from, 1, "hi", "");
        Swoosh.Request[] memory requestsOut = swoosh.getRequestsOut(mainUser);
        Swoosh.Request memory currentRequest = requestsOut[
            requestsOut.length - 1
        ];
        swoosh.nudge(currentRequest.debtors[0], currentRequest.id);
    }

    function testCancel() external {
        address[] memory from = new address[](1);
        from[0] = sree;
        vm.startPrank(mainUser);
        swoosh.request(from, 1, "hi", "");
        Swoosh.Request[] memory requestsOut = swoosh.getRequestsOut(mainUser);
        Swoosh.Request memory currentRequest = requestsOut[
            requestsOut.length - 1
        ];
        swoosh.cancel(currentRequest.id);
    }
}
