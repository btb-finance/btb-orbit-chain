import { ethers } from 'ethers';
import {
    createAnyTrustChain,
    deployTokenBridge,
    configureChainValidators,
    setupSequencer
} from '@arbitrum/orbit-sdk';
import * as dotenv from 'dotenv';
import nodeConfig from '../node-config.json';
import orbitConfig from '../orbit-config.json';

dotenv.config();

async function main() {
    if (!process.env.PRIVATE_KEY || !process.env.ARBITRUM_RPC) {
        throw new Error('Missing required environment variables');
    }

    const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log('Step 1: Creating BTB Orbit chain...');
    const chainInfo = await createAnyTrustChain({
        config: orbitConfig,
        nodeConfig: nodeConfig,
        signer: wallet,
    });

    console.log('Chain created successfully!');
    console.log('Chain ID:', chainInfo.chainId);
    console.log('RPC Endpoint:', chainInfo.rpcUrl);

    console.log('Step 2: Setting up validators...');
    await configureChainValidators({
        chainInfo,
        signer: wallet,
        validators: [
            process.env.VALIDATOR_1_ADDRESS,
            process.env.VALIDATOR_2_ADDRESS,
            process.env.VALIDATOR_3_ADDRESS
        ]
    });

    console.log('Step 3: Setting up sequencer...');
    await setupSequencer({
        chainInfo,
        signer: wallet,
        sequencerAddress: process.env.SEQUENCER_ADDRESS
    });

    console.log('Step 4: Deploying token bridge...');
    const bridgeInfo = await deployTokenBridge({
        chainInfo,
        signer: wallet,
        l1TokenAddress: process.env.L1_TOKEN_ADDRESS
    });

    console.log('Token bridge deployed!');
    console.log('Bridge Address:', bridgeInfo.bridgeAddress);
    console.log('Gateway Address:', bridgeInfo.gatewayAddress);

    // Save all configuration to a file
    const fs = require('fs');
    fs.writeFileSync(
        './chain-deployment-info.json',
        JSON.stringify({
            chain: chainInfo,
            bridge: bridgeInfo,
            timestamp: new Date().toISOString()
        }, null, 2)
    );

    console.log('Deployment complete! Configuration saved to chain-deployment-info.json');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
