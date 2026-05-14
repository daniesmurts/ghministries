"use client"
import * as React from "react"
import { Play } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

const sermons = [
  {
    title: "The Cost of the Call",
    speaker: "Apostle John Doe",
    date: "Oct 15, 2025",
    duration: "45:20",
    series: "Kingdom Foundations",
    thumbnail: "bg-surface-subtle",
  },
  {
    title: "Power from on High",
    speaker: "Pastor Jane Smith",
    date: "Oct 8, 2025",
    duration: "52:10",
    series: "Holy Spirit",
    thumbnail: "bg-surface-subtle",
  },
  {
    title: "Walking in Faith",
    speaker: "Apostle John Doe",
    date: "Oct 1, 2025",
    duration: "48:05",
    series: "Kingdom Foundations",
    thumbnail: "bg-surface-subtle",
  },
]

export function LatestSermons() {
  const t = useTranslations('LatestSermons')

  return (
    <section className="w-full bg-surface-base py-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <AnimatedSection className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            align="left"
            className="mb-0"
          />
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link href="/media">{t('visitLibrary')}</Link>
          </Button>
        </AnimatedSection>

        <AnimatedStaggerGroup className="flex overflow-x-auto pb-8 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 gap-6 snap-x snap-mandatory">
          {sermons.map((sermon, index) => (
            <AnimatedStaggerItem 
              key={index} 
              className="group min-w-[85vw] sm:min-w-[300px] md:min-w-0 flex-shrink-0 snap-center rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-surface-subtle rounded-xl">
                <div className="absolute inset-0 bg-surface-subtle transition-transform duration-500 group-hover:scale-105" />
                
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-purple text-white shadow-lg">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {sermon.duration}
                </div>
              </div>
              
              <div className="pt-4 space-y-2">
                <Badge variant="purple">{sermon.series}</Badge>
                <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-purple transition-colors line-clamp-2">
                  {sermon.title}
                </h3>
                <div className="flex items-center text-sm text-text-secondary space-x-2">
                  <span className="font-medium">{sermon.speaker}</span>
                  <span>•</span>
                  <span>{sermon.date}</span>
                </div>
              </div>
            </AnimatedStaggerItem>
          ))}
        </AnimatedStaggerGroup>
        
        <div className="mt-8 flex justify-center md:hidden">
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/media">{t('visitLibrary')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
