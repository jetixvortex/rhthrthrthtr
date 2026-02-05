"use client";

import { useState } from "react";
import { X, Shield, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrivacyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto glass-card rounded-2xl p-4 md:p-6 neon-border">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                Privacy & Cookie Policy
                <Cookie className="w-4 h-4 text-muted-foreground" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze site traffic, and for security purposes. 
                By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a> and{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 md:flex-none border-border/50 hover:bg-secondary bg-transparent"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 md:flex-none bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Accept All
            </Button>
          </div>
          
          <button
            onClick={handleDecline}
            className="absolute top-3 right-3 md:hidden p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>256-bit SSL Encryption</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Audited Smart Contracts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
