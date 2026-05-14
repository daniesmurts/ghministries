"use client"
import * as React from "react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { useTranslations } from "next-intl"

export function WelcomeSection() {
  const t = useTranslations('WelcomeSection')
  return (
    <section className="relative w-full bg-white py-24 md:py-32 overflow-hidden">
      {/* Abstract geometric accent */}
      <div className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full border-[1px] border-accent-purple-20 opacity-50 hidden lg:block" />
      <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/4 rounded-full border-[1px] border-accent-purple-20 opacity-30 hidden lg:block" />

      <div className="mx-auto w-full max-w-5xl px-6 md:px-8 lg:px-12 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col space-y-6">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
              {t('eyebrow')}
            </span>
            <blockquote className="font-display text-3xl md:text-4xl lg:text-[40px] leading-tight font-light italic text-text-primary">
              {t('quote')}
            </blockquote>
            <div className="flex items-center space-x-4 pt-4">
              <div className="h-px w-8 bg-accent-purple" />
              <div>
                <p className="font-semibold text-text-primary">{t('role')}</p>
                <p className="text-sm text-text-secondary">Great Harvest Ministries</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
