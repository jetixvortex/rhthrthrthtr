"use client";

import { Shield, Lock, FileCheck, Eye } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Audited by CertiK",
    description: "Smart contracts verified and audited",
  },
  {
    icon: Lock,
    title: "Non-Custodial",
    description: "You always control your funds",
  },
  {
    icon: FileCheck,
    title: "Open Source",
    description: "Transparent and verifiable code",
  },
  {
    icon: Eye,
    title: "MEV Protected",
    description: "Protection against sandwich attacks",
  },
];

export function SecurityBadges() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Security First</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your security is our top priority. Trade with confidence.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {securityFeatures.map((feature) => (
          <div
            key={feature.title}
            className="glass-card rounded-2xl p-6 text-center hover:neon-border transition-all duration-300 cursor-pointer"
            onClick={() => { /* TODO: Show security details */ }}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/20 flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center items-center gap-8">
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
          <span className="text-sm">SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="text-sm">GDPR Compliant</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
          <span className="text-sm">24/7 Monitoring</span>
        </div>
      </div>
    </section>
  );
}
