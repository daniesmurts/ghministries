import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2",
  {
    variants: {
      variant: {
        purple:
          "border-transparent bg-accent-purple-10 text-accent-purple",
        orange:
          "border-transparent bg-accent-orange-10 text-accent-orange",
        neutral:
          "border-transparent bg-surface-subtle text-text-secondary",
        success:
          "border-transparent bg-success/10 text-success",
        error:
          "border-transparent bg-error/10 text-error",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
