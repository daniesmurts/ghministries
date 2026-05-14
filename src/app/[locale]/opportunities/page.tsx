"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Briefcase, MapPin, Building, Globe, CheckCircle2 } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/Modal"
import { cn } from "@/lib/utils"

// Mock Data
const MOCK_OPPORTUNITIES = [
  {
    id: "j1",
    title: "Creative Director",
    department: "Media & Comms",
    type: "jobs",
    commitment: "fullTime",
    location: "Moscow, RU",
    remote: false,
    description: "Lead the creative vision across all our platforms. You will oversee the design, video, and social media teams to ensure a consistent, excellent, and Spirit-led brand presence.",
    requirements: [
      "5+ years in creative leadership",
      "Expertise in Adobe Creative Suite and Figma",
      "Strong portfolio demonstrating brand development",
      "Alignment with Great Harvest Ministries vision and values"
    ]
  },
  {
    id: "j2",
    title: "Campus Pastor (Church Plant)",
    department: "Leadership",
    type: "jobs",
    commitment: "fullTime",
    location: "St. Petersburg, RU",
    remote: false,
    description: "We are planting a new campus and need a dynamic, faith-filled leader to pioneer this work. You will build core teams, lead services, and provide pastoral care.",
    requirements: [
      "Proven pastoral and leadership experience",
      "Theological training or equivalent experience",
      "Ability to build and mobilize volunteer teams",
      "Willingness to relocate to St. Petersburg"
    ]
  },
  {
    id: "i1",
    title: "Production Intern",
    department: "Production",
    type: "internships",
    commitment: "partTime",
    location: "Moscow, RU",
    remote: false,
    description: "Join our summer intensive internship. Learn live audio engineering, broadcast video, and lighting design from our expert production team.",
    requirements: [
      "Available June-August for 20 hrs/week",
      "Basic understanding of A/V equipment",
      "Teachable attitude and strong work ethic"
    ]
  },
  {
    id: "a1",
    title: "Worship Leader Apprentice",
    department: "Worship",
    type: "apprenticeships",
    commitment: "partTime",
    location: "Moscow, RU",
    remote: false,
    description: "A 1-year developmental track for aspiring worship leaders. You will be mentored by our core team, lead in youth/young adults, and learn set planning.",
    requirements: [
      "Strong vocal and instrumental abilities",
      "Previous experience serving on a worship team",
      "Commitment to personal spiritual growth"
    ]
  },
  {
    id: "j3",
    title: "Digital Ministry Coordinator",
    department: "Media & Comms",
    type: "jobs",
    commitment: "fullTime",
    location: "Anywhere",
    remote: true,
    description: "Manage our online community, respond to prayer requests, and help coordinate our global digital church campus.",
    requirements: [
      "Excellent written communication skills (EN/RU)",
      "Experience with community management tools",
      "Pastoral heart for digital congregants"
    ]
  }
]

export default function OpportunitiesPage() {
  const t = useTranslations('OpportunitiesPage')
  
  const [activeTab, setActiveTab] = React.useState<"jobs" | "internships" | "apprenticeships">("jobs")
  const [selectedRole, setSelectedRole] = React.useState<typeof MOCK_OPPORTUNITIES[0] | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const filteredRoles = MOCK_OPPORTUNITIES.filter(role => role.type === activeTab)

  const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(5, "Phone number is required"),
    portfolio: z.string().optional(),
    message: z.string().min(20, "Please provide a brief cover letter (min 20 characters)"),
  })

  type FormValues = z.infer<typeof formSchema>

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Submitted application for", selectedRole?.title, data)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  // Handle modal close
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setIsSuccess(false)
        setSelectedRole(null)
        reset()
      }, 300)
    }
  }

  return (
    <div className="flex w-full flex-col pb-24 bg-surface-subtle">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow={t('heroEyebrow')}
              heading={t('heroTitle')}
              subtext={t('heroSubtitle')}
              align="center"
              className="mb-8"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-5xl px-6 md:px-8 py-8 relative z-10">
        <AnimatedSection className="bg-surface-elevated rounded-2xl shadow-elevated overflow-hidden border border-border">
          
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row border-b border-border bg-surface-base">
            {(["jobs", "internships", "apprenticeships"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-6 font-semibold transition-colors focus-visible:outline-none relative",
                  activeTab === tab 
                    ? "text-accent-purple bg-surface-elevated" 
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-subtle"
                )}
              >
                {t(`tabs.${tab}`)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-purple" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-10">
            <AnimatedStaggerGroup className="flex flex-col space-y-4">
              {filteredRoles.map((role) => (
                <AnimatedStaggerItem key={role.id}>
                  <Modal onOpenChange={handleOpenChange}>
                    <ModalTrigger asChild>
                      <Card hoverLift className="p-6 flex flex-col md:flex-row md:items-center justify-between cursor-pointer border-transparent hover:border-accent-purple transition-all duration-300">
                        <div className="flex-1 mb-4 md:mb-0">
                          <h3 className="font-display text-xl font-bold text-text-primary mb-2 group-hover:text-accent-purple">
                            {role.title}
                          </h3>
                          <div className="flex flex-wrap items-center text-sm text-text-secondary gap-y-2">
                            <span className="flex items-center mr-4">
                              <Building className="mr-1.5 h-4 w-4" />
                              {role.department}
                            </span>
                            <span className="flex items-center mr-4">
                              <MapPin className="mr-1.5 h-4 w-4" />
                              {role.location}
                            </span>
                            {role.remote && (
                              <span className="flex items-center text-accent-purple font-medium">
                                <Globe className="mr-1.5 h-4 w-4" />
                                {t('card.remote')}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="neutral" className="bg-surface-base">
                            {t(`card.${role.commitment}`)}
                          </Badge>
                          <Button variant="secondary" size="sm" onClick={() => setSelectedRole(role)}>
                            View
                          </Button>
                        </div>
                      </Card>
                    </ModalTrigger>
                    
                    <ModalContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <ModalHeader>
                        <Badge variant="purple" className="w-fit mb-2">{role.department}</Badge>
                        <ModalTitle className="text-2xl">{role.title}</ModalTitle>
                        <div className="flex flex-wrap items-center text-sm text-text-secondary pt-2 gap-4">
                          <span className="flex items-center"><MapPin className="mr-1.5 h-4 w-4" />{role.location}</span>
                          <span className="flex items-center"><Briefcase className="mr-1.5 h-4 w-4" />{t(`card.${role.commitment}`)}</span>
                          {role.remote && <span className="flex items-center text-accent-purple font-medium"><Globe className="mr-1.5 h-4 w-4" />{t('card.remote')}</span>}
                        </div>
                      </ModalHeader>
                      
                      <div className="py-6 space-y-8">
                        {isSuccess ? (
                          <div className="rounded-xl bg-success/10 p-8 border border-success/20 text-center my-8">
                            <div className="h-16 w-16 bg-success text-white rounded-full flex items-center justify-center mx-auto mb-4">
                              <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-2xl text-text-primary mb-2">Application Received!</h3>
                            <p className="font-medium text-text-secondary text-lg">Thank you for applying. Our HR team will review your application and contact you soon.</p>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-display text-lg font-bold text-text-primary mb-3">{t('modal.description')}</h4>
                                <p className="text-text-secondary leading-relaxed">{role.description}</p>
                              </div>
                              <div>
                                <h4 className="font-display text-lg font-bold text-text-primary mb-3">{t('modal.requirements')}</h4>
                                <ul className="list-disc pl-5 text-text-secondary space-y-2">
                                  {role.requirements.map((req, i) => (
                                    <li key={i}>{req}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="pt-8 border-t border-border">
                              <h4 className="font-display text-xl font-bold text-text-primary mb-6">{t('modal.apply')}</h4>
                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-semibold text-text-primary mb-1 block">Full Name</label>
                                    <Input placeholder="John Doe" {...register("name")} error={!!errors.name} />
                                    {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
                                  </div>
                                  <div>
                                    <label className="text-sm font-semibold text-text-primary mb-1 block">Email Address</label>
                                    <Input type="email" placeholder="john@example.com" {...register("email")} error={!!errors.email} />
                                    {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-semibold text-text-primary mb-1 block">Phone Number</label>
                                    <Input placeholder="+7 (999) 000-00-00" {...register("phone")} error={!!errors.phone} />
                                    {errors.phone && <p className="mt-1 text-xs text-error">{errors.phone.message}</p>}
                                  </div>
                                  <div>
                                    <label className="text-sm font-semibold text-text-primary mb-1 block">Portfolio / LinkedIn URL (Optional)</label>
                                    <Input placeholder="https://..." {...register("portfolio")} />
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-semibold text-text-primary mb-1 block">Cover Letter</label>
                                  <textarea 
                                    placeholder="Tell us why you're a great fit for this role..." 
                                    {...register("message")}
                                    className={cn(
                                      "flex min-h-[120px] w-full rounded-md border bg-surface-base px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple",
                                      errors.message ? "border-error focus-visible:ring-error" : "border-border"
                                    )}
                                  />
                                  {errors.message && <p className="mt-1 text-xs text-error">{errors.message.message}</p>}
                                </div>
                                
                                <div className="pt-4">
                                  <Button type="submit" variant="primary" size="lg" className="w-full bg-accent-orange hover:bg-[#e55317]" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Application"}
                                  </Button>
                                </div>
                              </form>
                            </div>
                          </>
                        )}
                      </div>
                    </ModalContent>
                  </Modal>
                </AnimatedStaggerItem>
              ))}

              {filteredRoles.length === 0 && (
                <div className="py-12 text-center text-text-tertiary">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No open positions in this category at the moment.</p>
                </div>
              )}
            </AnimatedStaggerGroup>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
