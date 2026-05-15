import * as React from "react"
import { client } from "@/sanity/lib/client"
import { eventBySlugQuery } from "@/sanity/lib/queries"
import EventDetailClient from "./EventDetailClient"

export const revalidate = 3600 // Revalidate every hour

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params
  
  // Fetch real event from Sanity
  const event = await client.fetch(eventBySlugQuery, { slug: resolvedParams.slug })

  return <EventDetailClient event={event} />
}

