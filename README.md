# BTB Finance - Arbitrum L3 Chain

BTB Finance is an Arbitrum Layer 3 chain built using AnyTrust and Arbitrum Orbit technology.

[![Website](https://img.shields.io/badge/Website-btb.finance-blue)](https://www.btb.finance)
[![Twitter Follow](https://img.shields.io/twitter/follow/btb_finance?style=social)](https://twitter.com/btb_finance)

## Chain Specifications

- **Chain Name**: BTB Orbit
- **Chain ID**: 91738291
- **Consensus**: AnyTrust
- **Parent Chain**: Arbitrum One
- **Features**:
  - Custom token bridge
  - Optimized gas settings
  - 3-validator AnyTrust setup
  - High-performance sequencer

## Prerequisites

1. Node.js v16 or higher
2. Access to Arbitrum One RPC
3. Three validator addresses
4. Sequencer address
5. Sufficient ETH in deployer wallet

## Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env`
3. Fill in the required environment variables:

```bash
# Network Configuration
ARBITRUM_RPC=                  # Arbitrum One RPC URL
PRIVATE_KEY=                   # Deployer wallet private key

# Validator Setup
VALIDATOR_1_ADDRESS=           # First validator address
VALIDATOR_2_ADDRESS=           # Second validator address
VALIDATOR_3_ADDRESS=           # Third validator address

# Sequencer Configuration
SEQUENCER_ADDRESS=             # Sequencer address

# Token Bridge (Optional)
L1_TOKEN_ADDRESS=              # Address of L1 token to bridge
```

## Deployment Steps

1. Install dependencies:
```bash
npm install
```

2. Deploy the complete L3 chain:
```bash
npx ts-node scripts/deploy-full-chain.ts
```

This script will:
- Create the L3 chain
- Configure validators
- Set up the sequencer
- Deploy the token bridge
- Save all deployment information

## Chain Components

### 1. Node Configuration
- Located in `node-config.json`
- Defines chain parameters
- Configures AnyTrust settings
- Sets up validator requirements

### 2. Chain Configuration
- Located in `orbit-config.json`
- Defines chain ID and name
- Configures gas parameters
- Sets up parent chain connection

### 3. Token Bridge
- Enables asset transfers between L2 and L3
- Supports ERC-20 tokens
- Configurable gateway

## Post-Deployment

After deployment, you'll receive:
1. Chain RPC endpoint
2. Bridge contract addresses
3. Validator configuration
4. Sequencer information

All information is saved in `chain-deployment-info.json`

## Security Considerations

1. Secure key management for:
   - Validators
   - Sequencer
   - Bridge admin
2. Regular monitoring of:
   - Validator performance
   - Bridge operations
   - Network health

## Development and Testing

1. Test contracts:
```bash
npx hardhat test
```

2. Local development:
```bash
npx hardhat node
```

## Resources

- [Arbitrum Orbit Documentation](https://docs.arbitrum.io/launch-orbit-chain/orbit-gentle-introduction)
- [AnyTrust Protocol](https://docs.arbitrum.io/how-arbitrum-works/anytrust-protocol)
- [Token Bridge Documentation](https://docs.arbitrum.io/bridge-tokens/token-bridge-basics)
