import { HeroSection } from "@/components/home/HeroSection"
import { WelcomeSection } from "@/components/home/WelcomeSection"
import { StatsSection } from "@/components/home/StatsSection"
import { VisionSnapshot } from "@/components/home/VisionSnapshot"
import { ServiceTimes } from "@/components/home/ServiceTimes"
import { LatestSermons } from "@/components/home/LatestSermons"
import { UpcomingEvents } from "@/components/home/UpcomingEvents"
import { MinistriesGrid } from "@/components/home/MinistriesGrid"
import { GlobalTeaser } from "@/components/home/GlobalTeaser"
import { Testimonials } from "@/components/home/Testimonials"
import { Newsletter } from "@/components/home/Newsletter"

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroSection />
      <WelcomeSection />
      <StatsSection />
      <VisionSnapshot />
      <ServiceTimes />
      <LatestSermons />
      <UpcomingEvents />
      <MinistriesGrid />
      <GlobalTeaser />
      <Testimonials />
      <Newsletter />
    </div>
  )
}
