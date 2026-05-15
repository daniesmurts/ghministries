"use client"
import * as React from "react"
import { Users, Zap, Music, HeartHandshake, Flame, Video } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

const ministries = [
  {
    title: "Home Groups",
    description: "Find your community and grow together in small groups across the city.",
    icon: Users,
    href: "/home-groups",
  },
  {
    title: "Youth",
    description: "Empowering the next generation to encounter God and impact their world.",
    icon: Zap,
    href: "/youth",
  },
  {
    title: "Worship",
    description: "Creating an atmosphere for heaven to meet earth through music.",
    icon: Music,
    href: "/worship",
  },
  {
    title: "Outreach",
    description: "Being the hands and feet of Jesus to our local communities.",
    icon: HeartHandshake,
    href: "/outreach",
  },
  {
    title: "Prayer",
    description: "Standing in the gap and interceding for our city and nation.",
    icon: Flame,
    href: "/prayer",
  },
  {
    title: "Media",
    description: "Broadcasting the message of the Kingdom to the ends of the earth.",
    icon: Video,
    href: "/media",
  },
] as const

export function MinistriesGrid() {
  const t = useTranslations('MinistriesGrid')

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

        <AnimatedStaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry, index) => {
            const Icon = ministry.icon
            return (
              <AnimatedStaggerItem key={index}>
                <Link href={ministry.href} className="block h-full outline-none">
                  <Card className="group relative h-full flex flex-col p-8 overflow-hidden border-border transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-purple opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface-subtle text-text-primary group-hover:bg-accent-purple-10 group-hover:text-accent-purple transition-colors">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="mb-3 font-display text-2xl font-bold text-text-primary">
                      {ministry.title}
                    </h3>
                    
                    <p className="mb-6 flex-1 text-text-secondary">
                      {ministry.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-semibold text-accent-purple">
                      {t('learnMore')}
                      <span className="ml-2 transform transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Card>
                </Link>
              </AnimatedStaggerItem>
            )
          })}
        </AnimatedStaggerGroup>
      </div>
    </section>
  )
}
