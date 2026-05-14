import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  subtext?: React.ReactNode;
  align?: "center" | "left";
}

export function SectionHeader({
  eyebrow,
  heading,
  subtext,
  align = "center",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-4",
        align === "center" ? "text-center items-center" : "text-left items-start",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
        {heading}
      </h2>
      {subtext && (
        <p className="max-w-2xl text-lg text-text-secondary">
          {subtext}
        </p>
      )}
    </div>
  )
}
