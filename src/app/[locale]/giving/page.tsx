"use client"
import * as React from "react"
import { useTranslations, useLocale } from "next-intl"
import { Lock, FileCheck, Landmark, ChevronDown } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export default function GivingPage() {
  const t = useTranslations('GivingPage')
  const locale = useLocale()
  
  const [givingType, setGivingType] = React.useState<"one-time" | "monthly">("one-time")
  const [selectedAmount, setSelectedAmount] = React.useState<number | "custom">(1000)
  const [customAmount, setCustomAmount] = React.useState<string>("")
  const [isRedirecting, setIsRedirecting] = React.useState(false)
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  // Currency symbol based on locale (₽ for ru, $ for en)
  const currencySymbol = locale === 'ru' ? '₽' : '$'
  // Preset amounts based on locale to make them realistic
  const presets = locale === 'ru' ? [500, 1000, 5000] : [50, 100, 500]

  const handleGive = async () => {
    setIsRedirecting(true)
    const amount = selectedAmount === "custom" ? customAmount : selectedAmount
    console.log(`Redirecting to payment gateway for ${currencySymbol}${amount} (${givingType})`)
    
    // Simulate redirect delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    // External link placeholder
    window.location.href = "#"
    setIsRedirecting(false)
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
  ]

  return (
    <div className="flex w-full flex-col pb-24 bg-surface-subtle">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow={t('heroEyebrow')}
              heading={t('heroTitle')}
              subtext={t('heroSubtitle')}
              align="center"
              className="mb-8"
            />
            <p className="max-w-2xl text-lg font-medium text-accent-purple italic mx-auto">
              {t('scripture')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content: Giving Form */}
      <section className="mx-auto w-full max-w-xl px-6 md:px-8 py-8 relative z-10">
        <AnimatedSection className="bg-surface-elevated rounded-2xl shadow-elevated overflow-hidden border border-border">
          
          <div className="p-8 md:p-10">
            {/* Toggle One-Time / Monthly */}
            <div className="flex p-1 bg-surface-subtle rounded-lg mb-8">
              <button
                onClick={() => setGivingType("one-time")}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-md transition-all",
                  givingType === "one-time" ? "bg-surface-elevated shadow text-text-primary" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {t('form.oneTime')}
              </button>
              <button
                onClick={() => setGivingType("monthly")}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-md transition-all",
                  givingType === "monthly" ? "bg-surface-elevated shadow text-text-primary" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {t('form.monthly')}
              </button>
            </div>

            {/* Amount Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {presets.map((amount) => (
                <button
                  key={amount}
                  onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                  className={cn(
                    "py-4 rounded-xl border-2 font-display text-lg font-bold transition-all",
                    selectedAmount === amount 
                      ? "border-accent-orange bg-accent-orange-10 text-accent-orange" 
                      : "border-border bg-surface-base text-text-primary hover:border-text-tertiary"
                  )}
                >
                  {currencySymbol}{amount}
                </button>
              ))}
              <button
                onClick={() => setSelectedAmount("custom")}
                className={cn(
                  "py-4 rounded-xl border-2 font-display text-sm font-bold transition-all",
                  selectedAmount === "custom" 
                    ? "border-accent-orange bg-accent-orange-10 text-accent-orange" 
                    : "border-border bg-surface-base text-text-primary hover:border-text-tertiary"
                )}
              >
                {t('form.customAmount')}
              </button>
            </div>

            {/* Custom Amount Input */}
            {selectedAmount === "custom" && (
              <AnimatedSection className="mb-8 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-xl font-bold text-text-primary">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  placeholder="0"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full rounded-xl border-2 border-border bg-surface-base py-4 pl-10 pr-4 text-xl font-bold text-text-primary focus:border-accent-orange focus:outline-none focus:ring-0"
                />
              </AnimatedSection>
            )}

            {/* Give Button */}
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full bg-accent-orange hover:bg-[#e55317] py-6 text-lg rounded-xl"
              onClick={handleGive}
              disabled={isRedirecting || (selectedAmount === "custom" && (!customAmount || Number(customAmount) <= 0))}
            >
              <Lock className="mr-2 h-5 w-5" />
              {isRedirecting ? t('form.redirecting') : t('form.giveSecurely')}
            </Button>
            
            <p className="text-center text-xs text-text-tertiary mt-4">
              You will be redirected to our secure giving partner.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="bg-surface-subtle border-t border-border p-6 flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 text-center">
            <div className="flex flex-col items-center">
              <Lock className="h-5 w-5 text-text-tertiary mb-2" />
              <span className="text-xs font-semibold text-text-secondary">{t('trust.secure')}</span>
            </div>
            <div className="flex flex-col items-center">
              <FileCheck className="h-5 w-5 text-text-tertiary mb-2" />
              <span className="text-xs font-semibold text-text-secondary">{t('trust.registered')}</span>
            </div>
            <div className="flex flex-col items-center">
              <Landmark className="h-5 w-5 text-text-tertiary mb-2" />
              <span className="text-xs font-semibold text-text-secondary">{t('trust.transparent')}</span>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto w-full max-w-3xl px-6 md:px-8 py-16">
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary mb-8 text-center">
            {t('faq.title')}
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-surface-elevated border border-border rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between font-semibold text-text-primary focus:outline-none"
                >
                  <span className="text-left pr-4">{faq.q}</span>
                  <ChevronDown className={cn("h-5 w-5 text-text-tertiary transition-transform duration-300 shrink-0", openFaq === index && "rotate-180")} />
                </button>
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 pb-4 text-text-secondary">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
