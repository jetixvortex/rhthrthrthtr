"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is MultiSwap?",
    answer: "MultiSwap is a decentralized exchange aggregator that finds you the best rates across 50+ DEXs. We route your trades through multiple liquidity sources to minimize slippage and maximize your returns.",
  },
  {
    question: "Is MultiSwap safe to use?",
    answer: "Yes, MultiSwap is non-custodial which means we never hold your funds. All trades are executed directly from your wallet through audited smart contracts. Your private keys always remain with you.",
  },
  {
    question: "What wallets are supported?",
    answer: "We support all major Web3 wallets including MetaMask, WalletConnect, Coinbase Wallet, Trust Wallet, Ledger, and more. Any wallet that supports WalletConnect can be used with MultiSwap.",
  },
  {
    question: "What are the fees?",
    answer: "MultiSwap charges a 0.1% service fee on swaps. This is significantly lower than most centralized exchanges. Network gas fees are separate and depend on blockchain congestion.",
  },
  {
    question: "Which networks are supported?",
    answer: "We support Ethereum, Arbitrum, Optimism, Polygon, Base, BNB Chain, Avalanche, zkSync, and many more. We're constantly adding new networks based on user demand.",
  },
  {
    question: "How do I get started?",
    answer: "Simply connect your wallet using the 'Connect' button, select the tokens you want to swap, enter the amount, and confirm the transaction. No registration or KYC required.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Got questions? We have answers.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="glass-card rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors cursor-pointer"
            >
              <span className="font-medium pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="px-5 pb-5 text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
