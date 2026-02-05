"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "CryptoVanguard",
    handle: "@crypto_vanguard",
    avatar: "CV",
    content:
      "MultiSwap has the best rates I've found anywhere. I've saved over $2,000 in fees this month alone. The UI is incredible too!",
    rating: 5,
  },
  {
    name: "markus_99",
    handle: "@markus_99",
    avatar: "M",
    content:
      "Finally a DEX that actually works seamlessly across chains. No more bridging headaches. Just fast, cheap swaps every time.",
    rating: 5,
  },
  {
    name: "WhaleHunter",
    handle: "@whale_hunter_x",
    avatar: "WH",
    content:
      "The aggregation is insane. I compared prices manually and MultiSwap consistently beats the competition by 0.5-2%.",
    rating: 5,
  },
  {
    name: "jake_ventures",
    handle: "@jake_v",
    avatar: "J",
    content:
      "Been using MultiSwap for 6 months. Zero issues, great support, and the fastest execution I've experienced in DeFi.",
    rating: 5,
  },
  {
    name: "DeFiMaxi",
    handle: "@defi_maxi_eth",
    avatar: "DM",
    content:
      "The MEV protection alone is worth it. No more sandwich attacks eating into my trades. This is how DeFi should be.",
    rating: 5,
  },
  {
    name: "tommy_2024",
    handle: "@tommy2024",
    avatar: "T",
    content:
      "Switched from other DEXs to MultiSwap and never looked back. Better rates, better UX, and the interface is gorgeous!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto mt-20 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Loved by Traders
          </span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Join thousands of traders who trust MultiSwap for their DeFi needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl p-6 hover:neon-border transition-all duration-300 group"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold text-primary-foreground">
                {testimonial.avatar}
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <span className="text-sm text-muted-foreground">
                  {testimonial.handle}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-primary text-primary"
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-foreground/90 leading-relaxed">
              {testimonial.content}
            </p>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm">Audited by CertiK</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-sm">Non-custodial</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm">MEV Protected</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">$5B+ Volume</span>
        </div>
      </div>
    </section>
  );
}
