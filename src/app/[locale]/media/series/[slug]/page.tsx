"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { ArrowLeft, Play, Headphones } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { Badge } from "@/components/ui/Badge"
import { Link } from "@/i18n/routing"

// Mock Data
const MOCK_SERIES = {
  title: "Kingdom Foundations",
  description: "A foundational series exploring the core principles of living a Kingdom-centered life. We dive deep into what it means to be a citizen of heaven while walking on earth.",
  image: "bg-surface-subtle",
  sermons: [
    {
      slug: "the-cost-of-the-call",
      title: "The Cost of the Call",
      speaker: "Apostle John Doe",
      date: "Oct 15, 2025",
      duration: "45:20",
      type: "video",
    },
    {
      slug: "walking-in-faith",
      title: "Walking in Faith",
      speaker: "Apostle John Doe",
      date: "Oct 1, 2025",
      duration: "48:05",
      type: "audio",
    },
    {
      slug: "faith-in-the-fire",
      title: "Faith in the Fire",
      speaker: "Pastor David Ivanov",
      date: "Sep 17, 2025",
      duration: "41:30",
      type: "video",
    }
  ]
} as const

export default function SeriesDetailPage() {
  const t = useTranslations('MediaPage')

  return (
    <div className="flex w-full flex-col pb-24">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-surface-dark py-24 md:py-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/50 via-surface-dark to-surface-dark" />
        
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center text-white">
          <AnimatedSection>
            <Link href="/media" className="inline-flex items-center text-sm font-semibold text-accent-purple hover:text-white transition-colors hover:underline underline-offset-4 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('detail.back')}
            </Link>
            <div className="mb-4">
              <Badge variant="purple">{t('tabs.series')}</Badge>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {MOCK_SERIES.title}
            </h1>
            <p className="max-w-2xl text-lg text-text-tertiary mx-auto">
              {MOCK_SERIES.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-5xl px-6 md:px-8 lg:px-12 py-16">
        <AnimatedSection className="mb-8">
          <h2 className="font-display text-2xl font-bold text-text-primary">
            Messages in this Series ({MOCK_SERIES.sermons.length})
          </h2>
        </AnimatedSection>

        <AnimatedStaggerGroup className="flex flex-col space-y-6">
          {MOCK_SERIES.sermons.map((sermon, index) => (
            <AnimatedStaggerItem key={sermon.slug}>
              <Link href={`/media/${sermon.slug}`} className="group block outline-none">
                <div className="flex flex-col sm:flex-row bg-surface-base border border-border rounded-xl overflow-hidden hover:shadow-elevated hover:border-accent-purple transition-all duration-300">
                  <div className="relative w-full sm:w-64 aspect-video sm:aspect-auto bg-surface-subtle shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-purple text-white shadow-lg scale-90 group-hover:scale-100 transition-transform">
                        {sermon.type === "video" ? (
                          <Play className="h-5 w-5 ml-1" fill="currentColor" />
                        ) : (
                          <Headphones className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-purple transition-colors">
                        {index + 1}. {sermon.title}
                      </h3>
                      <span className="text-xs font-medium text-text-tertiary bg-surface-subtle px-2 py-1 rounded">
                        {sermon.duration}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-text-secondary space-x-2">
                      <span className="font-medium">{sermon.speaker}</span>
                      <span>•</span>
                      <span>{sermon.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedStaggerItem>
          ))}
        </AnimatedStaggerGroup>
      </section>
    </div>
  )
}
