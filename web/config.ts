import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia, baseSepolia } from '@wagmi/core/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http()
  },
  connectors: [injected()]

})
