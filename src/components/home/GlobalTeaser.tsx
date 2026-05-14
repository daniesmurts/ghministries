"use client"
import * as React from "react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Button } from "@/components/ui/Button"
import { MapPin } from "lucide-react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function GlobalTeaser() {
  const t = useTranslations('GlobalTeaser')

  return (
    <section className="relative w-full bg-surface-dark py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 1000 500" className="w-full h-full object-cover">
          <circle cx="200" cy="150" r="2" fill="white" />
          <circle cx="300" cy="180" r="2" fill="white" />
          <circle cx="500" cy="120" r="3" fill="white" />
          <circle cx="600" cy="200" r="2" fill="white" />
          <circle cx="750" cy="300" r="2" fill="white" />
          <path d="M200 150 Q350 100 500 120 T750 300" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="mx-auto relative z-10 w-full max-w-7xl px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <AnimatedSection className="w-full md:w-1/2 text-center md:text-left text-white space-y-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight" dangerouslySetInnerHTML={{ __html: t('heading') }} />
          <p className="max-w-md text-lg text-text-tertiary mx-auto md:mx-0">
            {t('description')}
          </p>
          <div className="pt-4">
            <Button variant="primary" asChild>
              <Link href="/global">{t('seeAll')}</Link>
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection 
          delay={0.2}
          className="w-full md:w-1/2 flex justify-center md:justify-end relative"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-accent-purple/20 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]" />
            
            <div className="absolute top-1/3 right-1/3 flex flex-col items-center animate-pulse">
              <MapPin className="h-8 w-8 text-accent-orange" fill="currentColor" />
              <div className="mt-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                Moscow, RU
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
