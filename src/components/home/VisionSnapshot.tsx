"use client"
import * as React from "react"
import { Link } from "@/i18n/routing"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Button } from "@/components/ui/Button"
import { useTranslations } from "next-intl"

export function VisionSnapshot() {
  const t = useTranslations('VisionSnapshot')
  
  return (
    <section className="w-full bg-surface-dark py-24 md:py-32 text-center text-white">
      <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
        <AnimatedSection className="flex flex-col items-center space-y-8">
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
            {t('quote')}
          </blockquote>
          
          <p className="text-xl font-bold tracking-widest uppercase text-accent-orange">
            {t('reference')}
          </p>

          <p className="max-w-2xl text-lg text-text-tertiary">
            {t('description')}
          </p>

          <div className="pt-8">
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/vision">{t('readFull')}</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
