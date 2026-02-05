import { NextResponse } from "next/server";
import { assets } from "path/to/assets"; // Declare or import the assets variable

// Fallback prices
const FALLBACK_PRICES: Record<string, { usd: number; usd_24h_change: number }> = {
  ETH: { usd: 2650, usd_24h_change: 1.8 },
  WETH: { usd: 2650, usd_24h_change: 1.8 },
  BTC: { usd: 97500, usd_24h_change: 1.2 },
  WBTC: { usd: 97500, usd_24h_change: 1.2 },
  USDT: { usd: 1.0, usd_24h_change: 0.0 },
  USDC: { usd: 1.0, usd_24h_change: 0.0 },
  DAI: { usd: 1.0, usd_24h_change: 0.0 },
  BNB: { usd: 650, usd_24h_change: 2.1 },
  SOL: { usd: 190, usd_24h_change: 3.5 },
  XRP: { usd: 2.85, usd_24h_change: 2.2 },
  ADA: { usd: 0.95, usd_24h_change: 1.8 },
  DOGE: { usd: 0.32, usd_24h_change: 4.5 },
  DOT: { usd: 7.5, usd_24h_change: 2.8 },
  AVAX: { usd: 38, usd_24h_change: 3.2 },
  MATIC: { usd: 0.52, usd_24h_change: 1.5 },
  LINK: { usd: 24, usd_24h_change: 4.1 },
  UNI: { usd: 14, usd_24h_change: 2.5 },
  ATOM: { usd: 9.5, usd_24h_change: 2.1 },
  LTC: { usd: 125, usd_24h_change: 1.8 },
  ARB: { usd: 0.85, usd_24h_change: 3.2 },
  OP: { usd: 1.95, usd_24h_change: 2.8 },
  NEAR: { usd: 5.2, usd_24h_change: 4.5 },
  AAVE: { usd: 320, usd_24h_change: 2.2 },
  GRT: { usd: 0.22, usd_24h_change: 3.8 },
  MKR: { usd: 1650, usd_24h_change: 1.5 },
  RENDER: { usd: 7.8, usd_24h_change: 5.2 },
  INJ: { usd: 28, usd_24h_change: 4.8 },
  FTM: { usd: 0.72, usd_24h_change: 3.5 },
  SAND: { usd: 0.58, usd_24h_change: 2.8 },
  MANA: { usd: 0.48, usd_24h_change: 2.5 },
  APE: { usd: 1.45, usd_24h_change: 3.2 },
  CRV: { usd: 0.85, usd_24h_change: 2.1 },
  LDO: { usd: 2.2, usd_24h_change: 3.8 },
  SNX: { usd: 2.8, usd_24h_change: 1.8 },
  COMP: { usd: 72, usd_24h_change: 2.5 },
  BAL: { usd: 3.8, usd_24h_change: 1.5 },
  SUSHI: { usd: 1.25, usd_24h_change: 2.8 },
  YFI: { usd: 7500, usd_24h_change: 1.2 },
  ENS: { usd: 28, usd_24h_change: 4.2 },
  IMX: { usd: 2.1, usd_24h_change: 3.5 },
  GALA: { usd: 0.042, usd_24h_change: 5.8 },
  ENJ: { usd: 0.32, usd_24h_change: 3.2 },
  AXS: { usd: 8.5, usd_24h_change: 2.8 },
  SHIB: { usd: 0.000024, usd_24h_change: 6.5 },
  PEPE: { usd: 0.0000185, usd_24h_change: 8.2 },
  FLOKI: { usd: 0.00018, usd_24h_change: 5.5 },
  TON: { usd: 5.8, usd_24h_change: 2.8 },
  SUI: { usd: 4.2, usd_24h_change: 4.5 },
  APT: { usd: 9.5, usd_24h_change: 3.8 },
  SEI: { usd: 0.52, usd_24h_change: 4.2 },
  TIA: { usd: 5.8, usd_24h_change: 5.5 },
  STX: { usd: 1.85, usd_24h_change: 3.2 },
  KAS: { usd: 0.12, usd_24h_change: 6.8 },
};

// Cache for prices
let priceCache: {
  data: Record<string, { usd: number; usd_24h_change: number }>;
  timestamp: number;
} | null = null;

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  try {
    // Check cache first
    if (priceCache && Date.now() - priceCache.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        prices: priceCache.data,
        cached: true,
        lastUpdate: new Date(priceCache.timestamp).toISOString(),
        nextUpdate: new Date(priceCache.timestamp + CACHE_DURATION).toISOString(),
      });
    }

    // Try CryptoCompare API (more reliable, generous free tier)
    const symbols = Object.keys(FALLBACK_PRICES).join(",");
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbols}&tsyms=USD`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 600 },
      }
    );

    if (!response.ok) {
      // Return fallback or cached prices if API fails
      const fallbackData = priceCache?.data || FALLBACK_PRICES;
      return NextResponse.json({
        prices: fallbackData,
        cached: true,
        fallback: !priceCache,
        lastUpdate: new Date().toISOString(),
      });
    }

    const cryptoData = await response.json();
    const rawData = cryptoData.RAW || {};

    // Build prices object from CryptoCompare data
    const prices: Record<string, { usd: number; usd_24h_change: number }> = { ...FALLBACK_PRICES };

    // Map CryptoCompare response to our format
    for (const symbol of Object.keys(FALLBACK_PRICES)) {
      const tokenData = rawData[symbol]?.USD;
      if (tokenData) {
        prices[symbol] = {
          usd: tokenData.PRICE || FALLBACK_PRICES[symbol]?.usd || 0,
          usd_24h_change: tokenData.CHANGEPCT24HOUR || 0,
        };
      }
    }

    // Update cache
    priceCache = {
      data: prices,
      timestamp: Date.now(),
    };

    return NextResponse.json({
      prices,
      cached: false,
      lastUpdate: new Date().toISOString(),
      nextUpdate: new Date(Date.now() + CACHE_DURATION).toISOString(),
    });
  } catch (error) {
    console.error("Error fetching prices:", error);

    // Return cached or fallback prices
    const fallbackData = priceCache?.data || FALLBACK_PRICES;
    return NextResponse.json({
      prices: fallbackData,
      cached: true,
      fallback: !priceCache,
      lastUpdate: new Date().toISOString(),
    });
  }
}
