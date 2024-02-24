//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract SwooshStorage {
    struct Request {
        address sender;
        address[] receivers;
        uint256 amount;
        uint256 timestamp;
        bool isApproved;
        bool isRejected;
        bool isCanceled;
    }

    struct Payment {
        address sender;
        address[] receivers;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => uint256) public balance;
    mapping(address => Request[]) public requests;
}

contract Swoosh is SwooshStorage {
    // @notice: Create a new request
    // @params:
    function request() public {}

    // @notice: Create a new payment
    // @params:
    function pay() public {}

    // @notice: Approve an incoming request
    // @params:
    function approve() public {}

    // @notice: Reject an incoming request
    // @params:
    function reject() public {}

    // @notice:
    // @params:
    function getHistory() public {}

    // @notice:
    // @params:
    function getPending() public {}

    // @notice:
    // @params:
    function getBalance() public {}
}
