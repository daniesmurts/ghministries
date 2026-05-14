"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { MapPin, User, Clock, Search, ExternalLink, Globe2 } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
// import mapboxgl from 'mapbox-gl' // Deferred until a token is confirmed

const MOCK_LOCATIONS = [
  {
    id: "moscow-hq",
    city: "Moscow",
    country: "Russia",
    region: "Eurasia",
    coordinates: [37.6173, 55.7558], // [lng, lat]
    pastor: "Apostle John Doe",
    services: "Sun 10:00, 13:00, 18:00",
    address: "Tverskaya St, 1, Moscow",
    isHQ: true
  },
  {
    id: "spb",
    city: "St. Petersburg",
    country: "Russia",
    region: "Eurasia",
    coordinates: [30.3158, 59.9343],
    pastor: "Pastor Alexey Volkov",
    services: "Sun 11:00",
    address: "Nevsky Prospect, St. Petersburg",
    isHQ: false
  },
  {
    id: "dubai",
    city: "Dubai",
    country: "UAE",
    region: "Middle East",
    coordinates: [55.2708, 25.2048],
    pastor: "Pastor Michael Chen",
    services: "Sun 16:00",
    address: "Downtown Dubai",
    isHQ: false
  },
  {
    id: "london",
    city: "London",
    country: "UK",
    region: "Europe",
    coordinates: [-0.1276, 51.5074],
    pastor: "Pastor David Smith",
    services: "Sun 10:30, 18:00",
    address: "Central London",
    isHQ: false
  },
  {
    id: "nairobi",
    city: "Nairobi",
    country: "Kenya",
    region: "Africa",
    coordinates: [36.8219, -1.2921],
    pastor: "Pastor Marcus Adebayo",
    services: "Sun 09:00, 11:30",
    address: "Westlands, Nairobi",
    isHQ: false
  }
]

export default function GlobalPage() {
  const t = useTranslations('GlobalPage')
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterRegion, setFilterRegion] = React.useState("All")
  const [activeLocationId, setActiveLocationId] = React.useState<string>("moscow-hq")

  const regions = ["All", ...Array.from(new Set(MOCK_LOCATIONS.map(l => l.region)))]

  const filteredLocations = MOCK_LOCATIONS.filter(loc => {
    const matchesSearch = loc.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = filterRegion === "All" || loc.region === filterRegion
    return matchesSearch && matchesRegion
  })

  // Simulated map projection logic for the placeholder
  // A very rough projection mapping lat/lng to percentages
  const getMapPosition = (lng: number, lat: number) => {
    const x = (lng + 180) * (100 / 360)
    const y = (90 - lat) * (100 / 180)
    return { left: `${x}%`, top: `${y}%` }
  }

  return (
    <div className="flex w-full flex-col pb-24 bg-surface-subtle">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-16 bg-surface-base">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow={t('heroEyebrow')}
              heading={t('heroTitle')}
              subtext={t('heroSubtitle')}
              align="center"
              className="mb-0"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 h-auto lg:h-[800px]">
          
          {/* Sidebar */}
          <AnimatedSection className="w-full lg:w-[400px] flex flex-col bg-surface-elevated rounded-2xl shadow-elevated border border-border overflow-hidden shrink-0 h-[600px] lg:h-full">
            <div className="p-6 border-b border-border bg-surface-subtle">
              <h2 className="font-display text-xl font-bold text-text-primary mb-4">{t('sidebar.title')}</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
                  <Input
                    placeholder={t('sidebar.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-surface-base"
                  />
                </div>
                
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="w-full h-11 rounded-md border border-border bg-surface-base px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple"
                >
                  <option value="All">{t('filters.allRegions')}</option>
                  {regions.filter(r => r !== "All").map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredLocations.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocationId(loc.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all duration-200 focus:outline-none",
                    activeLocationId === loc.id
                      ? "border-accent-purple bg-accent-purple-10 shadow-sm"
                      : "border-transparent bg-surface-base hover:border-border hover:bg-surface-subtle"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={cn(
                      "font-bold text-lg",
                      activeLocationId === loc.id ? "text-accent-purple" : "text-text-primary"
                    )}>
                      {loc.city}
                    </h3>
                    {loc.isHQ && <Badge variant="purple" className="text-[10px]">HQ</Badge>}
                  </div>
                  <p className="text-sm font-medium text-text-secondary mb-3">{loc.country} • {loc.region}</p>
                  
                  {activeLocationId === loc.id && (
                    <AnimatedSection className="space-y-2 mt-4 pt-4 border-t border-accent-purple-20">
                      <div className="flex items-center text-sm text-text-primary">
                        <User className="mr-2 h-4 w-4 text-accent-purple" />
                        <span>{loc.pastor}</span>
                      </div>
                      <div className="flex items-center text-sm text-text-primary">
                        <Clock className="mr-2 h-4 w-4 text-accent-purple" />
                        <span>{loc.services}</span>
                      </div>
                      <div className="flex items-start text-sm text-text-primary mt-2">
                        <MapPin className="mr-2 h-4 w-4 text-accent-purple shrink-0 mt-0.5" />
                        <span>{loc.address}</span>
                      </div>
                    </AnimatedSection>
                  )}
                </button>
              ))}
              
              {filteredLocations.length === 0 && (
                <div className="text-center py-8 text-text-tertiary">
                  No locations found.
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Map Area */}
          <AnimatedSection delay={0.1} className="w-full lg:flex-1 h-[400px] lg:h-full bg-[#1A1C29] rounded-2xl shadow-elevated border border-border overflow-hidden relative">
            
            {/* CSS-based Map Placeholder (since Mapbox token is pending) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/10 to-transparent z-0" />
            
            {/* World Map SVG Abstract Placeholder */}
            <div className="absolute inset-0 opacity-20 flex items-center justify-center pointer-events-none">
               <Globe2 className="w-[800px] h-[800px] text-accent-purple" strokeWidth={0.5} />
            </div>

            {/* Simulated Map Pins */}
            <div className="absolute inset-0 z-10">
              {filteredLocations.map(loc => {
                const isActive = activeLocationId === loc.id
                // For the placeholder, we use fixed percentages roughly corresponding to locations to look good on the abstract globe
                const positions: Record<string, { top: string, left: string }> = {
                  "moscow-hq": { top: "35%", left: "60%" },
                  "spb": { top: "30%", left: "55%" },
                  "dubai": { top: "55%", left: "65%" },
                  "london": { top: "38%", left: "45%" },
                  "nairobi": { top: "65%", left: "58%" },
                }
                const pos = positions[loc.id] || { top: "50%", left: "50%" }

                return (
                  <button
                    key={`pin-${loc.id}`}
                    onClick={() => setActiveLocationId(loc.id)}
                    className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center group focus:outline-none"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div className={cn(
                      "bg-surface-elevated text-text-primary text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap mb-2 transition-all duration-300",
                      isActive ? "opacity-100 translate-y-0 border-2 border-accent-purple" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none border border-border"
                    )}>
                      {loc.city}
                    </div>
                    <div className="relative">
                      {isActive && (
                        <div className="absolute inset-0 rounded-full animate-ping bg-accent-purple opacity-50" />
                      )}
                      <MapPin className={cn(
                        "transition-all duration-300 relative z-10",
                        isActive ? "h-10 w-10 text-accent-purple drop-shadow-[0_0_10px_rgba(99,68,255,0.8)] -translate-y-2" : "h-6 w-6 text-white/70 group-hover:text-white"
                      )} fill={isActive ? "white" : "transparent"} />
                    </div>
                  </button>
                )
              })}
            </div>
            
            {/* Overlay Notice */}
            <div className="absolute bottom-6 right-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs px-4 py-2 rounded-full font-medium">
              Interactive Mapbox integration requires NEXT_PUBLIC_MAPBOX_TOKEN
            </div>

          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-4xl px-6 md:px-8 py-16 text-center">
        <AnimatedSection className="bg-accent-purple text-white rounded-3xl p-12 shadow-elevated relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.2)_0%,transparent_100%)]" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Link href="/contact" className="inline-block">
              <Button variant="secondary" className="bg-white text-accent-purple hover:bg-white/90 hover:text-accent-purple border-none px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
                {t('cta.button')}
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
