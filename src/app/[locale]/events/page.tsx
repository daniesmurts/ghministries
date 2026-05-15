import * as React from "react"
import { getTranslations } from "next-intl/server"
import { client } from "@/sanity/lib/client"
import { allEventsQuery } from "@/sanity/lib/queries"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import EventsClient from "./EventsClient"

export const revalidate = 3600 // Revalidate every hour

export default async function EventsPage() {
  const t = await getTranslations('EventsPage')
  
  // Fetch real events from Sanity
  const events = await client.fetch(allEventsQuery)

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

      {/* Main Content (Interactive Client Component) */}
      <EventsClient events={events} />
    </div>
  )
}
