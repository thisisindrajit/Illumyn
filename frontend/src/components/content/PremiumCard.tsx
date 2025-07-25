"use client";

import { Card } from "../ui/Card";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  onSubscribe?: () => void;
  className?: string;
}

export const PremiumCard = ({ onSubscribe, className }: PremiumCardProps) => {
  return (
    <Card className={cn("p-6", className)}>
      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Subscribe to Premium
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        Subscribe to unlock new features and if eligible, receive a share of revenue.
      </p>
      <button 
        onClick={onSubscribe}
        className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full py-2 px-4 font-medium transition-colors duration-200 hover:opacity-90"
      >
        Subscribe
      </button>
    </Card>
  );
};