"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { ArrowLeft, MapPin, Calendar, Globe, Clock, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Link } from "@/i18n/routing"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"

export default function HomeGroupDetailPage({ params }: { params: { slug: string } }) {
  const t = useTranslations('HomeGroupsPage.detail')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().optional(),
    message: z.string().optional(),
  })

  type FormValues = z.infer<typeof formSchema>

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  // Mock data for this page based on slug
  const group = {
    name: "City Center Young Adults",
    day: "Thursday",
    time: "19:00",
    area: "Tverskoy District, Moscow",
    language: "Russian",
    leader: "Alexey Volkov",
    description: "A vibrant community of young professionals and university students meeting weekly in the heart of Moscow. We focus on applying Kingdom principles to our careers, studies, and relationships.",
    leaderBio: "Alexey has been leading home groups for 5 years. He works as a software engineer and has a passion for discipleship and seeing young adults thrive in their God-given purpose."
  }

  return (
    <div className="flex w-full flex-col bg-surface-base pb-24">
      {/* Header */}
      <div className="w-full bg-surface-subtle pt-32 pb-16 border-b border-border">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-8">
          <Link href="/home-groups" className="inline-flex items-center text-sm font-semibold text-accent-purple hover:underline underline-offset-4 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('back')}
          </Link>
          <AnimatedSection>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
              {group.name}
            </h1>
          </AnimatedSection>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 md:px-8 py-16 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="w-full lg:w-2/3 space-y-12">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-4">{t('aboutGroup')}</h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {group.description}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-text-primary mb-6">{t('aboutLeader')}</h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-surface-subtle p-6 rounded-2xl">
              <Avatar className="h-20 w-20 border-2 border-surface-elevated shadow-sm shrink-0">
                <AvatarFallback className="bg-accent-purple-10 text-accent-purple text-2xl font-bold">
                  {group.leader.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-text-primary text-lg">{group.leader}</h3>
                <p className="text-text-secondary mt-2">{group.leaderBio}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="bg-surface-dark text-white rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold mb-2">{t('joinForm.title')}</h2>
            <p className="text-text-tertiary mb-8">{t('joinForm.description')}</p>
            
            {isSuccess ? (
              <div className="rounded-xl bg-white/10 p-6 border border-white/20">
                <p className="font-semibold text-white">{t('joinForm.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input placeholder={t('joinForm.name')} {...register("name")} error={!!errors.name} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
                    {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Input placeholder={t('joinForm.email')} {...register("email")} error={!!errors.email} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
                    {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
                  </div>
                </div>
                <Input placeholder={t('joinForm.phone')} {...register("phone")} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
                <textarea 
                  placeholder={t('joinForm.message')} 
                  {...register("message")}
                  className="flex min-h-[100px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
                />
                <Button type="submit" variant="primary" className="w-full bg-accent-orange hover:bg-[#e55317]" disabled={isSubmitting}>
                  {isSubmitting ? t('joinForm.submitting') : t('joinForm.submit')}
                </Button>
              </form>
            )}
          </AnimatedSection>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <AnimatedSection className="sticky top-32 rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
            <h3 className="font-display text-xl font-bold text-text-primary mb-6">{t('meetingDetails')}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-accent-purple shrink-0 mt-0.5" />
                <div className="ml-4">
                  <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">{t('day')}</p>
                  <p className="font-medium text-text-primary">{group.day}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-accent-purple shrink-0 mt-0.5" />
                <div className="ml-4">
                  <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">{t('time')}</p>
                  <p className="font-medium text-text-primary">{group.time}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-accent-purple shrink-0 mt-0.5" />
                <div className="ml-4">
                  <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">{t('location')}</p>
                  <p className="font-medium text-text-primary">{group.area}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Globe className="h-5 w-5 text-accent-purple shrink-0 mt-0.5" />
                <div className="ml-4">
                  <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">{t('language')}</p>
                  <p className="font-medium text-text-primary">{group.language}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 aspect-video w-full rounded-xl bg-surface-subtle flex items-center justify-center border border-border">
              <p className="text-sm text-text-tertiary font-medium">Map View</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
