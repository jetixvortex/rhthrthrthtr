"use client";

import { useState, useMemo } from "react";
import { X, Search, Check, Zap, Shield, Clock, Globe, FlaskConical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ALL_NETWORKS, getMainnets, getL2Networks, getTestnets, searchNetworks, type Network } from "@/lib/tokens";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NetworkSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNetwork: Network;
  onSelectNetwork: (network: Network) => void;
}

type NetworkFilter = "all" | "mainnet" | "l2" | "testnet";

export function NetworkSelectorModal({
  isOpen,
  onClose,
  selectedNetwork,
  onSelectNetwork,
}: NetworkSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<NetworkFilter>("all");

  const filteredNetworks = useMemo(() => {
    let networks: Network[];
    
    switch (filter) {
      case "mainnet":
        networks = getMainnets();
        break;
      case "l2":
        networks = getL2Networks();
        break;
      case "testnet":
        networks = getTestnets();
        break;
      default:
        networks = ALL_NETWORKS.filter(n => !n.isTestnet);
    }

    if (searchQuery) {
      networks = networks.filter(
        (n) =>
          n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return networks;
  }, [searchQuery, filter]);

  const popularNetworks = useMemo(() => 
    ALL_NETWORKS.filter(n => [1, 42161, 10, 137, 8453, 324].includes(n.id)),
    []
  );

  if (!isOpen) return null;

  const handleSelect = (network: Network) => {
    onSelectNetwork(network);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 neon-border animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Select Network</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search networks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-secondary/50 border-none rounded-xl"
          />
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as NetworkFilter)} className="mb-4">
          <TabsList className="bg-secondary/50 rounded-xl p-1 w-full">
            <TabsTrigger value="all" className="flex-1 rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-1">
              <Globe className="w-4 h-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="mainnet" className="flex-1 rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-1">
              <Zap className="w-4 h-4" />
              Mainnet
            </TabsTrigger>
            <TabsTrigger value="l2" className="flex-1 rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-1">
              <Shield className="w-4 h-4" />
              Layer 2
            </TabsTrigger>
            <TabsTrigger value="testnet" className="flex-1 rounded-lg data-[state=active]:bg-primary/20 data-[state=active]:text-primary gap-1">
              <FlaskConical className="w-4 h-4" />
              Testnet
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Popular Networks */}
        {!searchQuery && filter === "all" && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Popular Networks</p>
            <div className="flex flex-wrap gap-2">
              {popularNetworks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => handleSelect(network)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                    selectedNetwork.id === network.id
                      ? "border-primary bg-primary/10"
                      : "border-border/50 hover:border-primary/50 hover:bg-secondary/50"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${network.color} flex items-center justify-center`}>
                    <span className="text-xs font-bold text-white">{network.symbol[0]}</span>
                  </div>
                  <span className="text-sm font-medium">{network.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Network Info */}
        <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20">
          <Zap className="w-5 h-5 text-primary flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            {filter === "l2" 
              ? "Layer 2 networks offer lower fees and faster transactions"
              : filter === "testnet"
              ? "Testnets are free to use for development and testing"
              : "Select a network to switch your connection"}
          </p>
        </div>

        {/* Network Count */}
        <div className="text-sm text-muted-foreground mb-2">
          {filteredNetworks.length} networks
        </div>

        {/* Networks List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-2">
          {filteredNetworks.map((network) => (
            <button
              key={network.id}
              onClick={() => handleSelect(network)}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors ${
                selectedNetwork.id === network.id
                  ? "bg-primary/20 border border-primary/30"
                  : "bg-secondary/30 hover:bg-secondary/50"
              }`}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${network.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-sm font-bold text-white">{network.symbol[0]}</span>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-medium flex items-center gap-2 flex-wrap">
                  <span className="truncate">{network.name}</span>
                  {network.isL2 && (
                    <span className="px-1.5 py-0.5 rounded text-xs bg-primary/20 text-primary flex-shrink-0">L2</span>
                  )}
                  {network.isTestnet && (
                    <span className="px-1.5 py-0.5 rounded text-xs bg-yellow-500/20 text-yellow-400 flex-shrink-0">Testnet</span>
                  )}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {network.gasPrice}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {network.blockTime}
                  </span>
                  <span className="text-muted-foreground/60">
                    ID: {network.id}
                  </span>
                </div>
              </div>
              {selectedNetwork.id === network.id && (
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border/50 text-center">
          <a href="#" className="text-sm text-primary hover:underline">
            Don{"'"}t see your network? Request it here
          </a>
        </div>
      </div>
    </div>
  );
}
