"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Wallet, ChevronDown, Menu, X, Copy, ExternalLink, LogOut, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectWalletModal } from "@/components/connect-wallet-modal";
import { NetworkSelectorModal } from "@/components/network-selector-modal";

const navItems = [
  { label: "Swap", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Pool", href: "/pool" },
  { label: "Buy/Sell", href: "/buy" },
];

const defaultNetwork = {
  id: 1,
  name: "Ethereum",
  symbol: "ETH",
  color: "from-blue-400 to-purple-500",
  gasPrice: "~$2.50",
  blockTime: "12s",
  isL2: false,
};

export function Header() {
  const pathname = usePathname();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(defaultNetwork);
  const [copied, setCopied] = useState(false);

  const handleConnect = (address: string) => {
    setWalletAddress(address);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    setShowAccountMenu(false);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="glass-card rounded-2xl px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden neon-glow">
                <Image
                  src="/logo.jpg"
                  alt="MultiSwap Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-lg sm:text-xl font-bold neon-text">MultiSwap</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === item.href
                      ? "bg-primary/20 text-primary neon-text"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Network Selector - hidden on mobile */}
              <button
                onClick={() => setShowNetworkModal(true)}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${selectedNetwork.color}`} />
                <span className="text-sm font-medium">{selectedNetwork.name}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Connect/Account Button */}
              {isConnected ? (
                <div className="relative">
                  <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {walletAddress.slice(2, 4).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{walletAddress}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>

                  {/* Account Dropdown */}
                  {showAccountMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 glass-card rounded-2xl p-2 neon-border">
                      <div className="p-3 border-b border-border/50 mb-2">
                        <p className="text-sm text-muted-foreground">Connected with MultiSwap</p>
                        <p className="font-medium">{walletAddress}</p>
                      </div>
                      <button
                        onClick={copyAddress}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        <span className="text-sm">{copied ? "Copied!" : "Copy address"}</span>
                      </button>
                      <a
                        href="#"
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">View on Explorer</span>
                      </a>
                      <button
                        onClick={handleDisconnect}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-red-500"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Disconnect</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => { /* TODO: Add your connect wallet logic here */ }}
                  className="rounded-xl font-medium bg-gradient-to-r from-primary to-accent text-primary-foreground neon-glow hover:opacity-90 px-3 cursor-pointer active:scale-95 transition-all"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-2 glass-card rounded-2xl p-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === item.href
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobile Network Selector */}
              <button
                onClick={() => {
                  setShowNetworkModal(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${selectedNetwork.color}`} />
                <span>{selectedNetwork.name}</span>
                <ChevronDown className="w-4 h-4 ml-auto" />
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Modals */}
      <ConnectWalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleConnect}
      />
      <NetworkSelectorModal
        isOpen={showNetworkModal}
        onClose={() => setShowNetworkModal(false)}
        selectedNetwork={selectedNetwork}
        onSelectNetwork={setSelectedNetwork}
      />
    </>
  );
}
