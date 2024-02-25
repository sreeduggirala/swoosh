//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SwooshStorage {
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

    struct Payment {
        uint256 id;
        address creditor;
        address debtors;
        uint256 amount;
        string message;
        string imageURI;
        uint256 timestamp;
    }

    Request[] public requests;
    Payment[] public payments;

    mapping(address => uint256) public balance;
    mapping(address => uint256[]) public requestsOut;
    mapping(address => uint256[]) public requestsIn;
    mapping(address => uint256[]) public paymentsOut;

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
    function request(
        address[] memory from,
        uint256 amount,
        string memory message,
        string memory imageURI
    ) public {
        for (uint256 i = 0; i < from.length; i++) {
            if (from[i] == address(0)) {
                revert("Invalid address");
            }
        }

        uint256 id = requests.length;
        address[] memory paid;
        address[] memory rejected;
        requests.push(
            Request(
                id,
                msg.sender,
                from,
                paid,
                rejected,
                amount,
                message,
                imageURI,
                block.timestamp,
                false,
                false
            )
        );

        for (uint256 i = 0; i < from.length; i++) {
            requestsIn[from[i]].push(id);
        }
    }

    function cancel() public {}

    // @notice: Create a new payment
    // @params: creditor, amount
    function pay(
        address to,
        uint256 amount,
        string memory message,
        string memory imageURI
    ) public sufficientBalance(amount) validAddress(to) {
        uint256 id = payments.length;
        payments.push(
            Payment(
                id,
                msg.sender,
                to,
                amount,
                message,
                imageURI,
                block.timestamp
            )
        );
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
                break;
            }
        }

        if (!found) {
            revert("You are not in this request");
        }

        currentRequest.paid.push(msg.sender);

        balance[msg.sender] -= currentRequest.amount;
        balance[currentRequest.creditor] += currentRequest.amount;

        if (currentRequest.debtors.length == 0) {
            currentRequest.fulfilled = true;
        }

        emit accepted(currentRequest.creditor, msg.sender, currentRequest.id);
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
                if (currentRequest.debtors.length != 1) {
                    currentRequest.debtors[i] = currentRequest.debtors[
                        currentRequest.debtors.length
                    ];
                }
                currentRequest.debtors.pop();
                break;
            }
        }

        if (!found) {
            revert("You are not in this request");
        }

        emit rejected(currentRequest.creditor, msg.sender, currentRequest.id);
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
