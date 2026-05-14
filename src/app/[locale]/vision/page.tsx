import * as React from "react"
import { useTranslations } from "next-intl"
import { Flame, Globe, Zap } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"
import { Link } from "@/i18n/routing"

export default function VisionPage() {
  const t = useTranslations('VisionPage')

  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[70svh] w-full flex-col items-center justify-center overflow-hidden bg-surface-dark text-white py-24">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/40 via-surface-dark to-surface-dark" />
        
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <AnimatedSection>
            <p className="mb-6 text-xl font-bold tracking-widest uppercase text-accent-orange">
              {t('heroReference')}
            </p>
            <blockquote className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              {t('heroQuote')}
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* The Harvest Mandate */}
      <section className="w-full bg-surface-base py-24 md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
          <AnimatedSection>
            <SectionHeader
              eyebrow={t('mandateEyebrow')}
              heading={t('mandateHeading')}
              align="center"
              className="mb-12"
            />
            <div className="prose prose-lg mx-auto text-text-secondary">
              <p className="font-display text-2xl text-text-primary leading-relaxed mb-8">
                {t('mandateText1')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('mandateText2')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="w-full bg-surface-subtle py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
          <AnimatedSection className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
              {t('pillarsEyebrow')}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              {t('pillarsHeading')}
            </h2>
          </AnimatedSection>

          <AnimatedStaggerGroup className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Pillar 1 */}
            <AnimatedStaggerItem className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-purple-10 text-accent-purple">
                <Flame className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold text-text-primary">
                {t('pillar1Title')}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {t('pillar1Text')}
              </p>
            </AnimatedStaggerItem>

            {/* Pillar 2 */}
            <AnimatedStaggerItem className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-orange-10 text-accent-orange">
                <Zap className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold text-text-primary">
                {t('pillar2Title')}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {t('pillar2Text')}
              </p>
            </AnimatedStaggerItem>

            {/* Pillar 3 */}
            <AnimatedStaggerItem className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-elevated text-text-primary shadow-sm">
                <Globe className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold text-text-primary">
                {t('pillar3Title')}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {t('pillar3Text')}
              </p>
            </AnimatedStaggerItem>
          </AnimatedStaggerGroup>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-accent-purple py-24 text-center text-white">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
          <AnimatedSection>
            <span className="text-sm font-semibold uppercase tracking-widest opacity-80">
              {t('joinEyebrow')}
            </span>
            <h2 className="mt-4 mb-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
              {t('joinHeading')}
            </h2>
            <p className="mb-10 text-lg opacity-90">
              {t('joinText')}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="primary" className="w-full bg-white text-accent-purple hover:bg-surface-subtle sm:w-auto" asChild>
                <Link href="/giving">{t('giveButton')}</Link>
              </Button>
              <Button variant="secondary" className="w-full border-white text-white hover:bg-white/10 sm:w-auto" asChild>
                <Link href="/volunteering">{t('serveButton')}</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
