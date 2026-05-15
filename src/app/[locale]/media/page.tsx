"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { Search, Play, Headphones, FolderOpen } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Badge } from "@/components/ui/Badge"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

// Mock Data
const MOCK_MEDIA = [
  {
    slug: "the-cost-of-the-call",
    title: "The Cost of the Call",
    speaker: "Apostle John Doe",
    date: "Oct 15, 2025",
    duration: "45:20",
    series: "Kingdom Foundations",
    type: "video",
  },
  {
    slug: "power-from-on-high",
    title: "Power from on High",
    speaker: "Pastor Jane Smith",
    date: "Oct 8, 2025",
    duration: "52:10",
    series: "Holy Spirit",
    type: "video",
  },
  {
    slug: "walking-in-faith",
    title: "Walking in Faith",
    speaker: "Apostle John Doe",
    date: "Oct 1, 2025",
    duration: "48:05",
    series: "Kingdom Foundations",
    type: "audio",
  },
  {
    slug: "the-heart-of-worship",
    title: "The Heart of Worship",
    speaker: "Pastor Elena Popova",
    date: "Sep 24, 2025",
    duration: "38:15",
    series: "Presence",
    type: "video",
  },
  {
    slug: "faith-in-the-fire",
    title: "Faith in the Fire",
    speaker: "Pastor David Ivanov",
    date: "Sep 17, 2025",
    duration: "41:30",
    series: "Kingdom Foundations",
    type: "video",
  },
  {
    slug: "missions-mandate",
    title: "The Missions Mandate",
    speaker: "Pastor Marcus Adebayo",
    date: "Sep 10, 2025",
    duration: "55:00",
    series: "Stand Alone",
    type: "audio",
  },
] as const

export default function MediaLibraryPage() {
  const t = useTranslations('MediaPage')
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("all")

  const filteredMedia = MOCK_MEDIA.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.series.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchesTab = true
    if (activeTab === "video") matchesTab = item.type === "video"
    if (activeTab === "audio") matchesTab = item.type === "audio"
    if (activeTab === "series") matchesTab = false // Handled separately if needed, just a mock for now
    
    return matchesSearch && matchesTab
  })

  return (
    <div className="flex w-full flex-col pb-24">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-surface-dark text-white py-24 md:py-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/50 via-surface-dark to-surface-dark" />
        
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow={t('heroEyebrow')}
              heading={t('heroTitle')}
              subtext={t('heroSubtitle')}
              align="center"
              className="mb-8 text-white"
            />
            
            <div className="relative w-full max-w-xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/20 bg-white/10 py-4 pl-12 pr-6 text-white placeholder-white/50 focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple backdrop-blur-sm"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 py-12">
        
        {/* Tabs */}
        <AnimatedSection className="mb-12 border-b border-border">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: "all", label: t('tabs.all') },
              { id: "video", label: t('tabs.video') },
              { id: "audio", label: t('tabs.audio') },
              { id: "series", label: t('tabs.series') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "whitespace-nowrap pb-4 text-sm font-semibold transition-colors focus-visible:outline-none relative",
                  activeTab === tab.id ? "text-accent-purple" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-purple rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {activeTab === "series" ? (
          <AnimatedSection className="text-center py-24 text-text-tertiary">
            <FolderOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Series view coming soon.</p>
          </AnimatedSection>
        ) : (
          <AnimatedStaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((item) => (
              <AnimatedStaggerItem key={item.slug}>
                <Link href={`/media/${item.slug}`} className="group block h-full outline-none">
                  <div className="relative aspect-video w-full overflow-hidden bg-surface-subtle rounded-xl mb-4">
                    <div className="absolute inset-0 bg-surface-subtle transition-transform duration-500 group-hover:scale-105" />
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-purple text-white shadow-lg">
                        {item.type === "video" ? (
                          <Play className="h-6 w-6 ml-1" fill="currentColor" />
                        ) : (
                          <Headphones className="h-6 w-6" />
                        )}
                      </div>
                    </div>

                    <div className="absolute bottom-3 right-3 flex space-x-2">
                      <div className="rounded bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-md flex items-center">
                        {item.type === "video" ? <Play className="h-3 w-3 mr-1" /> : <Headphones className="h-3 w-3 mr-1" />}
                        {item.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Badge variant="purple">{item.series}</Badge>
                    <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-purple transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-sm text-text-secondary space-x-2">
                      <span className="font-medium">{item.speaker}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </Link>
              </AnimatedStaggerItem>
            ))}
            {filteredMedia.length === 0 && (
              <div className="col-span-full py-12 text-center text-text-tertiary">
                No resources found matching your search.
              </div>
            )}
          </AnimatedStaggerGroup>
        )}
      </section>
    </div>
  )
}
