"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { HeartHandshake, MessageCircleQuestion, Quote } from "lucide-react"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

type RequestType = "prayer" | "question" | "testimony"

export default function PrayerPage() {
  const t = useTranslations('PrayerPage')
  const [requestType, setRequestType] = React.useState<RequestType>("prayer")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isPrivate, setIsPrivate] = React.useState(true)

  const formSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Please enter a valid email address").or(z.literal("")),
    message: z.string().min(10, "Message must be at least 10 characters long"),
  }).refine(data => {
    // Require email if it's a question so we can reply
    if (requestType === "question" && (!data.email || data.email === "")) {
      return false
    }
    return true
  }, {
    message: "Email is required so we can respond to your question",
    path: ["email"]
  })

  type FormValues = z.infer<typeof formSchema>

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    // Simulate API call to Resend endpoint
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Submitted payload:", { type: requestType, isPrivate, ...data })
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  // Handle type switch to reset form success state
  const handleTypeChange = (type: RequestType) => {
    setRequestType(type)
    if (isSuccess) {
      setIsSuccess(false)
      reset()
    }
  }

  const getTypeSpecifics = () => {
    switch (requestType) {
      case "prayer":
        return {
          messageLabel: t('form.messageLabelPrayer'),
          submitBtn: t('form.submitPrayer'),
          successMsg: t('form.successPrayer')
        }
      case "question":
        return {
          messageLabel: t('form.messageLabelQuestion'),
          submitBtn: t('form.submitQuestion'),
          successMsg: t('form.successQuestion')
        }
      case "testimony":
        return {
          messageLabel: t('form.messageLabelTestimony'),
          submitBtn: t('form.submitTestimony'),
          successMsg: t('form.successTestimony')
        }
    }
  }

  const { messageLabel, submitBtn, successMsg } = getTypeSpecifics()

  return (
    <div className="flex w-full flex-col pb-24 bg-surface-subtle">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-surface-dark py-24 md:py-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-purple/50 via-surface-dark to-surface-dark" />
        
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center text-white">
          <AnimatedSection>
            <SectionHeader
              eyebrow={t('heroEyebrow')}
              heading={t('heroTitle')}
              subtext={t('heroSubtitle')}
              align="center"
              className="text-white"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-3xl px-6 md:px-8 py-16 -mt-16 relative z-20">
        <AnimatedSection className="bg-surface-elevated rounded-2xl shadow-elevated overflow-hidden border border-border">
          
          {/* Path Selector Tabs */}
          <div className="flex flex-col sm:flex-row border-b border-border bg-surface-base">
            <button
              onClick={() => handleTypeChange("prayer")}
              className={cn(
                "flex-1 flex items-center justify-center py-6 font-semibold transition-colors focus-visible:outline-none relative",
                requestType === "prayer" ? "text-accent-purple bg-surface-elevated" : "text-text-secondary hover:text-text-primary hover:bg-surface-subtle"
              )}
            >
              <HeartHandshake className="mr-2 h-5 w-5" />
              {t('form.typePrayer')}
              {requestType === "prayer" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-purple" />
              )}
            </button>
            <button
              onClick={() => handleTypeChange("question")}
              className={cn(
                "flex-1 flex items-center justify-center py-6 font-semibold transition-colors focus-visible:outline-none relative",
                requestType === "question" ? "text-accent-purple bg-surface-elevated" : "text-text-secondary hover:text-text-primary hover:bg-surface-subtle"
              )}
            >
              <MessageCircleQuestion className="mr-2 h-5 w-5" />
              {t('form.typeQuestion')}
              {requestType === "question" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-purple" />
              )}
            </button>
            <button
              onClick={() => handleTypeChange("testimony")}
              className={cn(
                "flex-1 flex items-center justify-center py-6 font-semibold transition-colors focus-visible:outline-none relative",
                requestType === "testimony" ? "text-accent-purple bg-surface-elevated" : "text-text-secondary hover:text-text-primary hover:bg-surface-subtle"
              )}
            >
              <Quote className="mr-2 h-5 w-5" />
              {t('form.typeTestimony')}
              {requestType === "testimony" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-purple" />
              )}
            </button>
          </div>

          <div className="p-8 md:p-12">
            {isSuccess ? (
              <AnimatedSection className="text-center py-12">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-purple-10 text-accent-purple mb-6">
                  <HeartHandshake className="h-10 w-10" />
                </div>
                <h3 className="font-display text-3xl font-bold text-text-primary mb-4">{t('form.successTitle')}</h3>
                <p className="text-lg text-text-secondary max-w-md mx-auto italic leading-relaxed">
                  {successMsg}
                </p>
                <Button 
                  variant="ghost" 
                  className="mt-8"
                  onClick={() => { setIsSuccess(false); reset(); }}
                >
                  Send another message
                </Button>
              </AnimatedSection>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-primary">{t('form.nameLabel')}</label>
                    <Input 
                      placeholder={t('form.namePlaceholder')} 
                      {...register("name")} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-primary">
                      {t('form.emailLabel')} 
                      {requestType === "question" && <span className="text-error ml-1">*</span>}
                    </label>
                    <Input 
                      type="email" 
                      placeholder={t('form.emailPlaceholder')} 
                      {...register("email")} 
                      error={!!errors.email}
                    />
                    {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary">
                    {messageLabel} <span className="text-error">*</span>
                  </label>
                  <textarea 
                    placeholder={t('form.messagePlaceholder')}
                    {...register("message")}
                    className={cn(
                      "flex min-h-[160px] w-full rounded-md border bg-surface-base px-3 py-3 text-sm transition-colors placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple",
                      errors.message ? "border-error focus-visible:ring-error" : "border-border"
                    )}
                  />
                  {errors.message && <p className="text-xs text-error mt-1">{errors.message.message}</p>}
                </div>

                {(requestType === "prayer" || requestType === "testimony") && (
                  <div className="flex items-start space-x-3 pt-4 border-t border-border">
                    <div className="flex h-6 items-center">
                      <input
                        id="privacy-toggle"
                        type="checkbox"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                        className="h-4 w-4 rounded border-border text-accent-purple focus:ring-accent-purple"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="privacy-toggle" className="text-sm font-semibold text-text-primary cursor-pointer">
                        {t('form.privacyLabel')}
                      </label>
                      <p className="text-xs text-text-tertiary">{t('form.privacyDesc')}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t('form.submitting') : submitBtn}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
