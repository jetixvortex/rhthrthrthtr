"use client";

import { Wallet, ArrowRightLeft, CheckCircle2, Zap } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    description: "Connect your Web3 wallet securely. We support MetaMask, WalletConnect, Coinbase and more.",
  },
  {
    icon: ArrowRightLeft,
    title: "Select Tokens",
    description: "Choose which tokens you want to swap. We aggregate liquidity from 50+ DEXs for best rates.",
  },
  {
    icon: Zap,
    title: "Confirm Swap",
    description: "Review the transaction details and confirm. Your swap executes in seconds.",
  },
  {
    icon: CheckCircle2,
    title: "Receive Tokens",
    description: "Tokens arrive directly in your wallet. No registration, no KYC, fully decentralized.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Swap tokens in just a few simple steps. No account needed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative glass-card rounded-2xl p-6 text-center hover:neon-border transition-all duration-300"
          >
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
              {index + 1}
            </div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <step.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
