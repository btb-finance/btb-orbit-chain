import { ethers } from 'ethers';
import { createOrbitChain } from '@arbitrum/orbit-sdk';
import * as dotenv from 'dotenv';
import orbitConfig from '../orbit-config.json';

dotenv.config();

async function main() {
    if (!process.env.PRIVATE_KEY || !process.env.ARBITRUM_RPC) {
        throw new Error('Missing required environment variables');
    }

    const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log('Creating BTB Orbit chain...');
    
    const chainInfo = await createOrbitChain({
        config: orbitConfig,
        signer: wallet,
        validatorWallets: [wallet], // For development, using same wallet as validator
    });

    console.log('Chain created successfully!');
    console.log('Chain ID:', chainInfo.chainId);
    console.log('RPC Endpoint:', chainInfo.rpcUrl);
    console.log('Bridge Address:', chainInfo.bridgeAddress);
    console.log('Inbox Address:', chainInfo.inboxAddress);
    console.log('Sequencer Address:', chainInfo.sequencerAddress);

    // Save the chain info to a file
    const fs = require('fs');
    fs.writeFileSync(
        './chain-info.json',
        JSON.stringify(chainInfo, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
