"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  className?: string;
  variant?: "sidebar" | "mobile";
}

export const NavigationItem = ({ 
  href, 
  icon, 
  label, 
  isActive = false, 
  className,
  variant = "sidebar" 
}: NavigationItemProps) => {
  const baseClasses = "transition-colors duration-200";
  
  const variantClasses = {
    sidebar: "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 font-medium",
    mobile: "flex flex-col items-center gap-1 p-2 hover:bg-primary/10 rounded-lg"
  };

  const activeClasses = isActive ? "bg-primary/10 text-primary" : "";

  return (
    <Link 
      href={href} 
      className={cn(baseClasses, variantClasses[variant], activeClasses, className)}
    >
      <div className={cn("transition-colors duration-200", variant === "mobile" && "w-5 h-5")}>
        {icon}
      </div>
      <span className={cn(
        "transition-colors duration-200",
        variant === "mobile" ? "text-xs" : "font-medium"
      )}>
        {label}
      </span>
    </Link>
  );
};