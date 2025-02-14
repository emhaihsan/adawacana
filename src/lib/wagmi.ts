import { getDefaultConfig } from '@rainbow-me/rainbowkit';

type ChainConfig = {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
  };
  rpcUrls: {
    default: {
      http: string[];
    };
    public: {
      http: string[];
    };
  };
  blockExplorers: {
    default: {
      name: string;
      url: string;
    };
  };
  testnet: boolean;
};

const mantaPacific: ChainConfig = {
  id: 169,
  name: 'Manta Pacific',
  network: 'manta-pacific',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://pacific-rpc.manta.network/http'],
    },
    public: {
      http: ['https://pacific-rpc.manta.network/http'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Manta Pacific Explorer',
      url: 'https://pacific-explorer.manta.network/',
    },
  },
  testnet: false,
};

const mantaPacificTestnet: ChainConfig = {
  id: 3441006,
  name: 'Manta Pacific Sepolia Testnet',
  network: 'manta-pacific-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://pacific-rpc.sepolia-testnet.manta.network/http'],
    },
    public: {
      http: ['https://pacific-rpc.sepolia-testnet.manta.network/http'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Manta Pacific Sepolia Testnet Explorer',
      url: 'https://pacific-explorer.sepolia-testnet.manta.network',
    },
  },
  testnet: true,
};

export const config = getDefaultConfig({
  appName: 'AdaWacana',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [
    mantaPacific,
    mantaPacificTestnet
  ],
  ssr: true,
});
