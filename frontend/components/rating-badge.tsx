import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";
import { ButtonProps } from "./ui/button";

interface RatingBadgeProps {
  rating: string;
}

const ratingColors: Record<string, ButtonProps["className"]> = {
  "1": "bg-red-400 text-white",
  "2": "bg-orange-400 text-white",
  "3": "bg-yellow-400 text-white",
  "4": "bg-green-400 text-white",
  "5": "bg-blue-400 text-white",
};

const RatingBadge: React.FC<RatingBadgeProps> = ({ rating }) => {
  const ratingValue = parseFloat(rating.toString());
  const colorClass =
    ratingColors[ratingValue.toFixed(0)] || "bg-gray-400 text-white";

  return (
    <Badge
      className={cn(
        colorClass,
        "rounded px-2 py-1 font-normal flex items-center"
      )}
    >
      <StarIcon className="mr-1 size-4" />
      {rating}
    </Badge>
  );
};

export default RatingBadge;
