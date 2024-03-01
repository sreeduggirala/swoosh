//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SwooshStorage {
    struct Request {
        uint256 id;
        address creditor; // the person requesting the money
        address[] debtors; // people who owe the money
        address[] paid;
        address[] declined;
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
    event declined(address debtor, address creditor, uint256 indexed requestId);
    event nudged(address creditor, address debtor, uint256 indexed requestId);
    event deposited(address user, uint256 amount);
    event withdrew(address user, uint256 amount);
}

contract Swoosh is SwooshStorage, ERC20 {
    ERC20 USDC;

    constructor(address _USDC) ERC20("Swoosh", "SWO") {
        USDC = ERC20(_USDC);
    }

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
        if (user == address(0) || user == address(msg.sender)) {
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
            if (from[i] == address(0) || from[i] == address(msg.sender)) {
                revert("Invalid address");
            }
        }

        uint256 id = requests.length;
        address[] memory paid;
        address[] memory declined;
        requests.push(
            Request(
                id,
                msg.sender,
                from,
                paid,
                declined,
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
                if (requestsIn[currentRequest.debtors[i]][j] == requestId) {
                    requestsIn[currentRequest.debtors[i]][j] = requestsIn[
                        currentRequest.debtors[i]
                    ][requestsIn[currentRequest.debtors[i]].length - 1];
                    requestsIn[currentRequest.debtors[i]].pop();
                }
            }
        }

        for (
            uint256 i = 0;
            i < requestsOut[currentRequest.creditor].length;
            i++
        ) {
            if (requestsOut[currentRequest.creditor][i] == requestId) {
                requestsOut[currentRequest.creditor][i] = requestsOut[
                    currentRequest.creditor
                ][requestsOut[currentRequest.creditor].length - 1];
                requestsOut[currentRequest.creditor].pop();
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
                currentRequest.debtors[i] = currentRequest.debtors[
                    currentRequest.debtors.length - 1
                ];
                currentRequest.debtors.pop();
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

    // @notice: Approve all incoming requests
    function acceptAll() public {
        uint256[] memory indices = requestsIn[msg.sender];
        uint256 totalOwed;
        for (uint256 i = 0; i < indices.length; i++) {
            totalOwed += requests[indices[i]].amount;
        }

        if (balance[msg.sender] < totalOwed) {
            revert("Insufficient balance");
        }

        for (uint256 i = 0; i < indices.length; i++) {
            accept(indices[i]);
        }
    }

    // @notice: decline an incoming request
    // @params: request ID
    function decline(
        uint256 requestId
    ) public notProcessed(requests[requestId]) {
        Request storage currentRequest = requests[requestId];

        if (currentRequest.debtors.length > 1) {
            revert("Cannot decline group transactions");
        }

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

        currentRequest.cancelled = true;
        emit declined(currentRequest.creditor, msg.sender, currentRequest.id);
    }

    function nudge(address debtor, uint256 requestId) public {
        emit nudged(msg.sender, debtor, requestId);
    }

    // @notice: Deposit funds to app
    function deposit(uint256 amount) public payable {
        USDC.approve(payable(address(this)), amount);
        USDC.transferFrom(msg.sender, payable(address(this)), amount);
        balance[msg.sender] += amount;
        emit deposited(msg.sender, amount);
    }

    // @notice: Withdraw funds to the user's wallet
    // @params: amount to withdraw
    function withdraw(uint256 amount) public {
        if (balance[msg.sender] < amount) {
            revert("Insufficient balance");
        }
        balance[msg.sender] -= amount;
        USDC.transfer(payable(msg.sender), amount);
        emit withdrew(msg.sender, amount);
    }

    // @notice: Get payment history
    // @params: User's address
    function getPayments(address user) public view returns (Payment[] memory) {
        uint256[] memory indices = paymentsOut[user];
        Payment[] memory result = new Payment[](indices.length);
        for (uint256 i = 0; i < indices.length; i++) {
            result[i] = payments[indices[i]];
        }
        return result;
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
