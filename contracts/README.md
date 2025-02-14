# AdaWacana Smart Contracts

This directory contains the smart contracts for the AdaWacana platform, a Web3 commitment system with charitable donations.

## Contract Overview

### AdaWacana.sol

The main contract that handles:
- Wacana (commitment) creation and management
- Stake handling and verification
- Automatic charitable donations for failed commitments
- Event emissions for frontend integration

## Key Features

- **Commitment Creation**: Users can create commitments with ETH stakes
- **Verification System**: Trusted verifiers confirm completion
- **Automatic Donations**: Failed commitments trigger automatic donations
- **Security Features**: 
  - Reentrancy protection
  - Pausable functionality
  - Role-based access control
  - Secure withdrawal patterns

## Development

### Prerequisites

- Foundry
- Solidity ^0.8.19

### Installation

```bash
forge install
```

### Testing

```bash
# Run all tests
forge test

# Run tests with gas reporting
forge test --gas-report

# Run specific test
forge test --match-test testFunctionName
```

### Deployment

1. Set up environment variables:
```bash
cp .env.example .env
# Add your private key and RPC URLs
```

2. Deploy to network:
```bash
forge script script/Deploy.s.sol --rpc-url <RPC_URL> --broadcast
```

## Contract Architecture

### State Variables

- `minimumStake`: Minimum ETH required for commitment
- `wacanas`: Mapping of wacana IDs to their data
- `userWacanas`: Mapping of user addresses to their wacana IDs

### Key Functions

- `createWacana()`: Create new commitment
- `confirmCompletion()`: Verify commitment completion
- `selfReportFailure()`: Report own failure
- `processTimeout()`: Handle expired commitments

### Events

- `WacanaCreated`
- `CreatorConfirmed`
- `VerifierConfirmed`
- `WacanaCompleted`
- `WacanaFailed`
- `SelfReportFailed`

## Security Considerations

- All functions are protected against reentrancy
- Timelock for important parameter changes
- Emergency pause functionality
- Comprehensive test coverage

## Gas Optimization

- Efficient storage packing
- Minimal storage operations
- Optimized loops and calculations
- IR-based optimization enabled

## Testing

The test suite covers:
- Commitment creation and management
- Verification flows
- Failure scenarios
- Edge cases and restrictions
- Gas optimization
