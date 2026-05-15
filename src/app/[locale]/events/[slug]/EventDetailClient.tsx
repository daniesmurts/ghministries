"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Calendar as CalendarIcon, MapPin, Clock, ArrowLeft, Users, CheckCircle2 } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { PortableText } from "@/components/ui/PortableText"
import { SanityEvent } from "@/types/sanity"

export default function EventDetailClient({ event }: { event: SanityEvent }) {
  const t = useTranslations('EventsPage')
  
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    guests: z.number().min(1).max(10),
  })

  type FormValues = z.infer<typeof formSchema>

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { guests: 1 }
  })

  if (!event) {
    return (
      <div className="flex w-full flex-col items-center justify-center min-h-[60vh] bg-surface-base">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Event Not Found</h1>
        <Button variant="secondary" asChild>
          <Link href="/events">Back to Events</Link>
        </Button>
      </div>
    )
  }

  const startDate = new Date(event.startDateTime)
  const endDate = event.endDateTime ? new Date(event.endDateTime) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
  
  const dateStr = startDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const timeStr = `${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

  const getLocationString = (location: any) => {
    if (!location) return 'Moscow HQ';
    if (typeof location === 'string') return location;
    if (location.isOnline) return 'Online Event';
    return location.venueName || location.city || location.address || 'Moscow HQ';
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Submitted registration for", event.title, data)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <div className="flex w-full flex-col pb-24 bg-surface-subtle min-h-screen">
      
      {/* Hero Image Section */}
      <section className={cn("relative w-full h-[40vh] min-h-[400px] flex items-end pb-12 bg-surface-dark")} style={event.coverImage ? { backgroundImage: `url(${event.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="mx-auto w-full max-w-5xl px-6 md:px-8 relative z-10 text-white">
          <Link href="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Link>
          <AnimatedSection>
            <Badge variant="orange" className="mb-4">{event.type || 'Event'}</Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {event.title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-5xl px-6 md:px-8 -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Details */}
          <div className="flex-1 space-y-8">
            <AnimatedSection className="bg-surface-elevated rounded-2xl p-8 shadow-elevated border border-border">
              <h2 className="font-display text-2xl font-bold text-text-primary mb-6 pb-4 border-b border-border">
                {t('detail.about')}
              </h2>
              <div className="text-lg text-text-secondary leading-relaxed mb-8 whitespace-pre-wrap">
                {event.description ? (
                  Array.isArray(event.description) ? (
                    <PortableText value={event.description} />
                  ) : typeof event.description === 'string' ? (
                    event.description
                  ) : (
                    <PortableText value={[event.description]} />
                  )
                ) : event.body ? (
                  Array.isArray(event.body) ? (
                    <PortableText value={event.body} />
                  ) : (
                    <PortableText value={[event.body]} />
                  )
                ) : (
                  'Join us for this upcoming event.'
                )}
              </div>

              {event.speakers && event.speakers.length > 0 && (
                <>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-4">{t('detail.speakers')}</h3>
                  <ul className="list-disc pl-5 text-text-secondary space-y-2 mb-8">
                    {event.speakers.map((speaker: { name: string; title?: string }, idx: number) => (
                      <li key={idx}>{speaker.name} {speaker.title ? `- ${speaker.title}` : ''}</li>
                    ))}
                  </ul>
                </>
              )}
              
              <h3 className="font-display text-xl font-bold text-text-primary mb-4">{t('detail.location')}</h3>
              {/* Map Placeholder */}
              <div className="w-full h-48 bg-surface-subtle rounded-xl border border-border flex items-center justify-center text-text-tertiary relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple to-transparent" />
                <div className="relative z-10 flex flex-col items-center">
                  <MapPin className="h-8 w-8 mb-2" />
                  <span>{getLocationString(event.location)}</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Registration Sidebar */}
          <div className="w-full lg:w-[400px] shrink-0">
            <AnimatedSection delay={0.1}>
              {/* Quick Info Card */}
              <Card className="p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 mr-3 text-accent-purple shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-text-primary">{dateStr}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-accent-purple shrink-0 mt-0.5" />
                    <div className="font-bold text-text-primary">{timeStr}</div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-accent-purple shrink-0 mt-0.5" />
                    <div className="font-bold text-text-primary">{getLocationString(event.location)}</div>
                  </div>
                </div>
              </Card>

              {/* Registration Form Card */}
              <Card className="p-6">
                <h3 className="font-display text-2xl font-bold text-text-primary mb-6">
                  {t('detail.registrationForm')}
                </h3>
                
                {isSuccess ? (
                  <div className="rounded-xl bg-success/10 p-6 border border-success/20 text-center">
                    <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
                    <h4 className="font-bold text-lg text-text-primary mb-2">Success!</h4>
                    <p className="text-sm font-medium text-text-secondary">{t('detail.success')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1 block">{t('detail.nameLabel')}</label>
                      <Input placeholder="John Doe" {...register("name")} error={!!errors.name} />
                      {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1 block">{t('detail.emailLabel')}</label>
                      <Input type="email" placeholder="john@example.com" {...register("email")} error={!!errors.email} />
                      {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-1 block">{t('detail.guestsLabel')}</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
                        <Input 
                          type="number" 
                          min="1" 
                          max="10" 
                          className="pl-10" 
                          {...register("guests", { valueAsNumber: true })} 
                          error={!!errors.guests} 
                        />
                      </div>
                      {errors.guests && <p className="mt-1 text-xs text-error">{errors.guests.message}</p>}
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" variant="primary" className="w-full bg-accent-orange hover:bg-[#e55317]" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? t('detail.submitting') : t('detail.submit')}
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </AnimatedSection>
          </div>

        </div>
      </section>
    </div>
  )
}
