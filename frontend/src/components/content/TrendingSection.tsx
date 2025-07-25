"use client";

import { Card } from "../ui/Card";
import { TrendingItem } from "./TrendingItem";

const trendingData = [
  { category: "Technology", title: "Machine Learning", count: "15.2K" },
  { category: "Science", title: "Quantum Physics", count: "8.7K" },
  { category: "Programming", title: "React Development", count: "12.1K" },
  { category: "Mathematics", title: "Calculus", count: "6.3K" },
  { category: "Business", title: "Digital Marketing", count: "9.8K" },
];

interface TrendingSectionProps {
  onShowMore?: () => void;
}

export const TrendingSection = ({ onShowMore }: TrendingSectionProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">What's happening</h3>
      <div className="space-y-3">
        {trendingData.map((item) => (
          <TrendingItem
            key={item.title}
            category={item.category}
            title={item.title}
            count={item.count}
          />
        ))}
      </div>
      <button 
        onClick={onShowMore}
        className="text-primary hover:underline text-sm mt-3 transition-colors duration-200"
      >
        Show more
      </button>
    </Card>
  );
};