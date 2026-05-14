import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-surface-subtle text-text-primary hover:bg-surface-subtle/80",
        purple:
          "bg-accent-purple-10 text-accent-purple hover:bg-accent-purple-20",
        orange:
          "bg-accent-orange-10 text-accent-orange hover:bg-accent-orange-10/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

function Tag({ className, variant, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant }), className)} {...props} />
  )
}

export { Tag, tagVariants }
