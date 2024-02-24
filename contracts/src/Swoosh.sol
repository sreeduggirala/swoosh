//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract SwooshStorage {
    struct Request {
        uint256 id;
        address sender;
        address[] receivers;
        uint256 amount;
        uint256 timestamp;
        bool isApproved;
        bool isRejected;
        bool isCanceled;
    }

    struct Payment {
        uint256 id;
        address sender;
        address[] receivers;
        uint256 amount;
        uint256 timestamp;
    }

    Request[] public requests;
    Payment[] public payments;

    mapping(address => uint256) public balance;
    mapping(address => uint256[]) public requestsOut;
    mapping(address => uint256[]) public requestsIn;
    mapping(address => uint256[]) public paymentsOut;
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
        uint256 id = requests.length;
        requests.push(
            Request(
                id,
                msg.sender,
                debtors,
                amount,
                block.timestamp,
                false,
                false,
                false
            )
        );

        for (uint256 i = 0; i < debtors.length; i++) {
            requestsIn[debtors[i]].push(id);
        }
    }

    // @notice: Create a new payment
    // @params: creditor(s), amount
    function pay(
        address[] memory creditors,
        uint256 amount
    ) public sufficientBalance(amount) {
        uint256 id = payments.length;
        payments.push(
            Payment(id, msg.sender, creditors, amount, block.timestamp)
        );
        paymentsOut[msg.sender].push(id);
        balance[msg.sender] -= amount;
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
        for (uint256 i = 0; i < friends[msg.sender].length; i++) {
            if (friends[msg.sender][i] == friend) {
                revert("This user is already your friend");
            }
        }
        friends[msg.sender].push(friend);
    }

    // @notice: Remove address/ENS from address book
    // @params: Address of friend
    function removeFriend(address friend) public {
        uint256 totalFriends = friends[msg.sender].length;
        for (uint256 i = 0; i < friends[msg.sender].length; i++) {
            if (friends[msg.sender][i] == friend) {
                friends[msg.sender][i] = friends[msg.sender][totalFriends - 1];
                friends[msg.sender].pop();
            } else if (i == totalFriends - 1) {
                revert("This user is not your friend");
            }
        }
    }

    // @notice: Get address book
    function getFriends() public view returns (address[] memory) {
        return friends[msg.sender];
    }

    // @notice: Get payment history
    // @params: User's address
    function getHistory(address user) public view returns (uint256[] memory) {
        return paymentsOut[user];
    }

    // @notice: Get pending incoming requests
    // @params: User's address
    function getRequestsIn(
        address user
    ) public view returns (uint256[] memory) {
        return requestsIn[user];
    }

    // @notice: Get pending outgoing requests
    // @params: User's address
    function getRequestsOut(
        address user
    ) public view returns (uint256[] memory) {
        return requestsOut[user];
    }

    // @notice: Get user balance
    // @params: User's address
    function getBalance(address user) public view returns (uint256) {
        return balance[user];
    }
}
