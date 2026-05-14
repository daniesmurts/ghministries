"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { ExternalLink } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/Modal"

export default function LeadershipPage() {
  const t = useTranslations('LeadershipPage')

  const tier2Leaders = [
    {
      id: "pastorJane",
      name: t('leaders.pastorJane.name'),
      role: t('leaders.pastorJane.role'),
      bio: t('leaders.pastorJane.bio'),
      initials: "JS"
    },
    {
      id: "pastorDavid",
      name: t('leaders.pastorDavid.name'),
      role: t('leaders.pastorDavid.role'),
      bio: t('leaders.pastorDavid.bio'),
      initials: "DI"
    },
    {
      id: "pastorElena",
      name: t('leaders.pastorElena.name'),
      role: t('leaders.pastorElena.role'),
      bio: t('leaders.pastorElena.bio'),
      initials: "EP"
    },
    {
      id: "pastorMarcus",
      name: t('leaders.pastorMarcus.name'),
      role: t('leaders.pastorMarcus.role'),
      bio: t('leaders.pastorMarcus.bio'),
      initials: "MA"
    }
  ]

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
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Tier 1: Apostolic Oversight */}
      <section className="w-full bg-surface-base py-24">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8 lg:px-12">
          <AnimatedSection className="mb-12">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary mb-2">
              {t('tier1Title')}
            </h2>
            <div className="h-1 w-12 bg-accent-purple" />
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Image Placeholder */}
              <div className="aspect-[3/4] w-full rounded-2xl bg-surface-subtle overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-display text-3xl font-bold">{t('leaders.apostleJohn.name')}</h3>
                  <p className="font-semibold text-white/90">{t('leaders.apostleJohn.role')}</p>
                </div>
              </div>
              
              {/* Bio */}
              <div className="flex flex-col space-y-6 pt-4">
                <p className="text-lg text-text-secondary leading-relaxed">
                  {t('leaders.apostleJohn.bio')}
                </p>
                <div className="flex items-center space-x-4 pt-4 border-t border-border">
                  {/* Social placeholders */}
                  <div className="h-10 w-10 rounded-full bg-surface-subtle flex items-center justify-center text-text-tertiary">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tier 2: Executive Team */}
      <section className="w-full bg-surface-subtle py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
          <AnimatedSection className="mb-12">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary mb-2">
              {t('tier2Title')}
            </h2>
            <div className="h-1 w-12 bg-accent-purple" />
          </AnimatedSection>

          <AnimatedStaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tier2Leaders.map((leader, index) => (
              <AnimatedStaggerItem key={index}>
                <Modal>
                  <ModalTrigger asChild>
                    <Card className="group flex h-full flex-col cursor-pointer hover:shadow-elevated hover:-translate-y-1 transition-all overflow-hidden border-transparent">
                      <div className="aspect-square w-full bg-surface-base flex items-center justify-center p-8">
                        <Avatar className="h-32 w-32 border-4 border-surface-elevated shadow-sm">
                          <AvatarFallback className="bg-accent-purple-10 text-accent-purple text-4xl font-bold">
                            {leader.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="p-6 text-center bg-surface-elevated flex-1 flex flex-col justify-center">
                        <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-purple transition-colors">
                          {leader.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-text-tertiary uppercase tracking-wider">
                          {leader.role}
                        </p>
                      </div>
                    </Card>
                  </ModalTrigger>
                  <ModalContent>
                    <ModalHeader>
                      <ModalTitle>{leader.name}</ModalTitle>
                      <ModalDescription className="text-accent-purple font-semibold">
                        {leader.role}
                      </ModalDescription>
                    </ModalHeader>
                    <div className="py-4">
                      <div className="flex items-center justify-center mb-6">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback className="bg-accent-purple-10 text-accent-purple text-3xl font-bold">
                            {leader.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-text-secondary leading-relaxed text-center sm:text-left">
                        {leader.bio}
                      </p>
                    </div>
                  </ModalContent>
                </Modal>
              </AnimatedStaggerItem>
            ))}
          </AnimatedStaggerGroup>
        </div>
      </section>
    </div>
  )
}
