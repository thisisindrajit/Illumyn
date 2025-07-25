"use client";

import { cn } from "@/lib/utils";

interface PreferenceSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}

export const PreferenceSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  className 
}: PreferenceSelectProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label className="text-muted-foreground whitespace-nowrap">{label}:</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border border-border rounded px-2 py-1 text-xs transition-colors duration-200 hover:border-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};