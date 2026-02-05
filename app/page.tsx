'use client';

import { Header } from "@/components/header";
import { SwapCard } from "@/components/swap-card";
import { StatsSection } from "@/components/stats-section";
import { TrendingTokens } from "@/components/trending-tokens";
import { Testimonials } from "@/components/testimonials";
import { PrivacyBanner } from "@/components/privacy-banner";
import { HowItWorks } from "@/components/how-it-works";
import { SecurityBadges } from "@/components/security-badges";
import { FAQ } from "@/components/faq";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      {/* Main Content */}
      <main className="pt-28 pb-16 px-4">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="neon-text">Trade</span>{" "}
            <span className="text-foreground">Across</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Multiple Chains
            </span>
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            The most powerful DEX aggregator. Get the best rates across 15+ chains
            with zero protocol fees.
          </p>
        </div>

        {/* Swap Card */}
        <SwapCard />

        {/* Trending Tokens */}
        <TrendingTokens />

        {/* Stats Section */}
        <StatsSection />

        {/* Features Section */}
        <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 hover:neon-border transition-all">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Execute trades in seconds with our optimized smart routing algorithm.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:neon-border transition-all">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fully Secure</h3>
            <p className="text-sm text-muted-foreground">
              Non-custodial trading with audited smart contracts and MEV protection.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:neon-border transition-all">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Best Rates</h3>
            <p className="text-sm text-muted-foreground">
              Aggregate liquidity from 50+ DEXs to ensure you always get the best price.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto mt-16">
          <HowItWorks />
        </div>

        {/* Get Started CTA */}
        <div className="max-w-md mx-auto mt-12 text-center">
          <button
            onClick={() => { /* TODO: Scroll to swap or open wallet */ }}
            className="w-full h-14 rounded-2xl text-lg font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground neon-glow hover:opacity-90 transition-all cursor-pointer active:scale-[0.98]"
          >
            Get Started
          </button>
        </div>

        {/* Security Badges */}
        <div className="max-w-4xl mx-auto">
          <SecurityBadges />
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <div className="max-w-4xl mx-auto">
          <FAQ />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden neon-glow">
              <Image
                src="/logo.jpg"
                alt="MultiSwap Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-semibold neon-text">MultiSwap</span>
          </div>
          <p className="text-sm text-muted-foreground">
            2026 MultiSwap. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Privacy Banner */}
      <PrivacyBanner />
    </div>
  );
}
