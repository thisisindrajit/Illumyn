"use client";

import { cn } from "@/lib/utils";

interface TrendingItemProps {
  category: string;
  title: string;
  count: string;
  onClick?: () => void;
  className?: string;
}

export const TrendingItem = ({ 
  category, 
  title, 
  count, 
  onClick, 
  className
}: TrendingItemProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "hover:bg-primary/5 p-2 rounded cursor-pointer transition-colors duration-200",
        className
      )}
    >
      <p className="text-sm text-muted-foreground">{category} · Trending</p>
      <p className="font-semibold hover:text-primary transition-colors duration-200">{title}</p>
      <p className="text-sm text-muted-foreground">{count} blocks</p>
    </div>
  );
};