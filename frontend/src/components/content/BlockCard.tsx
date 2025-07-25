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
      <Card className={cn("overflow-hidden", className)}>
        <div className="w-full h-48 bg-neutral-200 animate-pulse"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
          <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse"></div>
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-neutral-200 rounded animate-pulse"></div>
            <div className="h-3 bg-neutral-200 rounded animate-pulse"></div>
            <div className="h-3 bg-neutral-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Link href={`/block/${id}`}>
      <Card className={cn("overflow-hidden group cursor-pointer", className)}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <span className="text-4xl opacity-50">📚</span>
          </div>
        )}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {title || "Learning Block"}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description || "Discover new concepts and expand your knowledge with this interactive learning experience."}
          </p>
        </div>
      </Card>
    </Link>
  );
};