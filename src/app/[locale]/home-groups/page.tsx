"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { Search, MapPin, Calendar, Globe, Users } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Link } from "@/i18n/routing"

// Mock data
const MOCK_GROUPS = [
  {
    slug: "city-center-young-adults",
    name: "City Center Young Adults",
    day: "Thursday",
    time: "19:00",
    area: "Tverskoy District",
    language: "Russian",
    leader: "Alexey Volkov",
    capacity: "Open",
  },
  {
    slug: "arbat-families",
    name: "Arbat Families",
    day: "Wednesday",
    time: "18:30",
    area: "Arbat District",
    language: "Russian",
    leader: "Ivan & Maria Smirnov",
    capacity: "Waitlist",
  },
  {
    slug: "expat-community-hub",
    name: "Expat Community Hub",
    day: "Tuesday",
    time: "19:30",
    area: "Presnensky District",
    language: "English",
    leader: "David Miller",
    capacity: "Open",
  },
  {
    slug: "sokol-students",
    name: "Sokol Students",
    day: "Friday",
    time: "18:00",
    area: "Sokol District",
    language: "Russian",
    leader: "Elena Popova",
    capacity: "Open",
  },
  {
    slug: "business-leaders-circle",
    name: "Business Leaders Circle",
    day: "Wednesday",
    time: "07:30",
    area: "Moscow City",
    language: "English",
    leader: "Michael Chen",
    capacity: "Waitlist",
  },
]

export default function HomeGroupsPage() {
  const t = useTranslations('HomeGroupsPage')
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterDay, setFilterDay] = React.useState("All")
  const [filterArea, setFilterArea] = React.useState("All")
  const [filterLanguage, setFilterLanguage] = React.useState("All")

  // Extract unique filters
  const days = ["All", ...Array.from(new Set(MOCK_GROUPS.map((g) => g.day)))]
  const areas = ["All", ...Array.from(new Set(MOCK_GROUPS.map((g) => g.area)))]
  const languages = ["All", ...Array.from(new Set(MOCK_GROUPS.map((g) => g.language)))]

  // Filter logic
  const filteredGroups = MOCK_GROUPS.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          group.area.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDay = filterDay === "All" || group.day === filterDay
    const matchesArea = filterArea === "All" || group.area === filterArea
    const matchesLanguage = filterLanguage === "All" || group.language === filterLanguage
    return matchesSearch && matchesDay && matchesArea && matchesLanguage
  })

  return (
    <div className="flex w-full flex-col pb-24">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-surface-subtle py-24 md:py-32">
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
      <section className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 py-12">
        {/* Search & Filters */}
        <AnimatedSection className="mb-12 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
            <Input
              placeholder="Search groups or areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filterDay}
              onChange={(e) => setFilterDay(e.target.value)}
              className="h-11 rounded-md border border-border bg-surface-elevated px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple"
            >
              <option value="All">{t('filters.allDays')}</option>
              {days.filter(d => d !== "All").map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="h-11 rounded-md border border-border bg-surface-elevated px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple"
            >
              <option value="All">{t('filters.allAreas')}</option>
              {areas.filter(a => a !== "All").map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="h-11 rounded-md border border-border bg-surface-elevated px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple"
            >
              <option value="All">{t('filters.allLanguages')}</option>
              {languages.filter(l => l !== "All").map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </AnimatedSection>

        {/* Groups Grid */}
        <AnimatedStaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <AnimatedStaggerItem key={group.slug}>
              <Link href={`/home-groups/${group.slug}` as any} className="block h-full outline-none">
                <Card hoverLift className="flex h-full flex-col p-6 cursor-pointer border-transparent transition-all duration-300 hover:border-accent-purple">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-xl font-bold text-text-primary pr-4 line-clamp-2">
                      {group.name}
                    </h3>
                    <Badge variant={group.capacity === "Open" ? "success" : "neutral"} className="shrink-0">
                      {group.capacity === "Open" ? t('groupCard.statusOpen') : t('groupCard.statusWaitlist')}
                    </Badge>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center text-sm text-text-secondary">
                      <Calendar className="mr-2 h-4 w-4 text-accent-purple" />
                      <span>{group.day} at {group.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-text-secondary">
                      <MapPin className="mr-2 h-4 w-4 text-accent-purple" />
                      <span>{group.area}</span>
                    </div>
                    <div className="flex items-center text-sm text-text-secondary">
                      <Globe className="mr-2 h-4 w-4 text-accent-purple" />
                      <span>{group.language}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center pt-4 border-t border-border">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-subtle text-text-secondary text-xs font-bold mr-3">
                      {group.leader.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-sm">
                      <p className="text-text-tertiary text-xs">{t('groupCard.leader')}</p>
                      <p className="font-medium text-text-primary">{group.leader}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </AnimatedStaggerItem>
          ))}
          {filteredGroups.length === 0 && (
            <div className="col-span-full py-12 text-center text-text-tertiary">
              No groups found matching your criteria.
            </div>
          )}
        </AnimatedStaggerGroup>
      </section>
    </div>
  )
}
