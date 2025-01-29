import { useAccount, useContractRead } from 'wagmi'
import { BTB_CONTRACT_ADDRESS, BTB_CONTRACT_ABI } from '../config/contracts'
import { formatEther } from 'viem'

export default function TokenInfo() {
  const { address } = useAccount()

  const { data: balance } = useContractRead({
    address: BTB_CONTRACT_ADDRESS as `0x${string}`,
    abi: BTB_CONTRACT_ABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  })

  const { data: symbol } = useContractRead({
    address: BTB_CONTRACT_ADDRESS as `0x${string}`,
    abi: BTB_CONTRACT_ABI,
    functionName: 'symbol',
  })

  const { data: totalSupply } = useContractRead({
    address: BTB_CONTRACT_ADDRESS as `0x${string}`,
    abi: BTB_CONTRACT_ABI,
    functionName: 'totalSupply',
  })

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">BTB Token Info</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Symbol</p>
          <p className="text-xl font-semibold">{symbol}</p>
        </div>
        {address && (
          <div>
            <p className="text-gray-600">Your Balance</p>
            <p className="text-xl font-semibold">
              {balance ? formatEther(balance as bigint) : '0'} {symbol}
            </p>
          </div>
        )}
        <div>
          <p className="text-gray-600">Total Supply</p>
          <p className="text-xl font-semibold">
            {totalSupply ? formatEther(totalSupply as bigint) : '0'} {symbol}
          </p>
        </div>
      </div>
    </div>
  )
}
