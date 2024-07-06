import { cn } from "@/lib/utils";
import React from "react";
import { Badge } from "./ui/badge";
import { ButtonProps } from "./ui/button";

interface BadgeProps {
  category: string;
  index: number;
}

const typeColors: Record<number, ButtonProps["className"]> = {
  0: "bg-[#902e26] hover:bg-[#202e26] border border-[#6b7d07] text-[#feffb5]",
  1: "bg-[#923655] hover:bg-[#223655] border border-[#3C506E] text-[#d2e5ff]",
  2: "bg-[#223655] hover:bg-[#223655] border border-[#3C506E] text-[#d2e5ff]",
  3: "bg-[#202e26] hover:bg-[#202e26] border border-[#2E4C3C] text-[#82f4bb]",
  4: "bg-[#383838] hover:bg-[#383838] border border-[#5E5E5E] text-white",
};

const CategoryBadge: React.FC<BadgeProps> = ({ index, category }) => {
  const colorClass = typeColors[index] || "bg-gray-500 text-white";

  return (
    <Badge className={cn(colorClass, "rounded px-2 py-1 font-normal")}>
      {category.toUpperCase()}
    </Badge>
  );
};

export default CategoryBadge;
