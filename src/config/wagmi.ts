import { createConfig, http } from '@wagmi/core'
import { zksyncSepoliaTestnet } from 'viem/chains'
import { ssoConnector } from '@/config/ssoZKsync'

export const wagmiConfig = createConfig({
  chains: [zksyncSepoliaTestnet],
  connectors: [ssoConnector],
  ssr: true,
  transports: {
    [zksyncSepoliaTestnet.id]: http()
  }
})
