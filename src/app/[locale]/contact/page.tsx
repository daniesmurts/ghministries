"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MapPin, Phone, Mail, Camera, Video, Send, CheckCircle2 } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export default function ContactPage() {
  const t = useTranslations('ContactPage')
  
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    subject: z.string().min(1, "Please select a subject"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  })

  type FormValues = z.infer<typeof formSchema>

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (res.ok) {
        setIsSuccess(true)
        reset()
      } else {
        console.error("Failed to submit form")
      }
    } catch (error) {
      console.error("Error submitting form", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex w-full flex-col pb-24 bg-surface-base">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 md:py-32 bg-surface-subtle">
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
      <section className="mx-auto w-full max-w-6xl px-6 md:px-8 py-16 -mt-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Info & Map */}
          <div className="w-full lg:w-5/12 space-y-8">
            <AnimatedSection>
              <Card className="p-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-accent-purple" />
                      {t('info.address')}
                    </h3>
                    <p className="text-text-secondary pl-7">{t('info.addressLine')}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-4 flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-accent-purple" />
                      Call Us
                    </h3>
                    <p className="text-text-secondary pl-7">{t('info.phone')}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl font-bold text-text-primary mb-4 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-accent-purple" />
                      Email Us
                    </h3>
                    <p className="text-text-secondary pl-7">{t('info.email')}</p>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <h3 className="font-display text-sm font-bold text-text-tertiary mb-4 uppercase tracking-wider">
                      Follow Us
                    </h3>
                    <div className="flex space-x-4 pl-1">
                      <a href="#" className="h-10 w-10 rounded-full bg-surface-subtle flex items-center justify-center text-text-secondary hover:bg-accent-purple hover:text-white transition-colors">
                        <Camera className="h-5 w-5" />
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-surface-subtle flex items-center justify-center text-text-secondary hover:bg-accent-purple hover:text-white transition-colors">
                        <Video className="h-5 w-5" />
                      </a>
                      {/* Telegram Icon (using Send as fallback) */}
                      <a href="#" className="h-10 w-10 rounded-full bg-surface-subtle flex items-center justify-center text-text-secondary hover:bg-accent-purple hover:text-white transition-colors">
                        <Send className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* Simple Static Map Placeholder */}
            <AnimatedSection delay={0.1}>
              <div className="w-full h-[300px] rounded-2xl border border-border bg-surface-subtle flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple to-transparent transition-opacity group-hover:opacity-40" />
                <MapPin className="h-12 w-12 text-accent-purple relative z-10" />
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full lg:w-7/12">
            <AnimatedSection delay={0.2} className="h-full">
              <Card className="p-8 md:p-10 h-full flex flex-col">
                <h2 className="font-display text-3xl font-bold text-text-primary mb-8">
                  {t('form.title')}
                </h2>
                
                {isSuccess ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-20 w-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="font-bold text-2xl text-text-primary mb-3">Message Sent</h3>
                    <p className="text-text-secondary max-w-sm">{t('form.success')}</p>
                    <Button 
                      variant="ghost" 
                      className="mt-8"
                      onClick={() => setIsSuccess(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-1 flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-semibold text-text-primary mb-2 block">{t('form.nameLabel')}</label>
                        <Input placeholder="John Doe" {...register("name")} error={!!errors.name} />
                        {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-text-primary mb-2 block">{t('form.emailLabel')}</label>
                        <Input type="email" placeholder="john@example.com" {...register("email")} error={!!errors.email} />
                        {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-text-primary mb-2 block">{t('form.subjectLabel')}</label>
                      <select 
                        {...register("subject")}
                        className={cn(
                          "flex h-12 w-full rounded-lg border bg-surface-base px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple",
                          errors.subject ? "border-error focus-visible:ring-error" : "border-border"
                        )}
                      >
                        <option value="">Select a subject...</option>
                        <option value="general">{t('form.subjects.general')}</option>
                        <option value="prayer">{t('form.subjects.prayer')}</option>
                        <option value="partnership">{t('form.subjects.partnership')}</option>
                        <option value="other">{t('form.subjects.other')}</option>
                      </select>
                      {errors.subject && <p className="mt-1 text-xs text-error">{errors.subject.message}</p>}
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-text-primary mb-2 block">{t('form.messageLabel')}</label>
                      <textarea 
                        placeholder="How can we help?" 
                        {...register("message")}
                        className={cn(
                          "flex h-full min-h-[200px] w-full rounded-lg border bg-surface-base px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple resize-none",
                          errors.message ? "border-error focus-visible:ring-error" : "border-border"
                        )}
                      />
                      {errors.message && <p className="mt-1 text-xs text-error">{errors.message.message}</p>}
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" variant="primary" size="lg" className="w-full bg-accent-orange hover:bg-[#e55317] h-14 text-lg" disabled={isSubmitting}>
                        {isSubmitting ? t('form.submitting') : t('form.submit')}
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
