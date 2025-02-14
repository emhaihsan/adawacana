# AdaWacana

AdaWacana is a Web3 commitment platform that helps users achieve their goals by adding financial stakes. When users fail to meet their commitments, the staked amount is automatically donated to charity, turning procrastination into positive impact.

## Features

- **Create Commitments**: Set goals with deadlines and stake ETH as motivation
- **Verifier System**: Choose trusted friends to verify your commitment completion
- **Charitable Impact**: Failed commitments automatically donate to charity
- **Smart Contract Security**: Built with secure and audited smart contracts
- **Web3 Integration**: Seamless wallet connection and transaction handling
- **Responsive Design**: Works perfectly on both desktop and mobile devices

## Tech Stack

- **Frontend**:

  - Next.js 14 (App Router)
  - TailwindCSS
  - RainbowKit (Wallet Connection)
  - Wagmi (Ethereum Interactions)

- **Smart Contracts**:
  - Solidity
  - Foundry (Development & Testing)
  - OpenZeppelin (Security Standards)

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn/NPM
- Foundry (for smart contract development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/adawacana.git
cd adawacana
```

2. Install frontend dependencies:

```bash
yarn install
```

3. Install smart contract dependencies:

```bash
cd contracts
forge install
```

4. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

### Development

1. Start the frontend development server:

```bash
yarn dev
```

2. For smart contract development:

```bash
cd contracts
forge test    # Run tests
forge build   # Build contracts
```

## Project Structure

```
adawacana/
├── src/                    # Frontend source code
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   └── contracts/        # Contract ABIs and addresses
├── contracts/             # Smart contract source code
│   ├── src/              # Contract implementations
│   └── test/             # Contract tests
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
