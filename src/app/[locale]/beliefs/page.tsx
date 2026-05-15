"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { cn } from "@/lib/utils"

export default function BeliefsPage() {
  const t = useTranslations('BeliefsPage')
  const [activeSection, setActiveSection] = React.useState<string>("bible")

  const sections = React.useMemo(() => [
    { id: "bible", title: t('sections.bible.title'), content: t('sections.bible.content') },
    { id: "trinity", title: t('sections.trinity.title'), content: t('sections.trinity.content') },
    { id: "salvation", title: t('sections.salvation.title'), content: t('sections.salvation.content') },
    { id: "holySpirit", title: t('sections.holySpirit.title'), content: t('sections.holySpirit.content') },
    { id: "church", title: t('sections.church.title'), content: t('sections.church.content') },
    { id: "eschatology", title: t('sections.eschatology.title'), content: t('sections.eschatology.content') },
  ], [t])

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Offset for fixed header
      
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const absoluteTop = top + window.scrollY - 200
          const absoluteBottom = bottom + window.scrollY - 200
          
          if (scrollPosition >= absoluteTop && scrollPosition < absoluteBottom) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100 // Offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <div className="flex w-full flex-col bg-surface-base pb-24">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-surface-dark text-white py-24 md:py-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-purple/50 via-surface-dark to-surface-dark" />
        
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow={t('heroEyebrow')}
              heading={t('heroTitle')}
              subtext={t('heroSubtitle')}
              align="center"
              className="mb-0 text-white"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row lg:gap-16 items-start">
          
          {/* Sticky Sidebar (Desktop) */}
          <aside className="hidden lg:block sticky top-32 w-1/4 shrink-0">
            <h3 className="font-display text-lg font-bold text-text-primary mb-6">
              {t('sidebarTitle')}
            </h3>
            <nav className="flex flex-col space-y-3 border-l-2 border-border">
              {sections.map((section) => (
                <button
                  key={`nav-${section.id}`}
                  onClick={() => scrollTo(section.id)}
                  className={cn(
                    "text-left pl-4 py-1 text-sm font-medium transition-colors focus-visible:outline-none",
                    activeSection === section.id 
                      ? "text-accent-purple border-l-2 border-accent-purple -ml-[2px]" 
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content Area */}
          <div className="w-full lg:w-3/4">
            <AnimatedStaggerGroup className="flex flex-col space-y-16">
              {sections.map((section) => (
                <AnimatedStaggerItem key={section.id}>
                  <div id={section.id} className="scroll-mt-32">
                    <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-6">
                      {section.title}
                    </h2>
                    <div className="prose prose-lg text-text-secondary leading-relaxed max-w-none">
                      <p>{section.content}</p>
                    </div>
                  </div>
                </AnimatedStaggerItem>
              ))}
            </AnimatedStaggerGroup>
          </div>

        </div>
      </section>
    </div>
  )
}
