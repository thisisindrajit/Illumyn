"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className, hover = true }: CardProps) => {
  const baseClasses = "bg-card border border-border rounded-xl shadow-sm";
  const hoverClasses = hover ? "hover:shadow-md transition-shadow duration-200" : "";

  return (
    <div className={cn(baseClasses, hoverClasses, className)}>
      {children}
    </div>
  );
};