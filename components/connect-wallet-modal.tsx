"use client";

import { useState } from "react";
import { X, QrCode, ArrowRight, Smartphone, Chrome, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string) => void;
}

const wallets = [
  {
    id: "multiswap",
    name: "MultiSwap Wallet",
    icon: "M",
    description: "iOS, Android & Chrome",
    recommended: true,
    color: "from-primary to-accent",
  },
  {
    id: "metamask",
    name: "MetaMask",
    icon: "🦊",
    description: "Popular browser wallet",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "W",
    description: "Connect mobile wallet",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "C",
    description: "Coinbase's self-custody wallet",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "T",
    description: "Mobile crypto wallet",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "P",
    description: "Multi-chain wallet",
    color: "from-purple-500 to-purple-700",
  },
];

export function ConnectWalletModal({ isOpen, onClose, onConnect }: ConnectWalletModalProps) {
  const [showQR, setShowQR] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleConnect = (walletId: string) => {
    setConnecting(walletId);
    // Simulate connection
    setTimeout(() => {
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6);
      onConnect(mockAddress);
      setConnecting(null);
      onClose();
    }, 1500);
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://multiswap.app/connect");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 neon-border animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showQR ? (
          <>
            {/* Recommended Wallet */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Recommended</p>
              <button
                onClick={() => handleConnect("multiswap")}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 hover:border-primary/50 transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow">
                  <span className="text-xl font-bold text-white">M</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">MultiSwap Wallet</p>
                  <p className="text-sm text-muted-foreground">iOS, Android & Chrome Extension</p>
                </div>
                {connecting === "multiswap" ? (
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-primary" />
                )}
              </button>
            </div>

            {/* QR Code Option */}
            <button
              onClick={() => setShowQR(true)}
              className="w-full p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold">Scan QR Code</p>
                <p className="text-sm text-muted-foreground">Connect with mobile wallet</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Other Wallets */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Other wallets</p>
              <div className="grid grid-cols-2 gap-2">
                {wallets.slice(1).map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleConnect(wallet.id)}
                    className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${wallet.color} flex items-center justify-center`}>
                      <span className="text-sm font-bold text-white">{wallet.icon}</span>
                    </div>
                    <span className="text-sm font-medium">{wallet.name}</span>
                    {connecting === wallet.id && (
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center">
              By connecting a wallet, you agree to MultiSwap{"'"}s{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </>
        ) : (
          <>
            {/* QR Code View */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto bg-white rounded-2xl p-4 mb-4">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-foreground" />
                </div>
              </div>
              <p className="font-medium mb-2">Scan with your mobile wallet</p>
              <p className="text-sm text-muted-foreground mb-4">
                Open your wallet app and scan this QR code to connect
              </p>

              {/* Download Options */}
              <div className="flex justify-center gap-4 mb-4">
                <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-sm">iOS</span>
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
                  <Smartphone className="w-4 h-4" />
                  <span className="text-sm">Android</span>
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
                  <Chrome className="w-4 h-4" />
                  <span className="text-sm">Chrome</span>
                </a>
              </div>

              {/* Copy Link */}
              <button
                onClick={copyLink}
                className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm">{copied ? "Copied!" : "Copy connection link"}</span>
              </button>

              <Button
                onClick={() => setShowQR(false)}
                variant="outline"
                className="mt-4"
              >
                Back to wallets
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
