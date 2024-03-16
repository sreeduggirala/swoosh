# Swoosh

Swoosh is a decentralized payment and bill splitting application built on Ethereum. It allows users to easily send payments, request money from others, and split expenses using crypto.

## Key Features

- ERC-4337 compatible wallets (for Web2 sign-in)
- Paymaster for gasless transactions
- Web-based application for installation-free usage
- Send direct crypto payments to anyone with an Ethereum address
- Create payment requests from individuals or groups and track repayment status
- Split bills and expenses among friends with automatic tracking  
- Seamless transfers between USD stablecoins and other ERC20 tokens
- Fully on-chain transaction history and account balances

## How It Works

Swoosh leverages smart contracts to manage payments and requests between parties. Users can connect their wallet to deposit crypto funds for transfers.

To send money, a user simply enters the recipient's address and payment details which creates an on-chain record.

For bill splitting, the requester can indicate required payers and amounts owed. Payers can then approve or decline requests.  

As repayments occur, balances automatically update to track outstanding amounts in real time.

## Stack
- Back-end: Solidity (Foundry)
- Front-end: thirdweb SDK, React.js, Tailwind CSS
- Hosting: Vercel

## Chains
- Solana (Neon EVM)
- Base
- XDC
- Injective (inEVM)
- Linea
- Arbitrum
- Hedera

  
