"use client"
import * as React from "react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

const events = [
  {
    title: "Global Leadership Summit",
    date: "Nov 12",
    location: "Main Campus, Moscow",
    description: "A three-day intensive for emerging leaders focusing on Kingdom principles.",
  },
  {
    title: "Night of Worship",
    date: "Nov 18",
    location: "City Center Hall",
    description: "Join us for an extended time of praise, worship, and prophetic ministry.",
  },
  {
    title: "Youth Conference 2025",
    date: "Nov 25",
    location: "Main Campus, Moscow",
    description: "Equipping the next generation to be salt and light in their schools.",
  },
]

export function UpcomingEvents() {
  const t = useTranslations('UpcomingEvents')

  return (
    <section className="w-full bg-surface-subtle py-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <AnimatedSection className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            align="left"
            className="mb-0"
          />
          <Button variant="secondary" asChild className="hidden md:inline-flex">
            <Link href="/events">{t('viewCalendar')}</Link>
          </Button>
        </AnimatedSection>

        <AnimatedStaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <AnimatedStaggerItem key={index}>
              <Card className="group flex h-full flex-col p-6 hover:-translate-y-1 hover:border-accent-purple hover:shadow-elevated transition-all duration-300 cursor-pointer border-transparent">
                <div className="mb-4 inline-flex items-center justify-center rounded-md bg-accent-orange-10 px-3 py-1 text-sm font-bold text-accent-orange self-start">
                  {event.date}
                </div>
                <h3 className="mb-2 font-display text-xl font-bold text-text-primary group-hover:text-accent-purple transition-colors">
                  {event.title}
                </h3>
                <p className="mb-4 text-sm font-medium text-text-secondary">
                  {event.location}
                </p>
                <p className="text-text-tertiary">
                  {event.description}
                </p>
              </Card>
            </AnimatedStaggerItem>
          ))}
        </AnimatedStaggerGroup>
        
        <div className="mt-8 flex justify-center md:hidden">
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/events">{t('viewCalendar')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
