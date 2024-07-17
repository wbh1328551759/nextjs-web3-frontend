import React from 'react'
import {
  getDefaultConfig,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
  Theme
} from '@rainbow-me/rainbowkit'
import {createPublicClient, defineChain, http} from 'viem'
import { WagmiProvider as CacheWagmiProvider, fallback } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { okxWallet, bitgetWallet, bybitWallet } from '@rainbow-me/rainbowkit/wallets';
import merge from 'lodash.merge';

const { wallets } = getDefaultWallets();

export const BEVM_MAINNET = defineChain({
  id: 11501,
  name: 'BEVM Mainnet',
  nativeCurrency: {
    name: 'BEVM',
    symbol: 'BTC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-mainnet-1.bevm.io', 'https://rpc-mainnet-2.bevm.io'],
    },
  },
  blockExplorers: {
    default: { name: 'BEVM Mainnet Explorer', url: 'https://scan-mainnet.bevm.io'}
  },
  contracts: {
    multicall3: {
      address: '0xa7487A536968Be0D563901aeb3Fc07B099e2fb04',
    },
  },
})

export const BEVM_TESTNET = defineChain({
  id: 11503,
  name: 'BEVM testnet',
  nativeCurrency: {
    name: 'BEVM',
    symbol: 'BTC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.bevm.io/rpc'],
    },
  },
  blockExplorers: {
    default: { name: 'BEVM Testnet Explorer', url: 'https://scan-testnet.bevm.io'}
  },
  contracts: {
    multicall3: {
      address: '0x4AF9bE5A3464aFDEFc80700b41fcC4d9713E7449',
    },
  },
})

export const wagmiConfig = getDefaultConfig({
  appName: 'BEVM Bittera',
  projectId: '0a044cdac8adede634b1be7f0516509e',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [okxWallet, bybitWallet, bitgetWallet],
    },
  ],
  chains: [BEVM_MAINNET],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [BEVM_MAINNET.id]: fallback([
      http('https://rpc-mainnet-1.bevm.io'),
      http('https://rpc-mainnet-2.bevm.io')
    ],  { rank: true }),
    // [BEVM_TESTNET.id]: http('https://testnet.bevm.io/rpc'),
  },
});

export const publicClient = createPublicClient({
  chain: BEVM_MAINNET,
  transport: http()
})

const queryClient = new QueryClient();

const myTheme = merge(lightTheme(
  {borderRadius: 'medium'}
), {
  colors: {
    connectButtonBackground: '#FFD168',
    connectButtonText: '#292634',
    accentColor: '#FFD168',
  },
} as Theme);

interface Props {
  children: React.ReactNode
}

export const WagmiProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <CacheWagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en-US" theme={myTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </CacheWagmiProvider>
  )
}
