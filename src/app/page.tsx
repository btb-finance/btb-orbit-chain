'use client'

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import WalletConnect from '../components/WalletConnect'
import TokenInfo from '../components/TokenInfo'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

export default function Home() {
  return (
    <WagmiConfig config={config}>
      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">BTB Finance</h1>
            <WalletConnect />
          </div>
          <TokenInfo />
        </div>
      </main>
    </WagmiConfig>
  )
}
