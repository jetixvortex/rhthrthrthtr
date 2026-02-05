"use client";

import useSWR from "swr";

// MultiSwap Platform Configuration
export const PLATFORM_CONFIG = {
  // Service fee: 0.1%
  SERVICE_FEE: 0.001,
  // Bonus rate: 2% better than market
  BONUS_RATE: 0.02,
  // Combined: user gets 2% more, minus 0.1% fee = ~1.9% better
  EFFECTIVE_BONUS: 0.02 - 0.001,
};

export interface PriceData {
  usd: number;
  usd_24h_change: number;
}

export interface PricesResponse {
  prices: Record<string, PriceData>;
  cached: boolean;
  stale?: boolean;
  lastUpdate: string;
  nextUpdate?: string;
  error?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePrices() {
  const { data, error, isLoading, mutate } = useSWR<PricesResponse>(
    "/api/prices",
    fetcher,
    {
      refreshInterval: 10 * 60 * 1000, // Refresh every 10 minutes
      revalidateOnFocus: false,
      dedupingInterval: 60 * 1000, // Dedupe requests within 1 minute
    }
  );

  return {
    prices: data?.prices || {},
    isLoading,
    isError: error,
    lastUpdate: data?.lastUpdate,
    nextUpdate: data?.nextUpdate,
    isStale: data?.stale,
    refresh: mutate,
  };
}

export function useTokenPrice(symbol: string) {
  const { prices, isLoading, isError } = usePrices();
  
  const price = prices[symbol];
  
  return {
    price: price?.usd || 0,
    change24h: price?.usd_24h_change || 0,
    isLoading,
    isError,
  };
}

export function useExchangeRate(fromSymbol: string, toSymbol: string) {
  const { prices, isLoading, isError } = usePrices();
  
  const fromPrice = prices[fromSymbol]?.usd || 0;
  const toPrice = prices[toSymbol]?.usd || 0;
  
  // Market rate
  const marketRate = toPrice > 0 ? fromPrice / toPrice : 0;
  
  // MultiSwap rate with 2% bonus (user gets more tokens)
  const multiswapRate = marketRate * (1 + PLATFORM_CONFIG.BONUS_RATE);
  
  return {
    marketRate,
    rate: multiswapRate, // MultiSwap advantageous rate
    fromPrice,
    toPrice,
    bonusPercent: PLATFORM_CONFIG.BONUS_RATE * 100,
    isLoading,
    isError,
  };
}

export function formatPrice(price: number): string {
  if (price === 0) return "$0.00";
  if (price < 0.0001) return `$${price.toExponential(2)}`;
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 1000) return `$${price.toFixed(2)}`;
  if (price < 1000000) return `$${(price / 1000).toFixed(2)}K`;
  if (price < 1000000000) return `$${(price / 1000000).toFixed(2)}M`;
  return `$${(price / 1000000000).toFixed(2)}B`;
}

export function formatChange(change: number): string {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}

/**
 * Calculate output amount with MultiSwap advantage
 * - 2% bonus (user gets more tokens)
 * - 0.1% service fee
 * - Net: ~1.9% better than market
 */
export function calculateOutputAmount(
  inputAmount: number,
  fromPrice: number,
  toPrice: number,
  slippage: number = 0.005 // 0.5% default slippage
): number {
  if (inputAmount <= 0 || fromPrice <= 0 || toPrice <= 0) return 0;
  
  // Calculate base output at market rate
  const marketOutput = (inputAmount * fromPrice) / toPrice;
  
  // Apply 2% bonus (user receives 2% more tokens)
  const bonusOutput = marketOutput * (1 + PLATFORM_CONFIG.BONUS_RATE);
  
  // Deduct 0.1% service fee
  const afterFeeOutput = bonusOutput * (1 - PLATFORM_CONFIG.SERVICE_FEE);
  
  // Apply slippage protection
  const finalOutput = afterFeeOutput * (1 - slippage);
  
  return finalOutput;
}

/**
 * Calculate market output without MultiSwap bonus (for comparison)
 */
export function calculateMarketOutput(
  inputAmount: number,
  fromPrice: number,
  toPrice: number,
  slippage: number = 0.005
): number {
  if (inputAmount <= 0 || fromPrice <= 0 || toPrice <= 0) return 0;
  const marketOutput = (inputAmount * fromPrice) / toPrice;
  return marketOutput * (1 - slippage);
}

/**
 * Calculate savings compared to market rate
 */
export function calculateSavings(
  inputAmount: number,
  fromPrice: number,
  toPrice: number
): { amount: number; percent: number; usdValue: number } {
  const marketOutput = calculateMarketOutput(inputAmount, fromPrice, toPrice, 0);
  const multiswapOutput = calculateOutputAmount(inputAmount, fromPrice, toPrice, 0);
  
  const savingsAmount = multiswapOutput - marketOutput;
  const savingsPercent = marketOutput > 0 ? (savingsAmount / marketOutput) * 100 : 0;
  const savingsUsd = savingsAmount * toPrice;
  
  return {
    amount: savingsAmount,
    percent: savingsPercent,
    usdValue: savingsUsd,
  };
}

/**
 * Get fee breakdown for display
 */
export function getFeeBreakdown(inputAmount: number, fromPrice: number): {
  serviceFeePercent: number;
  serviceFeeUsd: number;
  bonusPercent: number;
  bonusUsd: number;
  netBenefitPercent: number;
  netBenefitUsd: number;
} {
  const inputUsd = inputAmount * fromPrice;
  
  const serviceFeePercent = PLATFORM_CONFIG.SERVICE_FEE * 100;
  const serviceFeeUsd = inputUsd * PLATFORM_CONFIG.SERVICE_FEE;
  
  const bonusPercent = PLATFORM_CONFIG.BONUS_RATE * 100;
  const bonusUsd = inputUsd * PLATFORM_CONFIG.BONUS_RATE;
  
  const netBenefitPercent = bonusPercent - serviceFeePercent;
  const netBenefitUsd = bonusUsd - serviceFeeUsd;
  
  return {
    serviceFeePercent,
    serviceFeeUsd,
    bonusPercent,
    bonusUsd,
    netBenefitPercent,
    netBenefitUsd,
  };
}
