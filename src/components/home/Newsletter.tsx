"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AnimatedSection } from "@/components/ui/AnimatedSection"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useTranslations } from "next-intl"

export function Newsletter() {
  const t = useTranslations('Newsletter')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
  })

  type FormValues = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Form submitted:", data)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <section className="w-full bg-[#6344FF10] py-24">
      <div className="mx-auto w-full max-w-3xl px-6 md:px-8 text-center">
        <AnimatedSection>
          <h2 className="mb-4 font-display text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            {t('heading')}
          </h2>
          <p className="mb-10 text-lg text-text-secondary">
            {t('description')}
          </p>

          {isSuccess ? (
            <div className="rounded-xl bg-white p-8 shadow-sm border border-border">
              <h3 className="text-xl font-bold text-accent-purple mb-2">{t('successTitle')}</h3>
              <p className="text-text-secondary">{t('successDesc')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-full max-w-md flex-col space-y-4 text-left">
              <div>
                <Input
                  placeholder={t('placeholderName')}
                  {...register("name")}
                  error={!!errors.name}
                  className="bg-white"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder={t('placeholderEmail')}
                  {...register("email")}
                  error={!!errors.email}
                  className="bg-white"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                )}
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2" disabled={isSubmitting}>
                {isSubmitting ? t('subscribing') : t('subscribe')}
              </Button>
              
              <p className="text-center text-xs text-text-tertiary mt-4">
                {t('privacy')}
              </p>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  )
}
