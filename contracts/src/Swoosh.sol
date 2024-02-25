//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SwooshStorage {
    struct Request {
        uint256 id;
        address creditor; // the person requesting the money
        address[] debtors; // people who owe the money
        address[] paid;
        uint256 amount;
        uint256 timestamp;
        bool fulfilled; //if everyone pays back
    }

    struct Payment {
        uint256 id;
        address creditor;
        address debtors;
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

    event newRequest(
        address creditor,
        address[] debtors,
        uint256 indexed requestId
    );
    event newPayment(
        address creditor,
        address[] debtors,
        uint256 indexed paymentId
    );
    event accepted(address debtor, address creditor, uint256 indexed requestId);
    event rejected(address debtor, address creditor, uint256 indexed requestId);
    event nudged(address creditor, address debtor);
    event deposited(address user, uint256 amount);
    event withdrew(address user, uint256 amount);
}

contract Swoosh is SwooshStorage {
    modifier sufficientBalance(uint256 amount) {
        if (balance[msg.sender] < amount) {
            revert("Insufficient balance");
        }
        _;
    }

    modifier notProcessed(Request memory currentRequest) {
        if (currentRequest.fulfilled) {
            revert("Request already processed");
        }
        _;
    }

    modifier validAddress(address user) {
        if (user == address(0)) {
            revert("Invalid address");
        }
        _;
    }

    // @notice: Create a new request
    // @params: debtor(s), amount
    function request(address[] memory from, uint256 amount) public {
        for (uint256 i = 0; i < from.length; i++) {
            if (from[i] == address(0)) {
                revert("Invalid address");
            }
        }

        uint256 id = requests.length;
        address[] memory reimbursed;
        requests.push(
            Request(
                id,
                msg.sender,
                from,
                reimbursed,
                amount,
                block.timestamp,
                false
            )
        );

        for (uint256 i = 0; i < from.length; i++) {
            requestsIn[from[i]].push(id);
        }
    }

    // @notice: Create a new payment
    // @params: creditor, amount
    function pay(
        address to,
        uint256 amount
    ) public sufficientBalance(amount) validAddress(to) {
        uint256 id = payments.length;
        payments.push(Payment(id, msg.sender, to, amount, block.timestamp));
        paymentsOut[msg.sender].push(id);
        balance[msg.sender] -= amount;
        balance[to] += amount;
    }

    // @notice: Approve an incoming request
    // @params: request ID
    function accept(
        uint256 requestId
    )
        public
        sufficientBalance(requests[requestId].amount)
        notProcessed(requests[requestId])
    {
        Request storage currentRequest = requests[requestId];

        bool found = false;
        for (uint256 i = 0; i < currentRequest.debtors.length; i++) {
            if (currentRequest.debtors[i] == msg.sender) {
                found = true;
                if (currentRequest.debtors.length != 1) {
                    currentRequest.debtors[i] = currentRequest.debtors[
                        currentRequest.debtors.length
                    ];
                }
                currentRequest.debtors.pop();
            }
        }

        if (!found) {
            revert("You are not in this request");
        }

        currentRequest.paid.push(msg.sender);

        balance[msg.sender] -= currentRequest.amount;
        balance[currentRequest.creditor] += currentRequest.amount;
        currentRequest.fulfilled = true;

        emit accepted(currentRequest.creditor, msg.sender, currentRequest.id);

        // have all users reimbursed the sender? if so, isApproved = true
        // if not, keep track of who has reimbursed the sender
    }

    // @notice: Reject an incoming request
    // @params: request ID
    function reject(
        uint256 requestId
    ) public notProcessed(requests[requestId]) {
        Request storage currentRequest = requests[requestId];

        bool found = false;
        for (uint256 i = 0; i < currentRequest.debtors.length; i++) {
            if (currentRequest.debtors[i] == msg.sender) {
                found = true;
                currentRequest.debtors[i] = currentRequest.debtors[
                    currentRequest.debtors.length
                ];
                currentRequest.debtors.pop();
            }
        }

        if (!found) {
            revert("You are not in this request");
        }

        emit rejected(currentRequest.creditor, msg.sender, currentRequest.id);
    }

    // @notice: Reminds debtor to pay via push notification
    // @params: Request ID, debtor's address
    function nudge(uint256 requestId, address debtor) public {
        // initiate push notification reminder for repayment
        emit nudged(msg.sender, debtor);
    }

    // @notice: Deposit funds to app
    function deposit() public payable {
        balance[msg.sender] += msg.value;
        emit deposited(msg.sender, msg.value);
    }

    // @notice: Withdraw funds to the user's wallet
    // @params: amount to withdraw
    function withdraw(uint256 amount) public {
        if (balance[msg.sender] < amount) {
            revert("Insufficient balance");
        }
        balance[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit withdrew(msg.sender, amount);
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
