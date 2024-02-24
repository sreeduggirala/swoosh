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
    mapping(address => Request[]) public requestsOut;
    mapping(address => Request[]) public requestsIn;
    mapping(address => Payment[]) public payments;
    mapping(address => address[]) public friends;
}

contract Swoosh is SwooshStorage {
    modifier sufficientBalance(uint256 amount) {
        if (balance[msg.sender] < amount) {
            revert("Insufficient balance");
        }
        _;
    }

    // @notice: Create a new request
    // @params: debtor(s), amount
    function request(address[] memory debtors, uint256 amount) public {
        requestsOut[msg.sender].push(
            Request(
                msg.sender,
                debtors,
                amount,
                block.timestamp,
                false,
                false,
                false
            )
        );
    }

    // @notice: Create a new payment
    // @params: creditor(s), amount
    function pay(
        address[] memory creditors,
        uint256 amount
    ) public sufficientBalance(amount) {
        balance[msg.sender] -= amount;
        payments[msg.sender].push(
            Payment(msg.sender, creditors, amount, block.timestamp)
        );
    }

    // @notice: Approve an incoming request
    // @params: request ID
    function approve(uint256 requestId) public {}

    // @notice: Reject an incoming request
    // @params: request ID
    function reject(uint256 requestId) public {}

    // @notice: Deposit funds to app
    function deposit() public payable {
        balance[msg.sender] += msg.value;
    }

    // @notice: Withdraw funds to the user's wallet
    // @params: amount to withdraw
    function withdraw(uint256 amount) public {
        if (balance[msg.sender] < amount) {
            revert("Insufficient balance");
        }
        balance[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    // @notice: Add address/ENS to address book
    // @params: Address of friend
    function addFriend(address friend) public {
        friends[msg.sender].push(friend);
    }

    // @notice: Remove address/ENS from address book
    // @params: Address of friend
    function removeFriend(address friend) public {
        for (uint256 i = 0; i < friends[msg.sender].length; i++) {
            if (friends[msg.sender][i] == friend) {
                friends[msg.sender][i] = friends[msg.sender][
                    friends[msg.sender].length - 1
                ];
                friends[msg.sender].pop();
            }
        }
    }

    // @notice: Get payment history
    // @params: User's address
    function getHistory(address user) public view returns (Payment[] memory) {
        return payments[user];
    }

    // @notice: Get pending incoming requests
    // @params: User's address
    function getRequestsIn(
        address user
    ) public view returns (Request[] memory) {
        return requestsIn[user];
    }

    // @notice: Get pending outgoing requests
    // @params: User's address
    function getRequestsOut(
        address user
    ) public view returns (Request[] memory) {
        return requestsOut[user];
    }

    // @notice: Get user balance
    // @params: User's address
    function getBalance(address user) public view returns (uint256) {
        return balance[user];
    }
}
