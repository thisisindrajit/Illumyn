"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children: ReactNode;
  className?: string;
  position?: "left" | "right";
}

export const Sidebar = ({ children, className, position = "left" }: SidebarProps) => {
  const baseClasses = "sticky top-4 max-h-[calc(100vh-8rem)] overflow-y-auto p-4 space-y-6";
  const positionClasses = {
    left: "hidden md:flex w-72 border-r border-border space-y-2",
    right: "hidden xl:block w-80"
  };

  return (
    <div className={cn(baseClasses, positionClasses[position], className)}>
      {children}
    </div>
  );
};