"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { usePrices } from "@/hooks/use-prices";
import { ALL_TOKENS, type Token } from "@/lib/tokens";

const POPULAR_TOKENS = ALL_TOKENS.filter(t => 
  ["ETH", "BTC", "USDT", "USDC", "SOL", "ARB", "OP", "MATIC"].includes(t.symbol)
).slice(0, 8);

const FIAT_CURRENCIES = [
  { code: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "UAH", symbol: "₴", flag: "🇺🇦" },
  { code: "RUB", symbol: "₽", flag: "🇷🇺" },
];

type Mode = "swap" | "limit" | "buy" | "sell";

export default function BuyPage() {
  const [mode, setMode] = useState<Mode>("buy");
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<Token>(POPULAR_TOKENS[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(FIAT_CURRENCIES[0]);
  const [showTokenSelect, setShowTokenSelect] = useState(false);
  const [showCurrencySelect, setShowCurrencySelect] = useState(false);
  
  const { prices } = usePrices();
  const tokenPrice = prices[selectedToken.symbol]?.usd || 0;
  
  const numAmount = parseFloat(amount) || 0;
  
  // Calculate token amount with 2% bonus (user gets more)
  const BONUS_RATE = 0.02;
  const tokenAmount = tokenPrice > 0 ? (numAmount / tokenPrice) * (1 + BONUS_RATE) : 0;

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    setAmount(cleaned);
  };

  const handlePercentClick = (percent: number) => {
    /* TODO: Calculate percent of max balance */
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-md mx-auto">
          
          {/* Mode Tabs */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {[
              { id: "swap" as Mode, label: "Swap" },
              { id: "limit" as Mode, label: "Limit" },
              { id: "buy" as Mode, label: "Buy" },
              { id: "sell" as Mode, label: "Sell" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setMode(tab.id); /* TODO: Handle mode change */ }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer active:scale-95 ${
                  mode === tab.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Card */}
          <div className="glass-card rounded-3xl p-6 neon-border mb-3">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-muted-foreground">
                {mode === "sell" ? "You sell" : "You pay"}
              </span>
              
              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => { setShowCurrencySelect(!showCurrencySelect); /* TODO: Currency select */ }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer active:scale-95"
                >
                  <span className="text-lg">{selectedCurrency.flag}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {showCurrencySelect && (
                  <div className="absolute right-0 top-full mt-2 z-50 bg-card border border-border rounded-xl shadow-lg p-2 min-w-[140px]">
                    {FIAT_CURRENCIES.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setShowCurrencySelect(false);
                          /* TODO: Handle currency change */
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer ${
                          selectedCurrency.code === currency.code ? "bg-primary/20" : ""
                        }`}
                      >
                        <span className="text-lg">{currency.flag}</span>
                        <span className="font-medium">{currency.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Amount Input */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <span className="text-6xl font-light text-muted-foreground absolute -left-8 top-0">
                  {selectedCurrency.symbol}
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount || "0"}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  onClick={() => { if (amount === "") setAmount(""); /* TODO: Handle click */ }}
                  className="bg-transparent text-6xl font-light text-center w-48 outline-none text-muted-foreground focus:text-foreground transition-colors"
                />
              </div>
            </div>

            {/* Percentage Buttons */}
            <div className="flex items-center justify-center gap-3">
              {[25, 50, 75].map((percent) => (
                <button
                  key={percent}
                  onClick={() => { handlePercentClick(percent); /* TODO: Set percent */ }}
                  className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-pointer active:scale-95"
                >
                  {percent}%
                </button>
              ))}
              <button
                onClick={() => { handlePercentClick(100); /* TODO: Set max */ }}
                className="px-5 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-pointer active:scale-95"
              >
                Max
              </button>
            </div>
          </div>

          {/* Token Selector */}
          <button
            onClick={() => { setShowTokenSelect(true); /* TODO: Open token select */ }}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all mb-3 cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                {selectedToken.symbol.charAt(0)}
              </div>
              <div className="text-left">
                <span className="font-medium text-lg">{selectedToken.symbol}</span>
                {numAmount > 0 && tokenAmount > 0 && (
                  <p className="text-sm text-primary">
                    You get: {tokenAmount.toFixed(6)} {selectedToken.symbol}
                  </p>
                )}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          
          {/* Bonus Info */}
          {numAmount > 0 && (
            <div className="text-center text-sm text-primary mb-3">
              +2% bonus rate compared to market
            </div>
          )}

          {/* Connect Wallet Button */}
          <Button
            onClick={() => { /* TODO: Connect wallet */ }}
            className={`w-full h-14 rounded-2xl text-lg font-semibold transition-all cursor-pointer active:scale-[0.98] ${
              numAmount > 0 
                ? "bg-primary/20 text-primary hover:bg-primary/30 border border-primary/50" 
                : "bg-secondary text-muted-foreground"
            }`}
          >
            Connect Wallet
          </Button>

        </div>
      </main>

      {/* Token Select Modal */}
      {showTokenSelect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-3xl p-6 w-full max-w-md max-h-[70vh] overflow-hidden neon-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Token</h3>
              <button
                onClick={() => { setShowTokenSelect(false); /* TODO: Close */ }}
                className="p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {POPULAR_TOKENS.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    setSelectedToken(token);
                    setShowTokenSelect(false);
                    /* TODO: Handle token selection */
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer active:scale-[0.98] ${
                    selectedToken.symbol === token.symbol ? "bg-primary/20" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    {token.symbol.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{token.symbol}</p>
                    <p className="text-sm text-muted-foreground">{token.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
