// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    event Deposit(address indexed sender, uint256 amount);
    event SubmitTransaction(address indexed owner, uint256 indexed txIndex);
    event ConfirmTransaction(address indexed owner, uint256 indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint256 indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);

    address[] public owners;
    mapping(address => bool) public isOwner;
    mapping(uint256 => mapping(address => bool)) public isConfirmed;
    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;

    struct Transaction {
        address to;
        uint256 value;
        bool executed;
    }

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    constructor(address[] memory _owners) {
        for (uint256 i = 0; i < _owners.length; i++) {
            isOwner[_owners[i]] = true;
            owners.push(_owners[i]);
        }
    }

    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function submitTransaction(address to, uint256 value) external onlyOwner {
        uint256 txIndex = transactionCount;
        transactions[txIndex] = Transaction({to: to, value: value, executed: false});
        emitSubmitTransaction(msg.sender, txIndex);
        transactionCount++;
    }

    function confirmTransaction(uint256 txIndex) external onlyOwner {
        require(!isConfirmed[txIndex][msg.sender], "Transaction already confirmed");
        isConfirmed[txIndex][msg.sender] = true;
        emit ConfirmTransaction(msg.sender, txIndex);
    }

    function executeTransaction(uint256 txIndex) external onlyOwner {
        Transaction storage transaction = transactions[txIndex];
        require(!transaction.executed, "Transaction already executed");
        
        uint256 confirmations = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if (isConfirmed[txIndex][owners[i]]) {
                confirmations++;
            }
        }

        require(confirmations > owners.length / 2, "Not enough confirmations");
        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}("");
        require(success, "Transaction failed");
        emit ExecuteTransaction(msg.sender, txIndex);
    }
}
