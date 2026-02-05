"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Search, TrendingUp, TrendingDown, Star, Filter, ArrowUpDown, ChevronDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ALL_TOKENS, type Token, getTokensByCategory } from "@/lib/tokens";
import { usePrices, formatPrice, formatChange } from "@/hooks/use-prices";

type SortBy = "volume" | "tvl" | "price" | "change" | "marketCap";
type SortOrder = "asc" | "desc";
type CategoryFilter = "all" | "native" | "stablecoin" | "defi" | "meme" | "layer2" | "ai" | "gaming" | "rwa";

const pools = [
  { id: 1, token0: "ETH", token1: "USDC", fee: 0.3, tvl: 450000000, volume24h: 125000000, apr: 12.5 },
  { id: 2, token0: "WBTC", token1: "ETH", fee: 0.3, tvl: 320000000, volume24h: 89000000, apr: 8.9 },
  { id: 3, token0: "USDC", token1: "USDT", fee: 0.01, tvl: 890000000, volume24h: 340000000, apr: 4.2 },
  { id: 4, token0: "ETH", token1: "DAI", fee: 0.3, tvl: 180000000, volume24h: 56000000, apr: 10.3 },
  { id: 5, token0: "ARB", token1: "ETH", fee: 0.3, tvl: 95000000, volume24h: 34000000, apr: 15.7 },
  { id: 6, token0: "OP", token1: "ETH", fee: 0.3, tvl: 78000000, volume24h: 28000000, apr: 14.2 },
  { id: 7, token0: "SOL", token1: "USDC", fee: 0.3, tvl: 230000000, volume24h: 89000000, apr: 18.3 },
  { id: 8, token0: "LINK", token1: "ETH", fee: 0.3, tvl: 120000000, volume24h: 45000000, apr: 11.2 },
  { id: 9, token0: "AAVE", token1: "ETH", fee: 0.3, tvl: 89000000, volume24h: 23000000, apr: 9.8 },
  { id: 10, token0: "UNI", token1: "ETH", fee: 0.3, tvl: 156000000, volume24h: 67000000, apr: 13.4 },
  { id: 11, token0: "PEPE", token1: "ETH", fee: 1, tvl: 45000000, volume24h: 120000000, apr: 45.6 },
  { id: 12, token0: "WIF", token1: "SOL", fee: 1, tvl: 34000000, volume24h: 89000000, apr: 52.3 },
];

function formatNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("tokens");
  const [sortBy, setSortBy] = useState<SortBy>("price");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [favorites, setFavorites] = useState<string[]>(["ETH", "BTC", "SOL", "ARB"]);
  const [showFilters, setShowFilters] = useState(false);

  const { prices, isLoading: pricesLoading, lastUpdate, refresh } = usePrices();

  // Merge real prices with token data
  const tokensWithRealPrices = useMemo(() => {
    return ALL_TOKENS.map(token => ({
      ...token,
      price: prices[token.symbol]?.usd || token.price || 0,
      change24h: prices[token.symbol]?.usd_24h_change ?? token.change24h ?? 0,
    }));
  }, [prices]);

  const filteredAndSortedTokens = useMemo(() => {
    let tokens = categoryFilter === "all" 
      ? tokensWithRealPrices 
      : tokensWithRealPrices.filter(t => t.category === categoryFilter);

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      tokens = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(lowerQuery) ||
          token.symbol.toLowerCase().includes(lowerQuery)
      );
    }

    tokens = [...tokens].sort((a, b) => {
      let aVal = 0, bVal = 0;
      switch (sortBy) {
        case "volume":
          aVal = a.volume24h || 0;
          bVal = b.volume24h || 0;
          break;
        case "tvl":
          aVal = a.tvl || 0;
          bVal = b.tvl || 0;
          break;
        case "price":
          aVal = a.price || 0;
          bVal = b.price || 0;
          break;
        case "change":
          aVal = a.change24h || 0;
          bVal = b.change24h || 0;
          break;
        case "marketCap":
          aVal = a.marketCap || 0;
          bVal = b.marketCap || 0;
          break;
      }
      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    });

    return tokens;
  }, [searchQuery, categoryFilter, sortBy, sortOrder, tokensWithRealPrices]);

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) =>
      prev.includes(symbol) ? prev.filter((f) => f !== symbol) : [...prev, symbol]
    );
  };

  const toggleSort = (newSortBy: SortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  const categoryLabels: Record<CategoryFilter, string> = {
    all: "All Tokens",
    native: "Native",
    stablecoin: "Stablecoins",
    defi: "DeFi",
    meme: "Meme",
    layer2: "Layer 2",
    ai: "AI",
    gaming: "Gaming",
    rwa: "RWA",
  };

  const lastUpdateTime = lastUpdate ? new Date(lastUpdate).toLocaleTimeString() : "";

  return (
    <div className="min-h-screen gradient-bg">
      <Header />

      <main className="pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="neon-text">Explore</span>{" "}
                <span className="text-foreground">DeFi</span>
              </h1>
              <p className="text-muted-foreground">
                Discover {ALL_TOKENS.length}+ tokens and pools across multiple chains
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {pricesLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                    Loading prices...
                  </span>
                ) : (
                  <span>Updated: {lastUpdateTime}</span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refresh()}
                disabled={pricesLoading}
                className="gap-2 bg-transparent"
              >
                <RefreshCw className={`w-4 h-4 ${pricesLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Live Prices Banner */}
          <div className="mb-6 p-4 glass-card rounded-2xl neon-border">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium">Live Prices</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {["BTC", "ETH", "SOL", "ARB"].map((symbol) => {
                  const price = prices[symbol]?.usd;
                  const change = prices[symbol]?.usd_24h_change;
                  return (
                    <div key={symbol} className="flex flex-col gap-1 p-2 rounded-xl bg-secondary/30">
                      <span className="text-muted-foreground text-xs">{symbol}</span>
                      <span className="font-medium">{price ? formatPrice(price) : "-"}</span>
                      {change !== undefined && (
                        <span className={`text-xs ${change >= 0 ? "text-foreground" : "text-red-400"}`}>
                          {formatChange(change)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search tokens by name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border rounded-xl"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={`h-12 rounded-xl gap-2 bg-transparent ${showFilters ? 'border-primary text-primary' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
              <Button variant="outline" className="h-12 rounded-xl gap-2 bg-transparent">
                <ArrowUpDown className="w-4 h-4" />
                <span className="hidden sm:inline">Sort</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="mb-6 p-4 glass-card rounded-2xl">
              <p className="text-sm text-muted-foreground mb-3">Filter by category</p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(categoryLabels) as CategoryFilter[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      categoryFilter === cat
                        ? "bg-primary text-primary-foreground neon-glow"
                        : "bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-card border border-border rounded-xl p-1">
              <TabsTrigger value="tokens" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                Tokens ({filteredAndSortedTokens.length})
              </TabsTrigger>
              <TabsTrigger value="pools" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                Pools ({pools.length})
              </TabsTrigger>
              <TabsTrigger value="transactions" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                Transactions
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Token List */}
          {activeTab === "tokens" && (
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-1">#</div>
                <div className="col-span-3 md:col-span-3">Token</div>
                <button 
                  className="col-span-2 text-right flex items-center justify-end gap-1 hover:text-foreground transition-colors"
                  onClick={() => toggleSort("price")}
                >
                  Price
                  {sortBy === "price" && <ChevronDown className={`w-3 h-3 ${sortOrder === "asc" ? "rotate-180" : ""}`} />}
                </button>
                <button 
                  className="col-span-2 text-right flex items-center justify-end gap-1 hover:text-foreground transition-colors"
                  onClick={() => toggleSort("change")}
                >
                  24h
                  {sortBy === "change" && <ChevronDown className={`w-3 h-3 ${sortOrder === "asc" ? "rotate-180" : ""}`} />}
                </button>
                <button 
                  className="hidden md:flex md:col-span-2 text-right items-center justify-end gap-1 hover:text-foreground transition-colors"
                  onClick={() => toggleSort("volume")}
                >
                  Volume
                  {sortBy === "volume" && <ChevronDown className={`w-3 h-3 ${sortOrder === "asc" ? "rotate-180" : ""}`} />}
                </button>
                <button 
                  className="hidden lg:flex lg:col-span-2 text-right items-center justify-end gap-1 hover:text-foreground transition-colors"
                  onClick={() => toggleSort("marketCap")}
                >
                  Market Cap
                  {sortBy === "marketCap" && <ChevronDown className={`w-3 h-3 ${sortOrder === "asc" ? "rotate-180" : ""}`} />}
                </button>
              </div>

              {/* Loading State */}
              {pricesLoading && (
                <div className="px-6 py-2 bg-primary/5 border-b border-border/50">
                  <p className="text-sm text-primary flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Fetching live prices...
                  </p>
                </div>
              )}

              {/* Token Rows */}
              {filteredAndSortedTokens.map((token, index) => (
                <div
                  key={`${token.symbol}-${token.name}`}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer items-center"
                >
                  <div className="col-span-1 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(token.symbol);
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          favorites.includes(token.symbol)
                            ? "fill-primary text-primary"
                            : ""
                        }`}
                      />
                    </button>
                    <span className="text-muted-foreground text-sm">{index + 1}</span>
                  </div>
                  <div className="col-span-3 md:col-span-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">{token.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{token.symbol}</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded hidden sm:inline ${
                          token.category === "stablecoin" ? "bg-primary/20 text-primary" :
                          token.category === "meme" ? "bg-yellow-500/20 text-yellow-400" :
                          token.category === "defi" ? "bg-blue-500/20 text-blue-400" :
                          token.category === "ai" ? "bg-purple-500/20 text-purple-400" :
                          token.category === "layer2" ? "bg-cyan-500/20 text-cyan-400" :
                          "bg-secondary text-muted-foreground"
                        }`}>
                          {token.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{token.name}</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-medium">
                    {token.price ? formatPrice(token.price) : "-"}
                  </div>
                  <div className="col-span-2 text-right">
                    {token.change24h !== undefined ? (
                      <span
                        className={`flex items-center justify-end gap-1 ${
                          token.change24h >= 0 ? "text-foreground" : "text-red-500"
                        }`}
                      >
                        {token.change24h >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {formatChange(token.change24h)}
                      </span>
                    ) : "-"}
                  </div>
                  <div className="hidden md:block md:col-span-2 text-right text-muted-foreground">
                    {token.volume24h ? formatNumber(token.volume24h) : "-"}
                  </div>
                  <div className="hidden lg:block lg:col-span-2 text-right text-muted-foreground">
                    {token.marketCap ? formatNumber(token.marketCap) : "-"}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pools List */}
          {activeTab === "pools" && (
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-1">#</div>
                <div className="col-span-4 md:col-span-3">Pool</div>
                <div className="col-span-2 text-right">Fee Tier</div>
                <div className="col-span-2 text-right">TVL</div>
                <div className="hidden md:block md:col-span-2 text-right">Volume (24h)</div>
                <div className="col-span-2 text-right">APR</div>
              </div>

              {/* Pool Rows */}
              {pools.map((pool, index) => (
                <div
                  key={pool.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer items-center"
                >
                  <div className="col-span-1 text-muted-foreground">{index + 1}</div>
                  <div className="col-span-4 md:col-span-3 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{pool.token0[0]}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{pool.token1[0]}</span>
                      </div>
                    </div>
                    <span className="font-medium">
                      {pool.token0}/{pool.token1}
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="px-2 py-1 rounded-lg bg-secondary text-sm">
                      {pool.fee}%
                    </span>
                  </div>
                  <div className="col-span-2 text-right font-medium">
                    {formatNumber(pool.tvl)}
                  </div>
                  <div className="hidden md:block md:col-span-2 text-right text-muted-foreground">
                    {formatNumber(pool.volume24h)}
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-primary font-medium">{pool.apr}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Transactions */}
          {activeTab === "transactions" && (
            <div className="glass-card rounded-2xl p-8 text-center">
              <p className="text-muted-foreground">Connect wallet to view transactions</p>
              <Button className="mt-4 bg-gradient-to-r from-primary to-accent text-primary-foreground neon-glow">
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
