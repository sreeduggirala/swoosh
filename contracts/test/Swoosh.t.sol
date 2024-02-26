//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "forge-std/Test.sol";
import "../src/Swoosh.sol";

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

    function testRequest() external {
        address[] memory from = new address[](2);
        from[0] = address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9);
        from[1] = address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9);
        swoosh.request(from, 1, "hi", "");
        Swoosh.Request[] memory requestsOut = swoosh.getRequestsOut(mainUser);

        Swoosh.Request memory currentRequest = requestsOut[
            requestsOut.length - 1
        ];

        assertEq(
            currentRequest.debtors[0],
            address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9)
        );
        assertEq(
            currentRequest.debtors[1],
            address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9)
        );
        assertEq(currentRequest.amount, 1);
        assertEq(currentRequest.message, "hi");
        assertEq(currentRequest.imageURI, "");
    }

    function testPay() external {
        swoosh.deposit{value: 50}();
        address to = address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9);
        swoosh.pay(to, 10, "hi", "");

        Swoosh.Payment[] memory paymentsOut = swoosh.getPayments(mainUser);

        Swoosh.Payment memory currentPayment = paymentsOut[
            paymentsOut.length - 1
        ];

        assertEq(
            currentPayment.debtor,
            address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9)
        );
        assertEq(currentPayment.amount, 10);
        assertEq(currentPayment.message, "hi");
        assertEq(currentPayment.imageURI, "");
    }

    // function testDecline() external {}

    function testAccept() external {
        vm.stopPrank();

        vm.startPrank(address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9));
        vm.deal(address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9), 100);
        address[] memory from = new address[](1);
        from[0] = address(mainUser);
        swoosh.request(from, 1, "hi", "");
        Swoosh.Request[] memory requestsOut = swoosh.getRequestsOut(mainUser);
        assert(requestsOut.length > 0);
        // Swoosh.Request memory currentRequest = requestsOut[
        //     requestsOut.length - 1
        // ];

        // swoosh.accept(currentRequest.id);
    }

    // function testCancel() external {
    //     address[] memory from = new address[](2);
    //     from[0] = address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9);
    //     from[1] = address(0x8B603f2890694cF31689dFDA28Ff5e79917243e9);
    //     swoosh.request(from, 1, "hi", "");
    //     Swoosh.Request[] memory requestsOut = swoosh.getRequestsOut(mainUser);
    //     Swoosh.Request memory currentRequest = requestsOut[
    //         requestsOut.length - 1
    //     ];

    //     swoosh.cancel(currentRequest.id);
    // }
}
