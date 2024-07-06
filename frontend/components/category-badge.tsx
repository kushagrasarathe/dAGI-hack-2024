import { cn } from "@/lib/utils";
import React from "react";
import { Badge } from "./ui/badge";
import { ButtonProps } from "./ui/button";

interface BadgeProps {
  category: string;
  index: number;
}

const typeColors: Record<number, ButtonProps["className"]> = {
  0: "bg-[#FFC7C7] hover:bg-[#FFB3B3] border border-[#FF9999] text-[#A63232]",
  1: "bg-[#E6E6E6] hover:bg-[#D9D9D9] border border-[#CCCCCC] text-[#4D4D4D]",
  2: "bg-[#C7D6FF] hover:bg-[#B3C2FF] border border-[#99AEFF] text-[#3349A6]",
  3: "bg-[#C7FFD6] hover:bg-[#B3FFD1] border border-[#99FFC4] text-[#32A653]",
  4: "bg-[#C7D6FF] hover:bg-[#B3C2FF] border border-[#99AEFF] text-[#3349A6]",
};

const CategoryBadge: React.FC<BadgeProps> = ({ index, category }) => {
  const colorClass = typeColors[index] || "bg-gray-400 text-white";

  return (
    <Badge className={cn(colorClass, "rounded px-2 py-1 font-normal")}>
      {category.toUpperCase()}
    </Badge>
  );
};

export default CategoryBadge;
