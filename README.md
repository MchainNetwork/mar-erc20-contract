# MAR Token ERC20 Smart Contract

## Description

This repository contains the smart contract for creating the MAR ERC20 token, a token complying with the ERC20 standard on the Ethereum network. The MAR token has been designed to ensure security and efficiency.

## Features

1. **ERC20 Compliant**: The MAR token adheres to the ERC20 standard, ensuring compatibility with a wide range of services and applications on the Ethereum network.
2. **ERC20Permit**: Implements the ERC20Permit standard, an extension of the ERC20 standard that allows for gasless transactions. Users can delegate the allowance of their tokens to a spender without sending a transaction on-chain.
3. **Funds Recovery**: Allows the contract owner to recover accidental ERC20 tokens sent to the contract.
4. **Token Burn Function**: Users can burn their MAR tokens, permanently removing them from circulation.
5. **Bulk Transfer Function**: Enables users to send MAR tokens to multiple recipients in a single transaction, thereby saving gas and improving transaction efficiency.

## Repository Structure

```
- contracts/
    - MarToken.sol  // Main contract of the MAR ERC20 token
- migrations/
- test/
- truffle-config.js
- README.md  // This file
- .env.example
```

## Setup

Before proceeding with the deployment, you need to set up your environment variables. Create a `.env` file at the root of your project and add the following lines:

```sh
DEPLOYER_ADDRESS=0xYourDeployerAddressHere
CUSTODIAN_ADDRESS=0xYourCustodianAddressHere
```

- `DEPLOYER_ADDRESS`: The Ethereum address from which you will deploy the contract. Ensure you have control over this address and have sufficient Ether to cover the gas costs of the deployment.
- `CUSTODIAN_ADDRESS`: The Ethereum address that will be registered as the initial custodian of the tokens.

## Deployment Instructions

1. Ensure Truffle is installed globally (`npm install -g truffle`).
2. Clone this repository to your local machine.
3. Navigate to the project folder and run `npm install` to install all necessary dependencies.
4. Add your network and account configurations in `truffle-config.js`.
5. Deploy the contract

## Deploy the contract

To deploy the contract using Truffle, you can use one of the following script commands based on your needs:

### Basic Migration

```bash
truffle migrate
```

### Migration to Truffle Dashboard

```bash
truffle migrate --network dashboard
```

## Truffle Dashboard

To access the Truffle dashboard, use the following script command:

```bash
truffle dashboard
```

## Testing

To run unit tests, use the following command:

```
truffle test
```

## Contribution

If you would like to contribute to this project, please create an Issue or a Pull Request to propose your changes or improvements.

## License

This project is licensed under the MIT license.
