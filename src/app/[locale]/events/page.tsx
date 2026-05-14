"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { Calendar as CalendarIcon, MapPin, List, Grid } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

// Mock Events
export const MOCK_EVENTS = [
  {
    id: "e1",
    slug: "global-leadership-summit-2025",
    title: "Global Leadership Summit 2025",
    type: "Conference",
    date: "2025-08-15T09:00:00Z",
    endDate: "2025-08-17T18:00:00Z",
    location: "Moscow HQ",
    image: "bg-gradient-to-br from-indigo-900 to-purple-800",
    description: "Join pastors and leaders from around the world for three days of impartation, vision, and strategic planning for the harvest.",
    speakers: ["Apostle John Doe", "Pastor Alexey Volkov", "Guest Speakers"]
  },
  {
    id: "e2",
    slug: "night-of-worship",
    title: "Night of Worship & Encounter",
    type: "Worship",
    date: "2025-06-20T19:00:00Z",
    endDate: "2025-06-20T22:00:00Z",
    location: "St. Petersburg Campus",
    image: "bg-gradient-to-br from-slate-800 to-black",
    description: "An extended evening of unhindered worship, prophetic ministry, and seeking the presence of God together.",
    speakers: ["Great Harvest Worship Team"]
  },
  {
    id: "e3",
    slug: "youth-summer-camp",
    title: "Youth Summer Camp",
    type: "Youth",
    date: "2025-07-10T08:00:00Z",
    endDate: "2025-07-15T12:00:00Z",
    location: "Camp Sokol, Moscow Region",
    image: "bg-gradient-to-br from-orange-400 to-red-500",
    description: "Five days of extreme fun, deep encounters with God, and lifelong friendships for teenagers ages 13-18.",
    speakers: ["Youth Pastor Mark", "Team"]
  },
  {
    id: "e4",
    slug: "marriage-seminar",
    title: "Stronger Together: Marriage Seminar",
    type: "Seminar",
    date: "2025-09-05T10:00:00Z",
    endDate: "2025-09-05T16:00:00Z",
    location: "Moscow HQ",
    image: "bg-gradient-to-br from-teal-500 to-emerald-600",
    description: "Invest in your marriage with practical tools, biblical wisdom, and a romantic evening session.",
    speakers: ["Pastor John & Jane Doe"]
  }
]

export default function EventsPage() {
  const t = useTranslations('EventsPage')
  const [viewMode, setViewMode] = React.useState<"list" | "calendar">("list")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  // Sort events chronologically
  const sortedEvents = [...MOCK_EVENTS].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="flex w-full flex-col pb-24 bg-surface-subtle min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-16 bg-surface-base">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow={t('heroEyebrow')}
              heading={t('heroTitle')}
              subtext={t('heroSubtitle')}
              align="center"
              className="mb-8"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-5xl px-6 md:px-8 py-8">
        
        {/* Toggle View */}
        <AnimatedSection className="mb-8 flex justify-end">
          <div className="flex bg-surface-elevated rounded-lg p-1 border border-border">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "flex items-center px-4 py-2 rounded-md text-sm font-bold transition-all",
                viewMode === "list" ? "bg-surface-subtle text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              <List className="h-4 w-4 mr-2" />
              {t('toggle.list')}
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={cn(
                "flex items-center px-4 py-2 rounded-md text-sm font-bold transition-all",
                viewMode === "calendar" ? "bg-surface-subtle text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
              )}
            >
              <Grid className="h-4 w-4 mr-2" />
              {t('toggle.calendar')}
            </button>
          </div>
        </AnimatedSection>

        {/* Events View */}
        {viewMode === "list" ? (
          <AnimatedStaggerGroup className="flex flex-col space-y-4">
            {sortedEvents.map((event) => {
              const { month, day, time } = formatDate(event.date)
              return (
                <AnimatedStaggerItem key={event.id}>
                  <Link href={`/events/${event.slug}`} className="block group">
                    <Card hoverLift className="flex flex-col sm:flex-row overflow-hidden border-transparent hover:border-accent-purple/50 transition-colors">
                      {/* Date Chip (Orange) */}
                      <div className="bg-accent-orange text-white flex flex-col items-center justify-center p-6 sm:w-32 shrink-0 group-hover:bg-[#e55317] transition-colors">
                        <span className="text-sm font-bold uppercase tracking-widest opacity-90">{month}</span>
                        <span className="font-display text-4xl font-bold">{day}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface-elevated">
                        <div className="flex-1">
                          <div className="flex items-center mb-2 gap-3">
                            <Badge variant="purple" className="text-[10px]">{event.type}</Badge>
                            <span className="text-sm font-medium text-accent-orange flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {time}
                            </span>
                          </div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-text-secondary text-sm">
                            <MapPin className="h-4 w-4 mr-1.5 shrink-0" />
                            {event.location}
                          </div>
                        </div>
                        
                        <Button variant="secondary" className="shrink-0 pointer-events-none md:w-auto w-full group-hover:bg-accent-purple group-hover:text-white group-hover:border-accent-purple">
                          {t('card.register')}
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </AnimatedStaggerItem>
              )
            })}
          </AnimatedStaggerGroup>
        ) : (
          <AnimatedSection className="bg-surface-elevated rounded-2xl shadow-elevated border border-border p-8 min-h-[500px] flex items-center justify-center">
            <div className="text-center text-text-tertiary">
              <CalendarIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">Calendar grid view is a premium feature currently in development.</p>
              <Button variant="ghost" className="mt-4" onClick={() => setViewMode("list")}>
                Return to List View
              </Button>
            </div>
          </AnimatedSection>
        )}
      </section>
    </div>
  )
}
