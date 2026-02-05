"use client";

import React from "react";
import { useState, useMemo } from "react";
import { X, Search, Star, TrendingUp, TrendingDown, Filter, RefreshCw } from "lucide-react";
import { ALL_TOKENS, type Token, getTokensByCategory, getPopularTokens } from "@/lib/tokens";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePrices, formatPrice, formatChange } from "@/hooks/use-prices";

interface TokenSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken?: Token;
}

type CategoryFilter = "all" | "native" | "stablecoin" | "defi" | "meme" | "layer2" | "ai" | "gaming" | "rwa";

export function TokenSelectModal({ isOpen, onClose, onSelect, selectedToken }: TokenSelectModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["ETH", "USDC", "WBTC", "BTC", "SOL", "ARB"]);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const { prices, isLoading: pricesLoading, lastUpdate, refresh } = usePrices();

  // Merge real prices with token data
  const tokensWithRealPrices = useMemo(() => {
    return ALL_TOKENS.map(token => ({
      ...token,
      price: prices[token.symbol]?.usd || token.price,
      change24h: prices[token.symbol]?.usd_24h_change || token.change24h,
    }));
  }, [prices]);

  const filteredTokens = useMemo(() => {
    let tokens = categoryFilter === "all" 
      ? tokensWithRealPrices 
      : tokensWithRealPrices.filter(t => t.category === categoryFilter);
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      tokens = tokens.filter(
        (token) =>
          token.symbol.toLowerCase().includes(lowerQuery) ||
          token.name.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Sort by price (descending) to show most valuable tokens first
    return tokens.sort((a, b) => (b.price || 0) - (a.price || 0));
  }, [searchQuery, categoryFilter, tokensWithRealPrices]);

  const popularTokens = useMemo(() => {
    const popular = getPopularTokens(8);
    return popular.map(token => ({
      ...token,
      price: prices[token.symbol]?.usd || token.price,
      change24h: prices[token.symbol]?.usd_24h_change || token.change24h,
    }));
  }, [prices]);

  const favoriteTokens = useMemo(() => 
    tokensWithRealPrices.filter((token) => favorites.includes(token.symbol)).slice(0, 8),
    [favorites, tokensWithRealPrices]
  );

  if (!isOpen) return null;

  const toggleFavorite = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const handleSelect = (token: Token) => {
    onSelect(token);
    onClose();
  };

  const categoryLabels: Record<CategoryFilter, string> = {
    all: "All",
    native: "Native",
    stablecoin: "Stable",
    defi: "DeFi",
    meme: "Meme",
    layer2: "L2",
    ai: "AI",
    gaming: "Gaming",
    rwa: "RWA",
  };

  const lastUpdateTime = lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg glass-card rounded-3xl neon-border overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div>
            <h2 className="text-lg font-semibold">Select a token</h2>
            <p className="text-xs text-muted-foreground">
              {pricesLoading ? "Loading prices..." : `Updated: ${lastUpdateTime}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => refresh()}
              className={`p-2 rounded-xl hover:bg-secondary transition-colors ${pricesLoading ? 'animate-pulse' : ''}`}
              title="Refresh prices"
            >
              <RefreshCw className={`w-5 h-5 ${pricesLoading ? 'animate-spin text-primary' : 'text-muted-foreground'}`} />
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-xl transition-colors ${showFilters ? 'bg-primary/20 text-primary' : 'hover:bg-secondary'}`}
            >
              <Filter className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 pb-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or paste address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-secondary/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-colors placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(categoryLabels) as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    categoryFilter === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Access Tokens */}
        {!searchQuery && (
          <div className="px-4 pb-2">
            <Tabs defaultValue="popular" className="w-full">
              <TabsList className="bg-transparent border-b border-border/30 rounded-none w-full justify-start gap-4 h-auto pb-2">
                <TabsTrigger value="popular" className="rounded-lg px-3 py-1.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  Popular
                </TabsTrigger>
                <TabsTrigger value="favorites" className="rounded-lg px-3 py-1.5 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  Favorites
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex flex-wrap gap-2 mt-3">
              {(favoriteTokens.length > 0 ? favoriteTokens : popularTokens).slice(0, 8).map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => handleSelect(token)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                    selectedToken?.symbol === token.symbol
                      ? "border-primary bg-primary/10"
                      : "border-border/50 hover:border-primary/50 hover:bg-secondary/50"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm bg-gradient-to-br from-primary/30 to-accent/30">
                    {token.icon}
                  </div>
                  <span className="font-medium text-sm">{token.symbol}</span>
                  {token.price && (
                    <span className="text-xs text-muted-foreground">
                      {formatPrice(token.price)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Token Count */}
        <div className="px-4 py-2 text-sm text-muted-foreground flex items-center justify-between">
          <span>{filteredTokens.length} tokens</span>
          {pricesLoading && (
            <span className="text-xs text-primary animate-pulse">Fetching live prices...</span>
          )}
        </div>

        {/* Token List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <div className="px-2 space-y-1">
            {filteredTokens.map((token) => (
              <button
                key={`${token.symbol}-${token.name}`}
                onClick={() => handleSelect(token)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                  selectedToken?.symbol === token.symbol
                    ? "bg-primary/10"
                    : "hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gradient-to-br from-primary/20 to-accent/20">
                    {token.icon}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{token.symbol}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        token.category === "stablecoin" ? "bg-primary/20 text-primary" :
                        token.category === "meme" ? "bg-yellow-500/20 text-yellow-400" :
                        token.category === "defi" ? "bg-blue-500/20 text-blue-400" :
                        token.category === "ai" ? "bg-purple-500/20 text-purple-400" :
                        token.category === "layer2" ? "bg-cyan-500/20 text-cyan-400" :
                        token.category === "gaming" ? "bg-pink-500/20 text-pink-400" :
                        "bg-secondary text-muted-foreground"
                      }`}>
                        {token.category}
                      </span>
                      <button
                        onClick={(e) => toggleFavorite(token.symbol, e)}
                        className="opacity-50 hover:opacity-100 transition-opacity"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            favorites.includes(token.symbol)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    </div>
                    <span className="text-sm text-muted-foreground">{token.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  {token.price !== undefined && token.price > 0 ? (
                    <>
                      <div className="font-medium">
                        {formatPrice(token.price)}
                      </div>
                      <div className="flex items-center justify-end gap-1 text-sm">
                        {token.change24h !== undefined && (
                          <span
                            className={`flex items-center gap-0.5 ${
                              token.change24h >= 0 ? "text-foreground" : "text-red-400"
                            }`}
                          >
                            {token.change24h >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {formatChange(token.change24h)}
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Prices via CoinGecko API
            </span>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              Manage Token Lists
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
