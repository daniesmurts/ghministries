import * as React from "react"
import { cn } from "@/lib/utils"

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

export function Divider({ className, label, ...props }: DividerProps) {
  if (!label) {
    return (
      <hr
        className={cn("w-full border-t border-border", className)}
        {...props}
      />
    )
  }

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-surface-base px-2 text-text-tertiary tracking-widest">
          {label}
        </span>
      </div>
    </div>
  )
}
