"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { ArrowLeft, Play, Share2, Calendar, User, ListVideo } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Link } from "@/i18n/routing"

export default function MediaDetailPage({ params }: { params: { slug: string } }) {
  const t = useTranslations('MediaPage.detail')

  // Mock data based on slug
  const sermon = {
    title: "The Cost of the Call",
    speaker: "Apostle John Doe",
    date: "Oct 15, 2025",
    duration: "45:20",
    series: "Kingdom Foundations",
    description: "In this powerful message, we explore what it truly costs to follow the call of God on our lives. Using the examples from the early church, we learn that the anointing always comes with a price, but the reward far outweighs the sacrifice.",
    youtubeId: "dQw4w9WgXcQ", // Placeholder
  }

  return (
    <div className="flex w-full flex-col bg-surface-base pb-24">
      {/* Header */}
      <div className="w-full bg-surface-dark text-white pt-32 pb-16">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
          <Link href="/media" className="inline-flex items-center text-sm font-semibold text-accent-purple hover:text-white transition-colors hover:underline underline-offset-4 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('back')}
          </Link>
          
          <AnimatedSection>
            <div className="flex items-center space-x-3 mb-6">
              <Badge variant="purple">{sermon.series}</Badge>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {sermon.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-tertiary">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span className="font-medium text-white/90">{sermon.speaker}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{sermon.date}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 md:px-8 -mt-8 relative z-10">
        {/* Video Player Placeholder */}
        <AnimatedSection className="aspect-video w-full bg-black rounded-2xl shadow-elevated overflow-hidden border border-border">
          {/* Use a real iframe when actual data is present, for now just a mockup of a player */}
          <div className="w-full h-full relative group flex items-center justify-center bg-surface-dark">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <button className="h-20 w-20 bg-accent-purple rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300 z-10">
              <Play className="h-8 w-8 ml-1" fill="currentColor" />
            </button>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-1 flex-1 bg-white/20 rounded-full mr-4">
                <div className="w-1/3 h-full bg-accent-purple rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow" />
                </div>
              </div>
              <span className="text-white text-xs font-medium font-mono">15:20 / {sermon.duration}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Content Details */}
        <div className="mt-12 flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-2/3 space-y-8">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-4">{t('description')}</h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                {sermon.description}
              </p>
            </AnimatedSection>
          </div>
          
          <div className="w-full md:w-1/3 space-y-6">
            <AnimatedSection delay={0.1} className="bg-surface-subtle rounded-xl p-6 border border-border">
              <Button variant="secondary" className="w-full mb-6">
                <Share2 className="mr-2 h-4 w-4" />
                {t('share')}
              </Button>
              
              <h3 className="font-semibold text-text-primary mb-4 text-sm uppercase tracking-wider">{t('series')}</h3>
              <Link href={`/media/series/${sermon.series.toLowerCase().replace(/ /g, '-')}` as any} className="group block">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-surface-elevated rounded-lg border border-border flex items-center justify-center text-accent-purple group-hover:border-accent-purple transition-colors">
                    <ListVideo className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary group-hover:text-accent-purple transition-colors">{sermon.series}</h4>
                    <p className="text-sm text-text-secondary">View all messages</p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}
