import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  glass = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900",
        glass && "bg-white/70 backdrop-blur-md dark:bg-slate-900/70 border-white/40 dark:border-slate-800/80",
        hoverEffect &&
          "transition-all duration-300 hover:shadow-xl hover:shadow-agri-900/5 hover:-translate-y-1 hover:border-agri-300 dark:hover:border-agri-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
