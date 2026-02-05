"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Plus, Info, ArrowRight, Search, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ALL_TOKENS } from "@/lib/tokens";

// Generate pool combinations from tokens
const generatePools = () => {
  const pools = [
    // Major pairs
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
    // Meme pairs
    { id: 11, token0: "PEPE", token1: "ETH", fee: 1, tvl: 45000000, volume24h: 120000000, apr: 45.6 },
    { id: 12, token0: "DOGE", token1: "USDC", fee: 0.3, tvl: 67000000, volume24h: 89000000, apr: 23.4 },
    { id: 13, token0: "SHIB", token1: "ETH", fee: 1, tvl: 34000000, volume24h: 56000000, apr: 38.9 },
    { id: 14, token0: "WIF", token1: "SOL", fee: 1, tvl: 23000000, volume24h: 67000000, apr: 52.3 },
    { id: 15, token0: "BONK", token1: "SOL", fee: 1, tvl: 18000000, volume24h: 45000000, apr: 48.7 },
    { id: 16, token0: "FLOKI", token1: "ETH", fee: 1, tvl: 12000000, volume24h: 23000000, apr: 35.2 },
    // DeFi pairs
    { id: 17, token0: "CRV", token1: "ETH", fee: 0.3, tvl: 67000000, volume24h: 23000000, apr: 18.9 },
    { id: 18, token0: "MKR", token1: "ETH", fee: 0.3, tvl: 89000000, volume24h: 12000000, apr: 7.8 },
    { id: 19, token0: "SNX", token1: "ETH", fee: 0.3, tvl: 45000000, volume24h: 18000000, apr: 21.3 },
    { id: 20, token0: "COMP", token1: "ETH", fee: 0.3, tvl: 34000000, volume24h: 8900000, apr: 12.4 },
    { id: 21, token0: "LDO", token1: "ETH", fee: 0.3, tvl: 120000000, volume24h: 45000000, apr: 15.6 },
    { id: 22, token0: "RPL", token1: "ETH", fee: 0.3, tvl: 56000000, volume24h: 12000000, apr: 11.2 },
    { id: 23, token0: "GMX", token1: "ETH", fee: 0.3, tvl: 78000000, volume24h: 23000000, apr: 19.8 },
    { id: 24, token0: "PENDLE", token1: "ETH", fee: 0.3, tvl: 89000000, volume24h: 34000000, apr: 25.6 },
    // AI pairs
    { id: 25, token0: "FET", token1: "ETH", fee: 0.3, tvl: 45000000, volume24h: 23000000, apr: 22.3 },
    { id: 26, token0: "RENDER", token1: "ETH", fee: 0.3, tvl: 67000000, volume24h: 34000000, apr: 18.7 },
    { id: 27, token0: "TAO", token1: "ETH", fee: 0.3, tvl: 34000000, volume24h: 18000000, apr: 28.9 },
    { id: 28, token0: "WLD", token1: "ETH", fee: 0.3, tvl: 56000000, volume24h: 23000000, apr: 16.4 },
    // L2 pairs
    { id: 29, token0: "MATIC", token1: "ETH", fee: 0.3, tvl: 234000000, volume24h: 78000000, apr: 11.8 },
    { id: 30, token0: "IMX", token1: "ETH", fee: 0.3, tvl: 45000000, volume24h: 12000000, apr: 14.5 },
    { id: 31, token0: "STRK", token1: "ETH", fee: 0.3, tvl: 34000000, volume24h: 18000000, apr: 24.3 },
    { id: 32, token0: "ZK", token1: "ETH", fee: 0.3, tvl: 23000000, volume24h: 12000000, apr: 19.7 },
    // Stablecoin pairs
    { id: 33, token0: "DAI", token1: "USDC", fee: 0.01, tvl: 450000000, volume24h: 120000000, apr: 3.8 },
    { id: 34, token0: "FRAX", token1: "USDC", fee: 0.01, tvl: 120000000, volume24h: 45000000, apr: 4.5 },
    { id: 35, token0: "LUSD", token1: "USDC", fee: 0.01, tvl: 78000000, volume24h: 23000000, apr: 5.2 },
    { id: 36, token0: "GHO", token1: "USDC", fee: 0.01, tvl: 45000000, volume24h: 12000000, apr: 6.1 },
    { id: 37, token0: "USDe", token1: "USDC", fee: 0.01, tvl: 340000000, volume24h: 89000000, apr: 8.9 },
    // Gaming pairs
    { id: 38, token0: "AXS", token1: "ETH", fee: 0.3, tvl: 23000000, volume24h: 8900000, apr: 17.8 },
    { id: 39, token0: "SAND", token1: "ETH", fee: 0.3, tvl: 18000000, volume24h: 6700000, apr: 15.3 },
    { id: 40, token0: "MANA", token1: "ETH", fee: 0.3, tvl: 15000000, volume24h: 5600000, apr: 14.2 },
    { id: 41, token0: "GALA", token1: "ETH", fee: 0.3, tvl: 12000000, volume24h: 8900000, apr: 28.4 },
    { id: 42, token0: "BEAM", token1: "ETH", fee: 0.3, tvl: 8900000, volume24h: 4500000, apr: 32.1 },
    // Exotic pairs
    { id: 43, token0: "BNB", token1: "ETH", fee: 0.3, tvl: 120000000, volume24h: 45000000, apr: 9.8 },
    { id: 44, token0: "AVAX", token1: "ETH", fee: 0.3, tvl: 89000000, volume24h: 34000000, apr: 12.3 },
    { id: 45, token0: "ATOM", token1: "ETH", fee: 0.3, tvl: 45000000, volume24h: 18000000, apr: 14.7 },
    { id: 46, token0: "DOT", token1: "ETH", fee: 0.3, tvl: 34000000, volume24h: 12000000, apr: 11.5 },
    { id: 47, token0: "NEAR", token1: "ETH", fee: 0.3, tvl: 28000000, volume24h: 15000000, apr: 18.9 },
    { id: 48, token0: "SUI", token1: "USDC", fee: 0.3, tvl: 67000000, volume24h: 34000000, apr: 24.5 },
    { id: 49, token0: "APT", token1: "ETH", fee: 0.3, tvl: 45000000, volume24h: 23000000, apr: 19.2 },
    { id: 50, token0: "SEI", token1: "ETH", fee: 0.3, tvl: 23000000, volume24h: 18000000, apr: 32.8 },
  ];
  return pools;
};

const allPools = generatePools();

const positions = [
  {
    id: 1,
    token0: { symbol: "ETH", name: "Ethereum" },
    token1: { symbol: "USDC", name: "USD Coin" },
    fee: 0.3,
    liquidity: 12500,
    minPrice: 2800,
    maxPrice: 3600,
    currentPrice: 3245.67,
    inRange: true,
    uncollectedFees: { token0: 0.045, token1: 145.23 },
  },
  {
    id: 2,
    token0: { symbol: "WBTC", name: "Wrapped Bitcoin" },
    token1: { symbol: "ETH", name: "Ethereum" },
    fee: 0.3,
    liquidity: 8900,
    minPrice: 28,
    maxPrice: 32,
    currentPrice: 29.95,
    inRange: true,
    uncollectedFees: { token0: 0.0012, token1: 0.034 },
  },
  {
    id: 3,
    token0: { symbol: "ARB", name: "Arbitrum" },
    token1: { symbol: "ETH", name: "Ethereum" },
    fee: 0.3,
    liquidity: 4500,
    minPrice: 0.0003,
    maxPrice: 0.0005,
    currentPrice: 0.00038,
    inRange: true,
    uncollectedFees: { token0: 23.45, token1: 0.008 },
  },
];

function formatNumber(num: number): string {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

type PoolCategory = "all" | "stable" | "volatile" | "meme" | "defi" | "ai" | "gaming";

export default function PoolPage() {
  const [activeTab, setActiveTab] = useState("positions");
  const [isConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<PoolCategory>("all");
  const [sortBy, setSortBy] = useState<"tvl" | "apr" | "volume">("tvl");

  const filteredPools = useMemo(() => {
    let pools = allPools;

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      pools = pools.filter(
        (p) =>
          p.token0.toLowerCase().includes(query) ||
          p.token1.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (category !== "all") {
      const categoryTokens: Record<PoolCategory, string[]> = {
        all: [],
        stable: ["USDC", "USDT", "DAI", "FRAX", "LUSD", "GHO", "USDe", "TUSD", "BUSD"],
        volatile: ["ETH", "BTC", "WBTC", "WETH", "SOL", "BNB", "AVAX"],
        meme: ["PEPE", "DOGE", "SHIB", "WIF", "BONK", "FLOKI", "MEME", "BRETT"],
        defi: ["UNI", "AAVE", "LINK", "MKR", "SNX", "CRV", "COMP", "LDO", "GMX", "PENDLE", "RPL"],
        ai: ["FET", "RENDER", "TAO", "WLD", "OCEAN", "AKT", "AR", "ARKM"],
        gaming: ["AXS", "SAND", "MANA", "GALA", "BEAM", "ILV", "PRIME", "YGG"],
      };
      pools = pools.filter(
        (p) =>
          categoryTokens[category].includes(p.token0) ||
          categoryTokens[category].includes(p.token1)
      );
    }

    // Sort
    pools = [...pools].sort((a, b) => {
      switch (sortBy) {
        case "apr":
          return b.apr - a.apr;
        case "volume":
          return b.volume24h - a.volume24h;
        default:
          return b.tvl - a.tvl;
      }
    });

    return pools;
  }, [searchQuery, category, sortBy]);

  const getTokenIcon = (symbol: string) => {
    const token = ALL_TOKENS.find((t) => t.symbol === symbol);
    return token?.icon || symbol[0];
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />

      <main className="pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="neon-text">Liquidity</span>{" "}
                <span className="text-foreground">Pools</span>
              </h1>
              <p className="text-muted-foreground">
                Provide liquidity to {allPools.length}+ pools and earn fees from every swap
              </p>
            </div>
            <Button 
              onClick={() => { console.log("[v0] New Position clicked"); }}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground neon-glow gap-2 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Position
            </Button>
          </div>

          {/* Info Banner */}
          <div className="glass-card rounded-2xl p-4 mb-6 flex items-start gap-3 border border-primary/30">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">
                Liquidity providers earn a fee on all trades proportional to their share of the pool.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-card border border-border rounded-xl p-1">
              <TabsTrigger value="positions" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                Your Positions
              </TabsTrigger>
              <TabsTrigger value="featured" className="rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                All Pools ({filteredPools.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Positions Tab */}
          {activeTab === "positions" && (
            <>
              {!isConnected ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Your positions will appear here</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect your wallet to view your liquidity positions
                  </p>
                  <Button 
                    onClick={() => { console.log("[v0] Connect Wallet clicked"); }}
                    className="bg-gradient-to-r from-primary to-accent text-primary-foreground neon-glow cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                  >
                    Connect Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {positions.map((position) => (
                    <div
                      key={position.id}
                      className="glass-card rounded-2xl p-6 hover:neon-border transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-background flex items-center justify-center">
                              <span className="text-sm font-bold text-white">{getTokenIcon(position.token0.symbol)}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center">
                              <span className="text-sm font-bold text-white">{getTokenIcon(position.token1.symbol)}</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-lg">
                              {position.token0.symbol}/{position.token1.symbol}
                            </p>
                            <span className="text-sm text-muted-foreground">
                              {position.fee}% fee tier
                            </span>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            position.inRange
                              ? "bg-primary/20 text-primary"
                              : "bg-yellow-500/20 text-yellow-500"
                          }`}
                        >
                          {position.inRange ? "In Range" : "Out of Range"}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Liquidity</p>
                          <p className="font-semibold">${position.liquidity.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Min Price</p>
                          <p className="font-semibold">${position.minPrice.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Max Price</p>
                          <p className="font-semibold">${position.maxPrice.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Uncollected Fees</p>
                          <p className="font-semibold text-foreground">
                            {position.uncollectedFees.token0} {position.token0.symbol} + {position.uncollectedFees.token1} {position.token1.symbol}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/50 flex gap-3">
                        <Button 
                          onClick={() => { console.log("[v0] Increase Liquidity clicked"); }}
                          variant="outline" 
                          className="flex-1 rounded-xl bg-transparent cursor-pointer hover:bg-primary/10 active:scale-95 transition-all"
                        >
                          Increase Liquidity
                        </Button>
                        <Button 
                          onClick={() => { console.log("[v0] Remove Liquidity clicked"); }}
                          variant="outline" 
                          className="flex-1 rounded-xl bg-transparent cursor-pointer hover:bg-primary/10 active:scale-95 transition-all"
                        >
                          Remove Liquidity
                        </Button>
                        <Button 
                          onClick={() => { console.log("[v0] Collect Fees clicked"); }}
                          className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                        >
                          Collect Fees
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Featured Pools Tab */}
          {activeTab === "featured" && (
            <>
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search pools by token..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-card border-border rounded-xl"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "tvl" | "apr" | "volume")}
                    className="h-12 px-4 rounded-xl bg-card border border-border text-foreground"
                  >
                    <option value="tvl">Sort by TVL</option>
                    <option value="apr">Sort by APR</option>
                    <option value="volume">Sort by Volume</option>
                  </select>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(["all", "stable", "volatile", "defi", "meme", "ai", "gaming"] as PoolCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                      category === cat
                        ? "bg-primary text-primary-foreground neon-glow"
                        : "bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat === "all" ? "All Pools" : cat}
                  </button>
                ))}
              </div>

              {/* Pools Grid */}
              <div className="space-y-3">
                {filteredPools.map((pool) => (
                  <div
                    key={pool.id}
                    className="glass-card rounded-2xl p-5 hover:neon-border transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-background flex items-center justify-center">
                            <span className="text-sm">{getTokenIcon(pool.token0)}</span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center">
                            <span className="text-sm">{getTokenIcon(pool.token1)}</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {pool.token0}/{pool.token1}
                          </p>
                          <span className="text-sm text-muted-foreground">
                            {pool.fee}% fee tier
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 md:gap-8">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm text-muted-foreground">TVL</p>
                          <p className="font-semibold">{formatNumber(pool.tvl)}</p>
                        </div>
                        <div className="text-right hidden md:block">
                          <p className="text-sm text-muted-foreground">Volume 24h</p>
                          <p className="font-semibold">{formatNumber(pool.volume24h)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">APR</p>
                          <p className="font-semibold text-primary flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {pool.apr}%
                          </p>
                        </div>
                        <Button 
                          onClick={(e) => { e.stopPropagation(); /* TODO: Add liquidity */ }}
                          className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl gap-2 hidden md:flex cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                        >
                          Add Liquidity
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button 
                          onClick={(e) => { e.stopPropagation(); /* TODO: Add liquidity */ }}
                          className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl md:hidden cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Create New Position Card */}
          <div className="mt-8 glass-card rounded-2xl p-8 text-center border border-dashed border-border">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create a new position</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Choose a token pair, select a fee tier, and set your price range to start earning fees
            </p>
            <Button 
              onClick={() => { /* TODO: Create new position */ }}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground neon-glow gap-2 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Position
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
