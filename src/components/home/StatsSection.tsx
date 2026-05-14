"use client"
import * as React from "react"
import { useInView } from "framer-motion"
import { AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { useTranslations } from "next-intl"

function Counter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const [count, setCount] = React.useState(from)
  const nodeRef = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true, margin: "-50px" })

  React.useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      
      const easeProgress = progress >= duration * 1000 ? 1 : 1 - Math.pow(2, -10 * progress / (duration * 1000))
      
      if (progress < duration * 1000) {
        setCount(Math.floor(from + (to - from) * easeProgress))
        animationFrame = requestAnimationFrame(updateCount)
      } else {
        setCount(to)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration, inView])

  return <span ref={nodeRef}>{count}</span>
}

export function StatsSection() {
  const t = useTranslations('StatsSection')
  
  const stats = [
    { label: t('years'), value: 15, suffix: "+" },
    { label: t('locations'), value: 42, suffix: "" },
    { label: t('nations'), value: 28, suffix: "" },
    { label: t('gatherings'), value: 120, suffix: "+" },
  ]

  return (
    <section className="w-full bg-surface-subtle py-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <AnimatedStaggerGroup className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStaggerItem key={index} className="flex flex-col items-center text-center space-y-2">
              <div className="font-display text-5xl md:text-6xl font-bold text-accent-purple">
                <Counter to={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-sm md:text-base font-medium text-text-secondary uppercase tracking-widest">
                {stat.label}
              </div>
            </AnimatedStaggerItem>
          ))}
        </AnimatedStaggerGroup>
      </div>
    </section>
  )
}
