"use client";

import { TrendingUp, Users, Wallet, Repeat } from "lucide-react";

const stats = [
  {
    label: "Total Volume",
    value: "$12.4B",
    change: "+12.5%",
    icon: TrendingUp,
  },
  {
    label: "Total Users",
    value: "2.1M",
    change: "+8.3%",
    icon: Users,
  },
  {
    label: "TVL",
    value: "$4.8B",
    change: "+5.2%",
    icon: Wallet,
  },
  {
    label: "Total Swaps",
    value: "156M",
    change: "+15.7%",
    icon: Repeat,
  },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card rounded-2xl p-4 text-center group hover:neon-border transition-all"
        >
          <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
            <stat.icon className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl md:text-3xl font-bold neon-text">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}
