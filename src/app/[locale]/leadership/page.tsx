import * as React from "react"
import { getTranslations } from "next-intl/server"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { leadershipQuery } from "@/sanity/lib/queries"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/Modal"
import { PortableText } from "@/components/ui/PortableText"

export const revalidate = 3600 // Revalidate every hour

export default async function LeadershipPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('LeadershipPage')
  const leaders = await client.fetch(leadershipQuery)

  const tier1Leaders = leaders.filter((l: any) => l.tier === 'global')
  const tier2Leaders = leaders.filter((l: any) => l.tier === 'executive')

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

      {/* Tier 1: Global Apostolic Leadership */}
      {tier1Leaders.length > 0 && (
        <section className="w-full bg-surface-base py-24">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-8 lg:px-12">
            <AnimatedSection className="mb-12">
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary mb-2">
                {t('tier1Title')}
              </h2>
              <div className="h-1 w-12 bg-accent-purple" />
            </AnimatedSection>

            <div className="space-y-24">
              {tier1Leaders.map((leader: any) => (
                <AnimatedSection key={leader._id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Image Container */}
                    <div className="aspect-[3/4] w-full rounded-2xl bg-surface-subtle overflow-hidden relative shadow-lg">
                      {leader.photo ? (
                        <Image
                          src={leader.photo}
                          alt={leader.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-accent-purple-10 text-accent-purple text-6xl font-bold">
                          {leader.name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-8 text-white">
                        <h3 className="font-display text-3xl font-bold leading-tight">{leader.name}</h3>
                        <p className="font-semibold text-white/90 text-lg">{leader.title}</p>
                      </div>
                    </div>
                    
                    {/* Bio */}
                    <div className="flex flex-col space-y-6 pt-4">
                      <div className="prose prose-lg text-text-secondary leading-relaxed">
                        {leader.fullBio ? (
                          <PortableText value={leader.fullBio} />
                        ) : (
                          <p>{leader.shortBio}</p>
                        )}
                      </div>
                      
                      {leader.socialLinks && (
                        <div className="flex items-center space-x-4 pt-6 border-t border-border">
                          {Object.entries(leader.socialLinks).map(([platform, url]: [string, any]) => url && (
                            <a 
                              key={platform}
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="h-10 w-10 rounded-full bg-surface-subtle flex items-center justify-center text-text-tertiary hover:bg-accent-purple-10 hover:text-accent-purple transition-all"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tier 2: Moscow Executive Team */}
      {tier2Leaders.length > 0 && (
        <section className="w-full bg-surface-subtle py-24">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
            <AnimatedSection className="mb-12">
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary mb-2">
                {t('tier2Title')}
              </h2>
              <div className="h-1 w-12 bg-accent-purple" />
            </AnimatedSection>

            <AnimatedStaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tier2Leaders.map((leader: any) => (
                <AnimatedStaggerItem key={leader._id}>
                  <Modal>
                    <ModalTrigger asChild>
                      <Card className="group flex h-full flex-col cursor-pointer hover:shadow-elevated hover:-translate-y-1 transition-all overflow-hidden border-transparent">
                        <div className="aspect-square w-full bg-surface-base relative overflow-hidden">
                          {leader.photo ? (
                            <Image
                              src={leader.photo}
                              alt={leader.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-accent-purple-10 text-accent-purple text-4xl font-bold">
                              {leader.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="p-6 text-center bg-surface-elevated flex-1 flex flex-col justify-center">
                          <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-purple transition-colors">
                            {leader.name}
                          </h3>
                          <p className="mt-1 text-sm font-semibold text-text-tertiary uppercase tracking-wider">
                            {leader.title}
                          </p>
                        </div>
                      </Card>
                    </ModalTrigger>
                    <ModalContent>
                      <ModalHeader>
                        <ModalTitle>{leader.name}</ModalTitle>
                        <ModalDescription className="text-accent-purple font-semibold">
                          {leader.title}
                        </ModalDescription>
                      </ModalHeader>
                      <div className="py-4">
                        <div className="flex items-center justify-center mb-6">
                          <Avatar className="h-24 w-24">
                            {leader.photo ? (
                              <Image
                                src={leader.photo}
                                alt={leader.name}
                                width={96}
                                height={96}
                                className="object-cover"
                              />
                            ) : (
                              <AvatarFallback className="bg-accent-purple-10 text-accent-purple text-3xl font-bold">
                                {leader.name.charAt(0)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        </div>
                        <div className="text-text-secondary leading-relaxed text-center sm:text-left prose prose-sm max-w-none">
                          {leader.fullBio ? (
                            <PortableText value={leader.fullBio} />
                          ) : (
                            <p>{leader.shortBio}</p>
                          )}
                        </div>
                      </div>
                    </ModalContent>
                  </Modal>
                </AnimatedStaggerItem>
              ))}
            </AnimatedStaggerGroup>
          </div>
        </section>
      )}
    </div>
  )
}
