"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { usePrices } from "@/hooks/use-prices";

const trendingTokenSymbols = ["ETH", "BTC", "ARB", "OP", "MATIC", "SOL", "LINK", "UNI"];

export function TrendingTokens() {
  const { prices, isLoading } = usePrices();

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toFixed(4)}`;
    }
  };

  const trendingTokens = trendingTokenSymbols.map((symbol) => {
    const priceData = prices[symbol];
    return {
      symbol,
      name: symbol === "ETH" ? "Ethereum" : 
            symbol === "BTC" ? "Bitcoin" :
            symbol === "ARB" ? "Arbitrum" :
            symbol === "OP" ? "Optimism" :
            symbol === "MATIC" ? "Polygon" :
            symbol === "SOL" ? "Solana" :
            symbol === "LINK" ? "Chainlink" :
            symbol === "UNI" ? "Uniswap" : symbol,
      price: priceData?.usd || 0,
      change: priceData?.usd_24h_change || 0,
      icon: symbol.charAt(0),
    };
  });

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Trending Tokens
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {trendingTokens.map((token) => (
          <div
            key={token.symbol}
            className="flex-shrink-0 glass-card rounded-2xl px-4 py-3 flex items-center gap-3 hover:neon-border transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-lg font-bold">
              {token.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{token.symbol}</span>
                <span
                  className={`text-xs flex items-center gap-0.5 ${
                    token.change >= 0 ? "text-foreground" : "text-red-400"
                  }`}
                >
                  {token.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(token.change).toFixed(2)}%
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {isLoading ? "..." : formatPrice(token.price)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
