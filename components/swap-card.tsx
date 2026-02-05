"use client";

import { useState, useEffect } from "react";
import { ArrowDownUp, Info, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TokenSelector } from "./token-selector";
import { TokenSelectModal } from "./token-select-modal";
import { ALL_TOKENS, type Token, getPopularTokens } from "@/lib/tokens";
import { 
  usePrices, 
  formatPrice, 
  formatChange, 
  calculateOutputAmount, 
  PLATFORM_CONFIG 
} from "@/hooks/use-prices";

const POPULAR_TOKENS = getPopularTokens(20);

export function SwapCard() {
  const [fromToken, setFromToken] = useState<Token>(POPULAR_TOKENS[0] || ALL_TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(POPULAR_TOKENS[1] || ALL_TOKENS[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState<"from" | "to" | null>(null);
  const [rate, setRate] = useState(0); // Declare the rate variable
  const slippage = 0.01; // 0.01% slippage

  const { prices, isLoading: pricesLoading, lastUpdate, refresh } = usePrices();

  const fromPrice = prices[fromToken.symbol]?.usd || fromToken.price || 0;
  const toPrice = prices[toToken.symbol]?.usd || toToken.price || 0;
  const fromChange = prices[fromToken.symbol]?.usd_24h_change || fromToken.change24h || 0;
  const toChange = prices[toToken.symbol]?.usd_24h_change || toToken.change24h || 0;

  // Calculate the actual rate used in the swap (with bonus and fee applied)
  const marketRate = toPrice > 0 ? fromPrice / toPrice : 0;
  const actualRate = marketRate * (1 + PLATFORM_CONFIG.BONUS_RATE) * (1 - PLATFORM_CONFIG.SERVICE_FEE);

  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount)) && fromPrice > 0 && toPrice > 0) {
      const output = calculateOutputAmount(Number(fromAmount), fromPrice, toPrice, slippage / 100);
      setToAmount(output.toFixed(6));
      setRate(actualRate); // Update the rate variable
    } else {
      setToAmount("");
      setRate(0); // Reset the rate variable
    }
  }, [fromAmount, fromPrice, toPrice, slippage]);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
  };

  const handleTokenSelect = (token: Token) => {
    if (modalOpen === "from") {
      if (token.symbol === toToken.symbol) {
        setToToken(fromToken);
      }
      setFromToken(token);
    } else if (modalOpen === "to") {
      if (token.symbol === fromToken.symbol) {
        setFromToken(toToken);
      }
      setToToken(token);
    }
  };

  const handleSwap = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const fromUsdValue = fromAmount ? Number(fromAmount) * fromPrice : 0;
  const toUsdValue = toAmount ? Number(toAmount) * toPrice : 0;
  // Price impact is minimal for most swaps, simulate based on amount (larger swaps = higher impact)
  const priceImpact = fromUsdValue > 0 ? Math.min(0.01 + (fromUsdValue / 1000000) * 0.1, 5) : 0;

  const lastUpdateTime = lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : "";

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Swap</h2>
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
              Live Rates
            </span>
          </div>
        </div>

        

        <div className="glass-card rounded-3xl p-4 neon-border">
          <div className="swap-input rounded-2xl p-4 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">You pay</span>
              <span className="text-sm text-muted-foreground">
                Balance: {fromToken.balance || "0"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                placeholder="0.0"
                className="flex-1 min-w-0 bg-transparent text-2xl sm:text-3xl font-semibold outline-none placeholder:text-muted-foreground/50"
              />
              <div className="shrink-0">
                <TokenSelector token={fromToken} onClick={() => setModalOpen("from")} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {formatPrice(fromPrice)}
                </span>
                <span className={`text-xs ${fromChange >= 0 ? 'text-primary' : 'text-red-400'}`}>
                  {formatChange(fromChange)}
                </span>
              </div>
              <button 
                onClick={() => handleFromAmountChange(fromToken.balance?.replace(",", "") || "0")}
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                MAX
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <button
              onClick={handleSwapTokens}
              className="relative z-10 p-3 rounded-xl bg-secondary border border-border hover:bg-primary/20 hover:border-primary/50 transition-all group"
            >
              <ArrowDownUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>

          <div className="swap-input rounded-2xl p-4 mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">You receive</span>
              <span className="text-sm text-muted-foreground">
                Balance: {toToken.balance || "0"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="flex-1 min-w-0 bg-transparent text-2xl sm:text-3xl font-semibold outline-none placeholder:text-muted-foreground/50"
              />
              <div className="shrink-0">
                <TokenSelector token={toToken} onClick={() => setModalOpen("to")} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {formatPrice(toPrice)}
                </span>
                <span className={`text-xs ${toChange >= 0 ? 'text-primary' : 'text-red-400'}`}>
                  {formatChange(toChange)}
                </span>
              </div>
            </div>
          </div>

          {fromAmount && rate > 0 && (
            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-secondary/50">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Rate
                  </span>
                  <span className="font-medium">
                    1 {fromToken.symbol} = {actualRate.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toToken.symbol}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-secondary/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    Network Fee
                  </span>
                  <span className="font-medium">~$2.34</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    Service Fee
                  </span>
                  <span className="font-medium">{PLATFORM_CONFIG.SERVICE_FEE * 100}%</span>
                </div>
                
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Price Impact</span>
                  <span className={`font-medium ${priceImpact > 3 ? 'text-red-400' : priceImpact > 1 ? 'text-yellow-400' : ''}`}>
                    {priceImpact.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Min. received</span>
                  <span className="font-medium">
                    {(Number(toAmount) * (1 - slippage / 100)).toFixed(6)} {toToken.symbol}
                  </span>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={() => { /* TODO: Connect wallet */ }}
            className={`w-full mt-4 h-14 rounded-2xl text-lg font-semibold transition-all cursor-pointer active:scale-[0.98] ${
              fromAmount && Number(fromAmount) > 0
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground neon-glow hover:opacity-90"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {pricesLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Loading prices...
              </div>
            ) : fromAmount && Number(fromAmount) > 0 ? (
              "Connect Wallet"
            ) : (
              "Enter an amount"
            )}
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Zap className="w-4 h-4 text-primary" />
          <span>Live prices | Updated: {lastUpdateTime || "..."}</span>
        </div>
      </div>

      <TokenSelectModal
        isOpen={modalOpen !== null}
        onClose={() => setModalOpen(null)}
        onSelect={handleTokenSelect}
        selectedToken={modalOpen === "from" ? fromToken : toToken}
      />
    </>
  );
}
