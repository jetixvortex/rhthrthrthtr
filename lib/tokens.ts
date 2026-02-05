export interface Token {
  symbol: string;
  name: string;
  icon: string;
  address?: string;
  decimals: number;
  price?: number;
  change24h?: number;
  volume24h?: number;
  tvl?: number;
  marketCap?: number;
  category: "native" | "stablecoin" | "defi" | "meme" | "gaming" | "layer2" | "ai" | "rwa";
}

export interface Network {
  id: number;
  name: string;
  symbol: string;
  color: string;
  gasPrice: string;
  blockTime: string;
  isL2: boolean;
  isTestnet?: boolean;
  explorerUrl?: string;
  rpcUrl?: string;
}

// Comprehensive list of 100+ tokens
export const ALL_TOKENS: Token[] = [
  // Native & Major
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", decimals: 18, price: 3245.67, change24h: 2.34, volume24h: 12500000000, tvl: 45000000000, marketCap: 390000000000, category: "native" },
  { symbol: "BTC", name: "Bitcoin", icon: "₿", decimals: 8, price: 97234.12, change24h: 1.87, volume24h: 28900000000, tvl: 0, marketCap: 1900000000000, category: "native" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", icon: "₿", decimals: 8, price: 97200.00, change24h: 1.85, volume24h: 890000000, tvl: 12000000000, marketCap: 15000000000, category: "native" },
  { symbol: "WETH", name: "Wrapped Ether", icon: "Ξ", decimals: 18, price: 3245.00, change24h: 2.32, volume24h: 2500000000, tvl: 8000000000, marketCap: 12000000000, category: "native" },
  { symbol: "BNB", name: "BNB", icon: "◆", decimals: 18, price: 612.45, change24h: 0.89, volume24h: 1200000000, tvl: 5000000000, marketCap: 91000000000, category: "native" },
  { symbol: "SOL", name: "Solana", icon: "◉", decimals: 9, price: 178.45, change24h: 5.67, volume24h: 3400000000, tvl: 8500000000, marketCap: 82000000000, category: "native" },
  { symbol: "XRP", name: "XRP", icon: "✕", decimals: 6, price: 2.34, change24h: 3.21, volume24h: 4500000000, tvl: 0, marketCap: 134000000000, category: "native" },
  { symbol: "ADA", name: "Cardano", icon: "₳", decimals: 6, price: 0.92, change24h: -1.23, volume24h: 890000000, tvl: 320000000, marketCap: 32000000000, category: "native" },
  { symbol: "AVAX", name: "Avalanche", icon: "▲", decimals: 18, price: 38.56, change24h: 4.12, volume24h: 670000000, tvl: 1200000000, marketCap: 15000000000, category: "native" },
  { symbol: "DOT", name: "Polkadot", icon: "●", decimals: 10, price: 7.23, change24h: 2.45, volume24h: 340000000, tvl: 890000000, marketCap: 10000000000, category: "native" },
  { symbol: "ATOM", name: "Cosmos", icon: "⚛", decimals: 6, price: 9.87, change24h: 1.56, volume24h: 280000000, tvl: 450000000, marketCap: 3800000000, category: "native" },
  { symbol: "NEAR", name: "NEAR Protocol", icon: "N", decimals: 24, price: 5.67, change24h: 3.89, volume24h: 450000000, tvl: 670000000, marketCap: 6200000000, category: "native" },
  { symbol: "ICP", name: "Internet Computer", icon: "∞", decimals: 8, price: 12.34, change24h: -2.34, volume24h: 120000000, tvl: 89000000, marketCap: 5800000000, category: "native" },
  { symbol: "FIL", name: "Filecoin", icon: "⨍", decimals: 18, price: 5.89, change24h: 1.23, volume24h: 180000000, tvl: 340000000, marketCap: 3400000000, category: "native" },
  { symbol: "TRX", name: "TRON", icon: "T", decimals: 6, price: 0.24, change24h: 0.45, volume24h: 890000000, tvl: 7800000000, marketCap: 21000000000, category: "native" },
  { symbol: "TON", name: "Toncoin", icon: "◊", decimals: 9, price: 5.12, change24h: 2.78, volume24h: 340000000, tvl: 450000000, marketCap: 17500000000, category: "native" },
  { symbol: "SUI", name: "Sui", icon: "S", decimals: 9, price: 4.56, change24h: 8.92, volume24h: 1200000000, tvl: 1800000000, marketCap: 14000000000, category: "native" },
  { symbol: "APT", name: "Aptos", icon: "A", decimals: 8, price: 9.23, change24h: 4.56, volume24h: 340000000, tvl: 560000000, marketCap: 4500000000, category: "native" },
  { symbol: "SEI", name: "Sei", icon: "S", decimals: 6, price: 0.52, change24h: 6.78, volume24h: 280000000, tvl: 340000000, marketCap: 1800000000, category: "native" },
  { symbol: "INJ", name: "Injective", icon: "I", decimals: 18, price: 24.56, change24h: 3.45, volume24h: 180000000, tvl: 120000000, marketCap: 2300000000, category: "native" },
  
  // Stablecoins
  { symbol: "USDC", name: "USD Coin", icon: "$", decimals: 6, price: 1.00, change24h: 0.01, volume24h: 5600000000, tvl: 28000000000, marketCap: 43000000000, category: "stablecoin" },
  { symbol: "USDT", name: "Tether", icon: "₮", decimals: 6, price: 1.00, change24h: -0.02, volume24h: 62000000000, tvl: 22000000000, marketCap: 120000000000, category: "stablecoin" },
  { symbol: "DAI", name: "Dai", icon: "◈", decimals: 18, price: 1.00, change24h: 0.00, volume24h: 980000000, tvl: 5600000000, marketCap: 5300000000, category: "stablecoin" },
  { symbol: "FRAX", name: "Frax", icon: "F", decimals: 18, price: 0.998, change24h: -0.01, volume24h: 45000000, tvl: 890000000, marketCap: 650000000, category: "stablecoin" },
  { symbol: "TUSD", name: "TrueUSD", icon: "T", decimals: 18, price: 1.00, change24h: 0.02, volume24h: 89000000, tvl: 120000000, marketCap: 490000000, category: "stablecoin" },
  { symbol: "USDP", name: "Pax Dollar", icon: "P", decimals: 18, price: 1.00, change24h: 0.01, volume24h: 34000000, tvl: 89000000, marketCap: 450000000, category: "stablecoin" },
  { symbol: "GUSD", name: "Gemini Dollar", icon: "G", decimals: 2, price: 1.00, change24h: 0.00, volume24h: 12000000, tvl: 45000000, marketCap: 67000000, category: "stablecoin" },
  { symbol: "LUSD", name: "Liquity USD", icon: "L", decimals: 18, price: 1.00, change24h: 0.03, volume24h: 23000000, tvl: 340000000, marketCap: 480000000, category: "stablecoin" },
  { symbol: "BUSD", name: "Binance USD", icon: "B", decimals: 18, price: 1.00, change24h: 0.00, volume24h: 890000000, tvl: 120000000, marketCap: 70000000, category: "stablecoin" },
  { symbol: "USDD", name: "USDD", icon: "D", decimals: 18, price: 0.999, change24h: -0.01, volume24h: 45000000, tvl: 230000000, marketCap: 720000000, category: "stablecoin" },
  { symbol: "cUSD", name: "Celo Dollar", icon: "C", decimals: 18, price: 1.00, change24h: 0.01, volume24h: 12000000, tvl: 34000000, marketCap: 45000000, category: "stablecoin" },
  { symbol: "sUSD", name: "sUSD", icon: "S", decimals: 18, price: 0.997, change24h: -0.02, volume24h: 8900000, tvl: 78000000, marketCap: 23000000, category: "stablecoin" },
  { symbol: "EURS", name: "STASIS EURO", icon: "€", decimals: 2, price: 1.08, change24h: 0.12, volume24h: 5600000, tvl: 23000000, marketCap: 130000000, category: "stablecoin" },
  { symbol: "EURT", name: "Euro Tether", icon: "€", decimals: 6, price: 1.08, change24h: 0.10, volume24h: 12000000, tvl: 45000000, marketCap: 38000000, category: "stablecoin" },
  { symbol: "GHO", name: "GHO", icon: "G", decimals: 18, price: 0.998, change24h: -0.01, volume24h: 34000000, tvl: 180000000, marketCap: 180000000, category: "stablecoin" },
  { symbol: "USDe", name: "Ethena USDe", icon: "E", decimals: 18, price: 1.00, change24h: 0.02, volume24h: 890000000, tvl: 5600000000, marketCap: 5600000000, category: "stablecoin" },
  { symbol: "PYUSD", name: "PayPal USD", icon: "P", decimals: 6, price: 1.00, change24h: 0.00, volume24h: 45000000, tvl: 340000000, marketCap: 700000000, category: "stablecoin" },
  
  // DeFi Tokens
  { symbol: "UNI", name: "Uniswap", icon: "U", decimals: 18, price: 12.34, change24h: -3.21, volume24h: 560000000, tvl: 2800000000, marketCap: 7400000000, category: "defi" },
  { symbol: "LINK", name: "Chainlink", icon: "⬡", decimals: 18, price: 18.92, change24h: 3.21, volume24h: 1200000000, tvl: 4500000000, marketCap: 11800000000, category: "defi" },
  { symbol: "AAVE", name: "Aave", icon: "A", decimals: 18, price: 245.78, change24h: 4.56, volume24h: 340000000, tvl: 1900000000, marketCap: 3700000000, category: "defi" },
  { symbol: "MKR", name: "Maker", icon: "M", decimals: 18, price: 1567.89, change24h: 2.34, volume24h: 89000000, tvl: 8900000000, marketCap: 1400000000, category: "defi" },
  { symbol: "SNX", name: "Synthetix", icon: "S", decimals: 18, price: 2.89, change24h: -1.23, volume24h: 78000000, tvl: 340000000, marketCap: 940000000, category: "defi" },
  { symbol: "CRV", name: "Curve DAO", icon: "C", decimals: 18, price: 0.78, change24h: 5.67, volume24h: 230000000, tvl: 2100000000, marketCap: 940000000, category: "defi" },
  { symbol: "LDO", name: "Lido DAO", icon: "L", decimals: 18, price: 2.12, change24h: 3.45, volume24h: 180000000, tvl: 28000000000, marketCap: 1900000000, category: "defi" },
  { symbol: "COMP", name: "Compound", icon: "C", decimals: 18, price: 78.45, change24h: 1.89, volume24h: 56000000, tvl: 2300000000, marketCap: 670000000, category: "defi" },
  { symbol: "YFI", name: "yearn.finance", icon: "Y", decimals: 18, price: 8234.56, change24h: 2.12, volume24h: 34000000, tvl: 340000000, marketCap: 300000000, category: "defi" },
  { symbol: "SUSHI", name: "SushiSwap", icon: "🍣", decimals: 18, price: 1.23, change24h: -2.34, volume24h: 45000000, tvl: 230000000, marketCap: 310000000, category: "defi" },
  { symbol: "1INCH", name: "1inch", icon: "1", decimals: 18, price: 0.45, change24h: 4.56, volume24h: 67000000, tvl: 120000000, marketCap: 540000000, category: "defi" },
  { symbol: "BAL", name: "Balancer", icon: "B", decimals: 18, price: 3.45, change24h: 1.23, volume24h: 23000000, tvl: 890000000, marketCap: 230000000, category: "defi" },
  { symbol: "DYDX", name: "dYdX", icon: "D", decimals: 18, price: 1.56, change24h: 6.78, volume24h: 120000000, tvl: 340000000, marketCap: 1100000000, category: "defi" },
  { symbol: "GMX", name: "GMX", icon: "G", decimals: 18, price: 28.90, change24h: 3.45, volume24h: 45000000, tvl: 560000000, marketCap: 260000000, category: "defi" },
  { symbol: "PENDLE", name: "Pendle", icon: "P", decimals: 18, price: 5.67, change24h: 8.90, volume24h: 180000000, tvl: 4500000000, marketCap: 900000000, category: "defi" },
  { symbol: "RPL", name: "Rocket Pool", icon: "R", decimals: 18, price: 12.34, change24h: 2.45, volume24h: 23000000, tvl: 3400000000, marketCap: 240000000, category: "defi" },
  { symbol: "ENS", name: "ENS", icon: "E", decimals: 18, price: 28.90, change24h: 4.56, volume24h: 89000000, tvl: 0, marketCap: 890000000, category: "defi" },
  { symbol: "GRT", name: "The Graph", icon: "G", decimals: 18, price: 0.23, change24h: 5.67, volume24h: 120000000, tvl: 340000000, marketCap: 2200000000, category: "defi" },
  { symbol: "FXS", name: "Frax Share", icon: "F", decimals: 18, price: 3.45, change24h: 1.23, volume24h: 34000000, tvl: 890000000, marketCap: 340000000, category: "defi" },
  { symbol: "CVX", name: "Convex Finance", icon: "C", decimals: 18, price: 3.89, change24h: 4.56, volume24h: 23000000, tvl: 1200000000, marketCap: 340000000, category: "defi" },
  { symbol: "EIGEN", name: "Eigenlayer", icon: "E", decimals: 18, price: 3.78, change24h: 6.89, volume24h: 340000000, tvl: 12000000000, marketCap: 700000000, category: "defi" },
  { symbol: "ENA", name: "Ethena", icon: "E", decimals: 18, price: 0.89, change24h: 5.67, volume24h: 560000000, tvl: 5600000000, marketCap: 2600000000, category: "defi" },
  { symbol: "MORPHO", name: "Morpho", icon: "M", decimals: 18, price: 2.34, change24h: 12.45, volume24h: 89000000, tvl: 3400000000, marketCap: 450000000, category: "defi" },
  { symbol: "ONDO", name: "Ondo Finance", icon: "O", decimals: 18, price: 1.23, change24h: 8.90, volume24h: 340000000, tvl: 890000000, marketCap: 1700000000, category: "defi" },
  { symbol: "JUP", name: "Jupiter", icon: "J", decimals: 6, price: 0.89, change24h: 4.56, volume24h: 230000000, tvl: 2300000000, marketCap: 1200000000, category: "defi" },
  { symbol: "RAY", name: "Raydium", icon: "R", decimals: 6, price: 5.67, change24h: 7.89, volume24h: 180000000, tvl: 1200000000, marketCap: 1600000000, category: "defi" },
  { symbol: "ORCA", name: "Orca", icon: "O", decimals: 6, price: 4.12, change24h: 3.45, volume24h: 56000000, tvl: 340000000, marketCap: 210000000, category: "defi" },
  
  // Layer 2 Tokens
  { symbol: "ARB", name: "Arbitrum", icon: "◎", decimals: 18, price: 1.23, change24h: -2.45, volume24h: 890000000, tvl: 3200000000, marketCap: 4900000000, category: "layer2" },
  { symbol: "OP", name: "Optimism", icon: "⭕", decimals: 18, price: 2.34, change24h: 6.78, volume24h: 670000000, tvl: 2100000000, marketCap: 3000000000, category: "layer2" },
  { symbol: "MATIC", name: "Polygon", icon: "⬢", decimals: 18, price: 0.52, change24h: -1.34, volume24h: 450000000, tvl: 1500000000, marketCap: 5100000000, category: "layer2" },
  { symbol: "POL", name: "Polygon", icon: "⬢", decimals: 18, price: 0.52, change24h: -1.34, volume24h: 450000000, tvl: 1500000000, marketCap: 5100000000, category: "layer2" },
  { symbol: "IMX", name: "Immutable X", icon: "I", decimals: 18, price: 1.67, change24h: 4.56, volume24h: 120000000, tvl: 340000000, marketCap: 2800000000, category: "layer2" },
  { symbol: "STRK", name: "Starknet", icon: "S", decimals: 18, price: 0.56, change24h: 5.67, volume24h: 180000000, tvl: 230000000, marketCap: 1100000000, category: "layer2" },
  { symbol: "ZK", name: "zkSync", icon: "Z", decimals: 18, price: 0.18, change24h: 3.45, volume24h: 120000000, tvl: 560000000, marketCap: 620000000, category: "layer2" },
  { symbol: "MNT", name: "Mantle", icon: "M", decimals: 18, price: 1.12, change24h: 2.34, volume24h: 89000000, tvl: 340000000, marketCap: 3600000000, category: "layer2" },
  { symbol: "METIS", name: "Metis", icon: "M", decimals: 18, price: 45.67, change24h: 4.56, volume24h: 23000000, tvl: 89000000, marketCap: 250000000, category: "layer2" },
  { symbol: "MANTA", name: "Manta Network", icon: "M", decimals: 18, price: 1.23, change24h: 6.78, volume24h: 89000000, tvl: 340000000, marketCap: 400000000, category: "layer2" },
  { symbol: "BLAST", name: "Blast", icon: "B", decimals: 18, price: 0.012, change24h: 8.90, volume24h: 120000000, tvl: 2300000000, marketCap: 400000000, category: "layer2" },
  { symbol: "MODE", name: "Mode", icon: "M", decimals: 18, price: 0.023, change24h: 5.67, volume24h: 45000000, tvl: 890000000, marketCap: 230000000, category: "layer2" },
  { symbol: "LINEA", name: "Linea", icon: "L", decimals: 18, price: 0, change24h: 0, volume24h: 0, tvl: 1200000000, marketCap: 0, category: "layer2" },
  { symbol: "SCROLL", name: "Scroll", icon: "S", decimals: 18, price: 0.89, change24h: 4.56, volume24h: 56000000, tvl: 560000000, marketCap: 150000000, category: "layer2" },
  { symbol: "ZKSYNC", name: "zkSync Era", icon: "Z", decimals: 18, price: 0.18, change24h: 3.45, volume24h: 120000000, tvl: 560000000, marketCap: 620000000, category: "layer2" },
  
  // Meme Coins
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð", decimals: 8, price: 0.34, change24h: 8.90, volume24h: 2300000000, tvl: 0, marketCap: 50000000000, category: "meme" },
  { symbol: "SHIB", name: "Shiba Inu", icon: "S", decimals: 18, price: 0.000023, change24h: 12.34, volume24h: 890000000, tvl: 120000000, marketCap: 13500000000, category: "meme" },
  { symbol: "PEPE", name: "Pepe", icon: "🐸", decimals: 18, price: 0.000018, change24h: 15.67, volume24h: 1200000000, tvl: 0, marketCap: 7500000000, category: "meme" },
  { symbol: "WIF", name: "dogwifhat", icon: "W", decimals: 6, price: 2.34, change24h: 18.90, volume24h: 890000000, tvl: 0, marketCap: 2300000000, category: "meme" },
  { symbol: "BONK", name: "Bonk", icon: "B", decimals: 5, price: 0.000032, change24h: 10.23, volume24h: 450000000, tvl: 0, marketCap: 2400000000, category: "meme" },
  { symbol: "FLOKI", name: "Floki", icon: "F", decimals: 9, price: 0.00018, change24h: 7.89, volume24h: 230000000, tvl: 0, marketCap: 1700000000, category: "meme" },
  { symbol: "MEME", name: "Memecoin", icon: "M", decimals: 18, price: 0.012, change24h: 5.67, volume24h: 89000000, tvl: 0, marketCap: 340000000, category: "meme" },
  { symbol: "BRETT", name: "Brett", icon: "B", decimals: 18, price: 0.15, change24h: 12.34, volume24h: 180000000, tvl: 0, marketCap: 1500000000, category: "meme" },
  { symbol: "POPCAT", name: "Popcat", icon: "P", decimals: 9, price: 0.78, change24h: 8.90, volume24h: 120000000, tvl: 0, marketCap: 760000000, category: "meme" },
  { symbol: "MOG", name: "Mog Coin", icon: "M", decimals: 18, price: 0.0000023, change24h: 15.67, volume24h: 89000000, tvl: 0, marketCap: 890000000, category: "meme" },
  { symbol: "TURBO", name: "Turbo", icon: "T", decimals: 18, price: 0.0089, change24h: 6.78, volume24h: 56000000, tvl: 0, marketCap: 600000000, category: "meme" },
  { symbol: "NEIRO", name: "Neiro", icon: "N", decimals: 9, price: 0.0018, change24h: 23.45, volume24h: 340000000, tvl: 0, marketCap: 750000000, category: "meme" },
  { symbol: "SPX", name: "SPX6900", icon: "S", decimals: 8, price: 1.23, change24h: 34.56, volume24h: 230000000, tvl: 0, marketCap: 1100000000, category: "meme" },
  { symbol: "GIGA", name: "Gigachad", icon: "G", decimals: 5, price: 0.045, change24h: 18.90, volume24h: 89000000, tvl: 0, marketCap: 450000000, category: "meme" },
  { symbol: "TOSHI", name: "Toshi", icon: "T", decimals: 18, price: 0.00089, change24h: 12.34, volume24h: 45000000, tvl: 0, marketCap: 340000000, category: "meme" },
  
  // AI Tokens
  { symbol: "FET", name: "Fetch.ai", icon: "F", decimals: 18, price: 1.45, change24h: 6.78, volume24h: 230000000, tvl: 0, marketCap: 3700000000, category: "ai" },
  { symbol: "RENDER", name: "Render", icon: "R", decimals: 18, price: 7.23, change24h: 4.56, volume24h: 340000000, tvl: 0, marketCap: 3800000000, category: "ai" },
  { symbol: "TAO", name: "Bittensor", icon: "τ", decimals: 9, price: 456.78, change24h: 8.90, volume24h: 120000000, tvl: 0, marketCap: 3200000000, category: "ai" },
  { symbol: "AGIX", name: "SingularityNET", icon: "A", decimals: 8, price: 0.67, change24h: 5.67, volume24h: 89000000, tvl: 0, marketCap: 880000000, category: "ai" },
  { symbol: "WLD", name: "Worldcoin", icon: "W", decimals: 18, price: 2.34, change24h: 3.45, volume24h: 180000000, tvl: 0, marketCap: 1800000000, category: "ai" },
  { symbol: "OCEAN", name: "Ocean Protocol", icon: "O", decimals: 18, price: 0.78, change24h: 4.56, volume24h: 56000000, tvl: 0, marketCap: 440000000, category: "ai" },
  { symbol: "AKT", name: "Akash Network", icon: "A", decimals: 6, price: 3.45, change24h: 7.89, volume24h: 45000000, tvl: 0, marketCap: 870000000, category: "ai" },
  { symbol: "RNDR", name: "Render", icon: "R", decimals: 18, price: 7.23, change24h: 4.56, volume24h: 340000000, tvl: 0, marketCap: 3800000000, category: "ai" },
  { symbol: "AR", name: "Arweave", icon: "A", decimals: 12, price: 18.90, change24h: 5.67, volume24h: 89000000, tvl: 0, marketCap: 1200000000, category: "ai" },
  { symbol: "ARKM", name: "Arkham", icon: "A", decimals: 18, price: 1.67, change24h: 8.90, volume24h: 120000000, tvl: 0, marketCap: 370000000, category: "ai" },
  { symbol: "AI16Z", name: "ai16z", icon: "A", decimals: 9, price: 1.23, change24h: 23.45, volume24h: 450000000, tvl: 0, marketCap: 1300000000, category: "ai" },
  { symbol: "VIRTUAL", name: "Virtual Protocol", icon: "V", decimals: 18, price: 2.89, change24h: 18.90, volume24h: 340000000, tvl: 0, marketCap: 2900000000, category: "ai" },
  { symbol: "AIXBT", name: "aixbt", icon: "A", decimals: 18, price: 0.67, change24h: 34.56, volume24h: 230000000, tvl: 0, marketCap: 650000000, category: "ai" },
  { symbol: "GRASS", name: "Grass", icon: "G", decimals: 9, price: 2.12, change24h: 12.34, volume24h: 180000000, tvl: 0, marketCap: 510000000, category: "ai" },
  
  // Gaming Tokens
  { symbol: "AXS", name: "Axie Infinity", icon: "A", decimals: 18, price: 7.23, change24h: 3.45, volume24h: 89000000, tvl: 0, marketCap: 1000000000, category: "gaming" },
  { symbol: "SAND", name: "The Sandbox", icon: "S", decimals: 18, price: 0.56, change24h: 4.56, volume24h: 120000000, tvl: 0, marketCap: 1300000000, category: "gaming" },
  { symbol: "MANA", name: "Decentraland", icon: "M", decimals: 18, price: 0.45, change24h: 2.34, volume24h: 89000000, tvl: 0, marketCap: 870000000, category: "gaming" },
  { symbol: "GALA", name: "Gala", icon: "G", decimals: 8, price: 0.034, change24h: 5.67, volume24h: 180000000, tvl: 0, marketCap: 1300000000, category: "gaming" },
  { symbol: "ILV", name: "Illuvium", icon: "I", decimals: 18, price: 45.67, change24h: 6.78, volume24h: 34000000, tvl: 0, marketCap: 290000000, category: "gaming" },
  { symbol: "BEAM", name: "Beam", icon: "B", decimals: 18, price: 0.023, change24h: 8.90, volume24h: 89000000, tvl: 0, marketCap: 1100000000, category: "gaming" },
  { symbol: "PRIME", name: "Echelon Prime", icon: "P", decimals: 18, price: 12.34, change24h: 4.56, volume24h: 56000000, tvl: 0, marketCap: 450000000, category: "gaming" },
  { symbol: "PIXEL", name: "Pixels", icon: "P", decimals: 18, price: 0.18, change24h: 7.89, volume24h: 45000000, tvl: 0, marketCap: 140000000, category: "gaming" },
  { symbol: "RONIN", name: "Ronin", icon: "R", decimals: 18, price: 1.89, change24h: 3.45, volume24h: 67000000, tvl: 0, marketCap: 670000000, category: "gaming" },
  { symbol: "YGG", name: "YGG", icon: "Y", decimals: 18, price: 0.56, change24h: 5.67, volume24h: 23000000, tvl: 0, marketCap: 210000000, category: "gaming" },
  
  // RWA (Real World Assets)
  { symbol: "LINK", name: "Chainlink", icon: "⬡", decimals: 18, price: 18.92, change24h: 3.21, volume24h: 1200000000, tvl: 4500000000, marketCap: 11800000000, category: "rwa" },
  { symbol: "MKR", name: "Maker", icon: "M", decimals: 18, price: 1567.89, change24h: 2.34, volume24h: 89000000, tvl: 8900000000, marketCap: 1400000000, category: "rwa" },
  { symbol: "ONDO", name: "Ondo Finance", icon: "O", decimals: 18, price: 1.23, change24h: 8.90, volume24h: 340000000, tvl: 890000000, marketCap: 1700000000, category: "rwa" },
  { symbol: "CPOOL", name: "Clearpool", icon: "C", decimals: 18, price: 0.23, change24h: 5.67, volume24h: 12000000, tvl: 45000000, marketCap: 120000000, category: "rwa" },
  { symbol: "MPL", name: "Maple", icon: "M", decimals: 18, price: 18.90, change24h: 4.56, volume24h: 8900000, tvl: 230000000, marketCap: 170000000, category: "rwa" },
  { symbol: "CFG", name: "Centrifuge", icon: "C", decimals: 18, price: 0.45, change24h: 6.78, volume24h: 23000000, tvl: 340000000, marketCap: 230000000, category: "rwa" },
  { symbol: "PAXG", name: "PAX Gold", icon: "Au", decimals: 18, price: 2670.00, change24h: 0.34, volume24h: 34000000, tvl: 0, marketCap: 460000000, category: "rwa" },
  { symbol: "XAUt", name: "Tether Gold", icon: "Au", decimals: 6, price: 2668.00, change24h: 0.32, volume24h: 45000000, tvl: 0, marketCap: 590000000, category: "rwa" },
];

// Comprehensive list of 50+ networks
export const ALL_NETWORKS: Network[] = [
  // Mainnets
  { id: 1, name: "Ethereum", symbol: "ETH", color: "from-blue-400 to-purple-500", gasPrice: "~$2.50", blockTime: "12s", isL2: false, explorerUrl: "https://etherscan.io" },
  { id: 56, name: "BNB Chain", symbol: "BNB", color: "from-yellow-500 to-yellow-400", gasPrice: "~$0.05", blockTime: "3s", isL2: false, explorerUrl: "https://bscscan.com" },
  { id: 43114, name: "Avalanche", symbol: "AVAX", color: "from-red-600 to-red-400", gasPrice: "~$0.08", blockTime: "2s", isL2: false, explorerUrl: "https://snowtrace.io" },
  { id: 250, name: "Fantom", symbol: "FTM", color: "from-blue-500 to-blue-300", gasPrice: "~$0.01", blockTime: "1s", isL2: false, explorerUrl: "https://ftmscan.com" },
  { id: 25, name: "Cronos", symbol: "CRO", color: "from-blue-700 to-blue-500", gasPrice: "~$0.01", blockTime: "5s", isL2: false, explorerUrl: "https://cronoscan.com" },
  { id: 100, name: "Gnosis", symbol: "xDAI", color: "from-green-500 to-teal-400", gasPrice: "~$0.001", blockTime: "5s", isL2: false, explorerUrl: "https://gnosisscan.io" },
  { id: 1284, name: "Moonbeam", symbol: "GLMR", color: "from-cyan-400 to-purple-500", gasPrice: "~$0.01", blockTime: "12s", isL2: false, explorerUrl: "https://moonbeam.moonscan.io" },
  { id: 1285, name: "Moonriver", symbol: "MOVR", color: "from-yellow-500 to-orange-500", gasPrice: "~$0.005", blockTime: "12s", isL2: false, explorerUrl: "https://moonriver.moonscan.io" },
  { id: 42220, name: "Celo", symbol: "CELO", color: "from-green-400 to-yellow-400", gasPrice: "~$0.001", blockTime: "5s", isL2: false, explorerUrl: "https://celoscan.io" },
  { id: 1666600000, name: "Harmony", symbol: "ONE", color: "from-cyan-500 to-blue-500", gasPrice: "~$0.0001", blockTime: "2s", isL2: false, explorerUrl: "https://explorer.harmony.one" },
  { id: 128, name: "Huobi ECO", symbol: "HT", color: "from-blue-600 to-blue-400", gasPrice: "~$0.01", blockTime: "3s", isL2: false, explorerUrl: "https://hecoinfo.com" },
  { id: 66, name: "OKXChain", symbol: "OKT", color: "from-gray-800 to-gray-600", gasPrice: "~$0.01", blockTime: "4s", isL2: false, explorerUrl: "https://www.oklink.com/okc" },
  { id: 288, name: "Boba Network", symbol: "BOBA", color: "from-green-500 to-lime-400", gasPrice: "~$0.05", blockTime: "1s", isL2: true, explorerUrl: "https://bobascan.com" },
  { id: 1088, name: "Metis", symbol: "METIS", color: "from-cyan-400 to-teal-500", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://andromeda-explorer.metis.io" },
  { id: 1101, name: "Polygon zkEVM", symbol: "ETH", color: "from-purple-600 to-purple-400", gasPrice: "~$0.05", blockTime: "2s", isL2: true, explorerUrl: "https://zkevm.polygonscan.com" },
  { id: 5000, name: "Mantle", symbol: "MNT", color: "from-gray-700 to-gray-500", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://explorer.mantle.xyz" },
  { id: 169, name: "Manta Pacific", symbol: "ETH", color: "from-blue-400 to-cyan-400", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://pacific-explorer.manta.network" },
  { id: 2222, name: "Kava", symbol: "KAVA", color: "from-red-500 to-pink-500", gasPrice: "~$0.01", blockTime: "6s", isL2: false, explorerUrl: "https://kavascan.com" },
  { id: 1313161554, name: "Aurora", symbol: "ETH", color: "from-green-400 to-emerald-500", gasPrice: "~$0.01", blockTime: "1s", isL2: true, explorerUrl: "https://explorer.aurora.dev" },
  { id: 40, name: "Telos", symbol: "TLOS", color: "from-purple-500 to-violet-500", gasPrice: "~$0.0001", blockTime: "0.5s", isL2: false, explorerUrl: "https://teloscan.io" },
  { id: 592, name: "Astar", symbol: "ASTR", color: "from-blue-500 to-purple-500", gasPrice: "~$0.01", blockTime: "12s", isL2: false, explorerUrl: "https://astar.subscan.io" },
  { id: 106, name: "Velas", symbol: "VLX", color: "from-blue-400 to-indigo-500", gasPrice: "~$0.0001", blockTime: "0.4s", isL2: false, explorerUrl: "https://evmexplorer.velas.com" },
  { id: 2000, name: "Dogechain", symbol: "DOGE", color: "from-yellow-400 to-yellow-300", gasPrice: "~$0.001", blockTime: "2s", isL2: false, explorerUrl: "https://explorer.dogechain.dog" },
  { id: 32659, name: "Fusion", symbol: "FSN", color: "from-blue-500 to-purple-500", gasPrice: "~$0.001", blockTime: "15s", isL2: false, explorerUrl: "https://fsnscan.com" },
  { id: 122, name: "Fuse", symbol: "FUSE", color: "from-green-400 to-lime-400", gasPrice: "~$0.0001", blockTime: "5s", isL2: false, explorerUrl: "https://explorer.fuse.io" },
  
  // Layer 2s
  { id: 42161, name: "Arbitrum One", symbol: "ETH", color: "from-blue-500 to-cyan-400", gasPrice: "~$0.15", blockTime: "0.3s", isL2: true, explorerUrl: "https://arbiscan.io" },
  { id: 42170, name: "Arbitrum Nova", symbol: "ETH", color: "from-orange-500 to-yellow-500", gasPrice: "~$0.01", blockTime: "0.3s", isL2: true, explorerUrl: "https://nova.arbiscan.io" },
  { id: 10, name: "Optimism", symbol: "ETH", color: "from-red-500 to-pink-500", gasPrice: "~$0.10", blockTime: "2s", isL2: true, explorerUrl: "https://optimistic.etherscan.io" },
  { id: 137, name: "Polygon", symbol: "MATIC", color: "from-purple-500 to-indigo-500", gasPrice: "~$0.01", blockTime: "2s", isL2: true, explorerUrl: "https://polygonscan.com" },
  { id: 8453, name: "Base", symbol: "ETH", color: "from-blue-600 to-blue-400", gasPrice: "~$0.08", blockTime: "2s", isL2: true, explorerUrl: "https://basescan.org" },
  { id: 324, name: "zkSync Era", symbol: "ETH", color: "from-purple-600 to-blue-500", gasPrice: "~$0.12", blockTime: "1s", isL2: true, explorerUrl: "https://explorer.zksync.io" },
  { id: 59144, name: "Linea", symbol: "ETH", color: "from-gray-800 to-gray-600", gasPrice: "~$0.15", blockTime: "2s", isL2: true, explorerUrl: "https://lineascan.build" },
  { id: 534352, name: "Scroll", symbol: "ETH", color: "from-orange-500 to-amber-400", gasPrice: "~$0.10", blockTime: "3s", isL2: true, explorerUrl: "https://scrollscan.com" },
  { id: 81457, name: "Blast", symbol: "ETH", color: "from-yellow-400 to-lime-500", gasPrice: "~$0.05", blockTime: "2s", isL2: true, explorerUrl: "https://blastscan.io" },
  { id: 7777777, name: "Zora", symbol: "ETH", color: "from-violet-400 to-pink-400", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://explorer.zora.energy" },
  { id: 34443, name: "Mode", symbol: "ETH", color: "from-yellow-500 to-green-500", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://explorer.mode.network" },
  { id: 167000, name: "Taiko", symbol: "ETH", color: "from-pink-500 to-rose-500", gasPrice: "~$0.10", blockTime: "3s", isL2: true, explorerUrl: "https://taikoscan.io" },
  { id: 252, name: "Fraxtal", symbol: "frxETH", color: "from-gray-700 to-gray-500", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://fraxscan.com" },
  { id: 204, name: "opBNB", symbol: "BNB", color: "from-yellow-500 to-orange-500", gasPrice: "~$0.001", blockTime: "1s", isL2: true, explorerUrl: "https://opbnbscan.com" },
  { id: 7560, name: "Cyber", symbol: "ETH", color: "from-cyan-500 to-blue-500", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://cyberscan.co" },
  { id: 255, name: "Kroma", symbol: "ETH", color: "from-green-500 to-emerald-500", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://kromascan.com" },
  { id: 167008, name: "Taiko Hekla", symbol: "ETH", color: "from-pink-400 to-purple-400", gasPrice: "~$0.05", blockTime: "3s", isL2: true, isTestnet: true, explorerUrl: "https://hekla.taikoscan.io" },
  { id: 666666666, name: "Degen", symbol: "DEGEN", color: "from-purple-600 to-violet-500", gasPrice: "~$0.001", blockTime: "2s", isL2: true, explorerUrl: "https://explorer.degen.tips" },
  { id: 660279, name: "Xai", symbol: "XAI", color: "from-red-500 to-orange-500", gasPrice: "~$0.01", blockTime: "0.3s", isL2: true, explorerUrl: "https://explorer.xai-chain.net" },
  { id: 1750, name: "Metal L2", symbol: "ETH", color: "from-gray-600 to-gray-400", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://explorer.metall2.com" },
  { id: 4653, name: "Gold Chain", symbol: "ETH", color: "from-yellow-500 to-amber-500", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://explorer.gold.dev" },
  { id: 957, name: "Lyra", symbol: "ETH", color: "from-cyan-400 to-teal-400", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://explorer.lyra.finance" },
  { id: 291, name: "Orderly", symbol: "ETH", color: "from-purple-500 to-indigo-500", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://explorer.orderly.network" },
  { id: 1135, name: "Lisk", symbol: "ETH", color: "from-blue-500 to-indigo-500", gasPrice: "~$0.02", blockTime: "2s", isL2: true, explorerUrl: "https://blockscout.lisk.com" },
  { id: 888888888, name: "Ancient8", symbol: "ETH", color: "from-orange-500 to-red-500", gasPrice: "~$0.01", blockTime: "2s", isL2: true, explorerUrl: "https://scan.ancient8.gg" },
  { id: 7979, name: "DOS Chain", symbol: "DOS", color: "from-blue-400 to-purple-400", gasPrice: "~$0.001", blockTime: "2s", isL2: true, explorerUrl: "https://doscan.io" },
  
  // Testnets
  { id: 11155111, name: "Sepolia", symbol: "ETH", color: "from-blue-300 to-purple-300", gasPrice: "Free", blockTime: "12s", isL2: false, isTestnet: true, explorerUrl: "https://sepolia.etherscan.io" },
  { id: 5, name: "Goerli", symbol: "ETH", color: "from-blue-200 to-purple-200", gasPrice: "Free", blockTime: "12s", isL2: false, isTestnet: true, explorerUrl: "https://goerli.etherscan.io" },
  { id: 80001, name: "Mumbai", symbol: "MATIC", color: "from-purple-300 to-indigo-300", gasPrice: "Free", blockTime: "2s", isL2: true, isTestnet: true, explorerUrl: "https://mumbai.polygonscan.com" },
  { id: 421614, name: "Arbitrum Sepolia", symbol: "ETH", color: "from-blue-300 to-cyan-300", gasPrice: "Free", blockTime: "0.3s", isL2: true, isTestnet: true, explorerUrl: "https://sepolia.arbiscan.io" },
  { id: 11155420, name: "Optimism Sepolia", symbol: "ETH", color: "from-red-300 to-pink-300", gasPrice: "Free", blockTime: "2s", isL2: true, isTestnet: true, explorerUrl: "https://sepolia-optimism.etherscan.io" },
  { id: 84532, name: "Base Sepolia", symbol: "ETH", color: "from-blue-400 to-blue-300", gasPrice: "Free", blockTime: "2s", isL2: true, isTestnet: true, explorerUrl: "https://sepolia.basescan.org" },
];

// Helper functions
export function getTokensByCategory(category: Token["category"]): Token[] {
  return ALL_TOKENS.filter(token => token.category === category);
}

export function getPopularTokens(limit = 20): Token[] {
  return ALL_TOKENS
    .filter(t => t.volume24h && t.volume24h > 0)
    .sort((a, b) => (b.volume24h || 0) - (a.volume24h || 0))
    .slice(0, limit);
}

export function getMainnets(): Network[] {
  return ALL_NETWORKS.filter(n => !n.isL2 && !n.isTestnet);
}

export function getL2Networks(): Network[] {
  return ALL_NETWORKS.filter(n => n.isL2 && !n.isTestnet);
}

export function getTestnets(): Network[] {
  return ALL_NETWORKS.filter(n => n.isTestnet);
}

export function searchTokens(query: string): Token[] {
  const lowerQuery = query.toLowerCase();
  return ALL_TOKENS.filter(
    token =>
      token.symbol.toLowerCase().includes(lowerQuery) ||
      token.name.toLowerCase().includes(lowerQuery)
  );
}

export function searchNetworks(query: string): Network[] {
  const lowerQuery = query.toLowerCase();
  return ALL_NETWORKS.filter(
    network =>
      network.name.toLowerCase().includes(lowerQuery) ||
      network.symbol.toLowerCase().includes(lowerQuery)
  );
}
