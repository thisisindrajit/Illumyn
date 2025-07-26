"use client";

import Link from "next/link";
import { Card } from "../ui/Card";
import { cn } from "@/lib/utils";

interface BlockCardProps {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  isLoading?: boolean;
  className?: string;
}

export const BlockCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  isLoading = true, 
  className
}: BlockCardProps) => {
  if (isLoading) {
    return (
      <Card className={cn("overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1", className)}>
        <div className="w-full h-48 bg-muted animate-pulse"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-muted rounded animate-pulse"></div>
            <div className="h-3 bg-muted rounded animate-pulse"></div>
            <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Link href={`/block/${id}`}>
      <Card className={cn("overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] border-border hover:border-primary/30", className)}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <span className="text-4xl opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-300">📚</span>
          </div>
        )}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {title || "Learning Block"}
          </h3>
          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 line-clamp-3">
            {description || "Discover new concepts and expand your knowledge with this interactive learning experience."}
          </p>
        </div>
      </Card>
    </Link>
  );
};