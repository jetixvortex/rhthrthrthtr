"use client";

import { ChevronDown } from "lucide-react";
import type { Token } from "./token-select-modal";

interface TokenSelectorProps {
  token: Token;
  onClick: () => void;
}

export function TokenSelector({ token, onClick }: TokenSelectorProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-secondary/80 hover:bg-secondary border border-transparent hover:border-primary/30 transition-all group cursor-pointer active:scale-95 touch-manipulation min-w-[100px] shrink-0"
    >
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-lg bg-gradient-to-br from-primary/30 to-accent/30">
        {token.icon}
      </div>
      <span className="font-semibold text-foreground">{token.symbol}</span>
      <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
    </button>
  );
}
