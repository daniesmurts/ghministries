import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function SectionContainer({
  children,
  className,
  as: Component = "div",
}: SectionContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </Component>
  )
}
