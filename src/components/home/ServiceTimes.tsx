"use client"
import * as React from "react"
import { Clock } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"
import { useTranslations } from "next-intl"

export function ServiceTimes() {
  const t = useTranslations('ServiceTimes')

  const services = [
    {
      day: t('services.sundayMorning.day'),
      time: "10:00 AM",
      language: t('services.sundayMorning.language'),
    },
    {
      day: t('services.sundayEvening.day'),
      time: "5:00 PM",
      language: t('services.sundayEvening.language'),
    },
    {
      day: t('services.wednesday.day'),
      time: "7:00 PM",
      language: t('services.wednesday.language'),
    },
  ]

  return (
    <section className="w-full bg-surface-base py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <AnimatedSection className="mb-16">
          <SectionHeader
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subtext={t('subtext')}
          />
        </AnimatedSection>

        <AnimatedStaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedStaggerItem key={index}>
              <Card hoverLift className="flex h-full flex-col justify-between p-8 text-center items-center space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-purple-10 text-accent-purple">
                  <Clock className="h-8 w-8" strokeWidth={1.5} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-text-primary">{service.day}</h3>
                  <p className="text-2xl font-semibold text-text-primary">{service.time}</p>
                  <p className="text-sm text-text-secondary">{service.language}</p>
                </div>

                <a 
                  href="#" 
                  className="text-sm font-semibold text-accent-purple hover:underline underline-offset-4 transition-all"
                >
                  {t('getDirections')}
                </a>
              </Card>
            </AnimatedStaggerItem>
          ))}
        </AnimatedStaggerGroup>
      </div>
    </section>
  )
}
