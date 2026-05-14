"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { AnimatedSection } from "@/components/ui/AnimatedSection"

const testimonials = [
  {
    name: "David Ivanov",
    location: "Moscow, Russia",
    quote: "Finding this community changed my life. I learned what it truly means to live a Spirit-led life in my workplace.",
    initials: "DI",
  },
  {
    name: "Sarah Chen",
    location: "London, UK",
    quote: "Even from afar, the teaching and vision of this movement have equipped me to start a home group in my city.",
    initials: "SC",
  },
  {
    name: "Marcus Adebayo",
    location: "Lagos, Nigeria",
    quote: "The emphasis on Kingdom-mindedness shifted my entire perspective on ministry and business.",
    initials: "MA",
  },
  {
    name: "Elena Popova",
    location: "St. Petersburg, Russia",
    quote: "I've never experienced such authentic worship and profound biblical teaching in one place.",
    initials: "EP",
  },
  {
    name: "James Wilson",
    location: "New York, USA",
    quote: "This is more than a church; it's a global family united by a singular, powerful mission.",
    initials: "JW",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <section className="w-full bg-surface-subtle py-24 md:py-32">
      <div className="mx-auto w-full max-w-4xl px-6 md:px-8 text-center">
        <AnimatedSection className="flex flex-col items-center">
          <Quote className="mb-8 h-12 w-12 text-accent-purple opacity-50" fill="currentColor" />
          
          <div 
            className="relative min-h-[250px] w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center"
              >
                <p className="font-display text-2xl md:text-3xl font-light text-text-primary leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarFallback className="bg-surface-elevated text-accent-purple font-semibold">
                      {testimonials[currentIndex].initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-bold text-text-primary">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-text-secondary">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-12 flex space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-accent-purple" : "w-2 bg-border hover:bg-text-tertiary"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
