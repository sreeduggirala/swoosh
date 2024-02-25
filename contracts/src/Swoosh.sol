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
        address debtor;
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
        if (currentRequest.fulfilled || currentRequest.cancelled) {
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

        requestsOut[msg.sender].push(id);
    }

    function cancel(
        uint256 requestId
    ) public notProcessed(requests[requestId]) {
        Request memory currentRequest = requests[requestId];
        if (msg.sender != currentRequest.creditor) {
            revert("You are not the creator of this request");
        }

        if (currentRequest.paid.length > 0) {
            revert("Cannot cancel after receiving payment");
        }

        for (uint256 i = 0; i < currentRequest.debtors.length; i++) {
            for (
                uint256 j = 0;
                j < requestsIn[currentRequest.debtors[i]].length;
                j++
            ) {
                if (j == currentRequest.id) {
                    requestsIn[msg.sender][j] = requestsIn[msg.sender][
                        requestsIn[msg.sender].length - 1
                    ];
                    requestsIn[msg.sender].pop();
                }
            }
        }

        for (uint256 i = 0; i < requestsOut[msg.sender].length; i++) {
            if (i == currentRequest.id) {
                requestsOut[msg.sender][i] = requestsOut[msg.sender][
                    requestsOut[msg.sender].length - 1
                ];
                requestsOut[msg.sender].pop();
            }
        }

        currentRequest.cancelled = true;
    }

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

        for (uint256 i = 0; i < requestsIn[msg.sender].length; i++) {
            if (i == currentRequest.id) {
                requestsIn[msg.sender][i] = requestsIn[msg.sender][
                    requestsIn[msg.sender].length - 1
                ];
                requestsIn[msg.sender].pop();
            }
        }

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

        for (uint256 i = 0; i < requestsIn[msg.sender].length; i++) {
            if (i == currentRequest.id) {
                requestsIn[msg.sender][i] = requestsIn[msg.sender][
                    requestsIn[msg.sender].length - 1
                ];
                requestsIn[msg.sender].pop();
            }
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
    function getPayments(address user) public view returns (Payment[] memory) {
        uint256[] memory indices = paymentsOut[user];
        Payment[] memory res = new Payment[](indices.length);
        for (uint256 i = 0; i < indices.length; i++) {
            res[i] = payments[indices[i]];
        }
        return res;
    }

    // @notice: Get pending incoming requests
    // @params: User's address
    function getRequestsIn(
        address user
    ) public view returns (Request[] memory) {
        uint256[] memory indices = requestsIn[user];
        Request[] memory result = new Request[](indices.length);
        for (uint256 i = 0; i < indices.length; i++) {
            result[i] = requests[indices[i]];
        }
        return result;
    }

    // @notice: Get pending outgoing requests
    // @params: User's address
    function getRequestsOut(
        address user
    ) public view returns (Request[] memory) {
        uint256[] memory indices = requestsOut[user];
        Request[] memory result = new Request[](indices.length);
        for (uint256 i = 0; i < indices.length; i++) {
            result[i] = requests[indices[i]];
        }
        return result;
    }

    // @notice: Get user balance
    // @params: User's address
    function getBalance(address user) public view returns (uint256) {
        return balance[user];
    }
}
