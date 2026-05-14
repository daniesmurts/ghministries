"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Users, Clock, Lightbulb, MapPin, Search } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/Modal"
import { cn } from "@/lib/utils"

// Mock Data
const MOCK_ROLES = [
  {
    id: "v1",
    title: "Welcome Team Greeter",
    department: "Guest Experience",
    commitment: "2 hours/week",
    skills: ["Friendly", "Outgoing", "Punctual"],
    description: "Be the first face people see when they arrive. Welcome guests, help them navigate the building, and make everyone feel at home."
  },
  {
    id: "v2",
    title: "Kids Ministry Teacher",
    department: "Great Harvest Kids",
    commitment: "3 hours/week",
    skills: ["Teaching", "Patience", "Background Check Required"],
    description: "Lead small groups of children, teach Bible lessons using provided curriculum, and facilitate activities."
  },
  {
    id: "v3",
    title: "Camera Operator",
    department: "Production",
    commitment: "4 hours/week",
    skills: ["Technical", "Attentive", "Willing to learn"],
    description: "Operate broadcast cameras during Sunday services. No prior experience required, full training provided."
  },
  {
    id: "v4",
    title: "Community Outreach Lead",
    department: "Missions",
    commitment: "Variable",
    skills: ["Leadership", "Organization", "Compassion"],
    description: "Help organize and lead our monthly city outreach initiatives, coordinating volunteers and supplies."
  },
  {
    id: "v5",
    title: "Worship Team Vocalist",
    department: "Worship",
    commitment: "5 hours/week",
    skills: ["Singing", "Pitch accuracy", "Audition Required"],
    description: "Lead the congregation in worship during weekend services. Midweek rehearsal required."
  },
  {
    id: "v6",
    title: "Data Entry Specialist",
    department: "Administration",
    commitment: "2 hours/week",
    skills: ["Detail-oriented", "Computer literacy", "Reliable"],
    description: "Assist our administrative team with weekly data entry and record keeping. Can be done remotely."
  }
]

export default function VolunteeringPage() {
  const t = useTranslations('VolunteeringPage')
  
  const [filterArea, setFilterArea] = React.useState("All")
  const [filterCommitment, setFilterCommitment] = React.useState("All")
  const [selectedRole, setSelectedRole] = React.useState<typeof MOCK_ROLES[0] | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  // Extract unique filters
  const areas = ["All", ...Array.from(new Set(MOCK_ROLES.map((r) => r.department)))]
  const commitments = ["All", ...Array.from(new Set(MOCK_ROLES.map((r) => r.commitment)))]

  const filteredRoles = MOCK_ROLES.filter((role) => {
    const matchesArea = filterArea === "All" || role.department === filterArea
    const matchesCommitment = filterCommitment === "All" || role.commitment === filterCommitment
    return matchesArea && matchesCommitment
  })

  const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(5, "Phone number is required"),
    availability: z.string().min(1, "Please select availability"),
    message: z.string().min(10, "Please provide a brief reason"),
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
      // Reset state when closing modal
      setTimeout(() => {
        setIsSuccess(false)
        setSelectedRole(null)
        reset()
      }, 300)
    }
  }

  return (
    <div className="flex w-full flex-col pb-24 bg-surface-base">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-surface-subtle py-24 md:py-32">
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
      <section className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12 py-16">
        
        {/* Filters */}
        <AnimatedSection className="mb-12 flex flex-col sm:flex-row gap-4">
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="h-11 rounded-md border border-border bg-surface-elevated px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple min-w-[200px]"
          >
            <option value="All">{t('filters.allAreas')}</option>
            {areas.filter(a => a !== "All").map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
          
          <select
            value={filterCommitment}
            onChange={(e) => setFilterCommitment(e.target.value)}
            className="h-11 rounded-md border border-border bg-surface-elevated px-4 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple min-w-[200px]"
          >
            <option value="All">{t('filters.allCommitments')}</option>
            {commitments.filter(c => c !== "All").map(commitment => (
              <option key={commitment} value={commitment}>{commitment}</option>
            ))}
          </select>
        </AnimatedSection>

        {/* Roles Grid */}
        <AnimatedStaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <AnimatedStaggerItem key={role.id}>
              <Card className="flex h-full flex-col p-6 hover:shadow-md transition-shadow">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <Badge variant="neutral" className="mb-3">{role.department}</Badge>
                    <h3 className="font-display text-xl font-bold text-text-primary line-clamp-2">
                      {role.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary line-clamp-3 mb-6 flex-1">
                  {role.description}
                </p>
                
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center text-sm text-text-secondary">
                    <Clock className="mr-2 h-4 w-4 text-accent-purple shrink-0" />
                    <span>{role.commitment}</span>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-xs font-semibold text-text-tertiary mb-2 uppercase tracking-wider">
                      <Lightbulb className="mr-2 h-3 w-3" />
                      {t('card.skills')}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-surface-subtle text-text-secondary text-xs rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Modal onOpenChange={handleOpenChange}>
                    <ModalTrigger asChild>
                      <Button 
                        variant="secondary" 
                        className="w-full mt-4"
                        onClick={() => setSelectedRole(role)}
                      >
                        {t('card.apply')}
                      </Button>
                    </ModalTrigger>
                    <ModalContent className="max-w-2xl">
                      <ModalHeader>
                        <Badge variant="purple" className="w-fit mb-2">{role.department}</Badge>
                        <ModalTitle>{role.title}</ModalTitle>
                        <ModalDescription>
                          {t('form.description')}
                        </ModalDescription>
                      </ModalHeader>
                      
                      <div className="py-6">
                        {isSuccess ? (
                          <div className="rounded-xl bg-success/10 p-8 border border-success/20 text-center">
                            <div className="h-12 w-12 bg-success text-white rounded-full flex items-center justify-center mx-auto mb-4">
                              <Users className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-xl text-text-primary mb-2">Success!</h3>
                            <p className="font-medium text-text-secondary">{t('form.success')}</p>
                          </div>
                        ) : (
                          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-semibold text-text-primary mb-1 block">{t('form.nameLabel')}</label>
                                <Input placeholder="John Doe" {...register("name")} error={!!errors.name} />
                                {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
                              </div>
                              <div>
                                <label className="text-sm font-semibold text-text-primary mb-1 block">{t('form.emailLabel')}</label>
                                <Input type="email" placeholder="john@example.com" {...register("email")} error={!!errors.email} />
                                {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-semibold text-text-primary mb-1 block">{t('form.phoneLabel')}</label>
                                <Input placeholder="+7 (999) 000-00-00" {...register("phone")} error={!!errors.phone} />
                                {errors.phone && <p className="mt-1 text-xs text-error">{errors.phone.message}</p>}
                              </div>
                              <div>
                                <label className="text-sm font-semibold text-text-primary mb-1 block">{t('form.availabilityLabel')}</label>
                                <select 
                                  {...register("availability")}
                                  className={cn(
                                    "flex h-11 w-full rounded-md border bg-surface-base px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple",
                                    errors.availability ? "border-error focus-visible:ring-error" : "border-border"
                                  )}
                                >
                                  <option value="">Select availability...</option>
                                  <option value="Sunday Mornings">Sunday Mornings</option>
                                  <option value="Sunday Evenings">Sunday Evenings</option>
                                  <option value="Midweek">Midweek</option>
                                  <option value="Flexible">Flexible</option>
                                </select>
                                {errors.availability && <p className="mt-1 text-xs text-error">{errors.availability.message}</p>}
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-semibold text-text-primary mb-1 block">{t('form.messageLabel')}</label>
                              <textarea 
                                placeholder="I have experience with..." 
                                {...register("message")}
                                className={cn(
                                  "flex min-h-[100px] w-full rounded-md border bg-surface-base px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple",
                                  errors.message ? "border-error focus-visible:ring-error" : "border-border"
                                )}
                              />
                              {errors.message && <p className="mt-1 text-xs text-error">{errors.message.message}</p>}
                            </div>
                            
                            <div className="pt-2">
                              <Button type="submit" variant="primary" className="w-full bg-accent-orange hover:bg-[#e55317]" disabled={isSubmitting}>
                                {isSubmitting ? t('form.submitting') : t('form.submit')}
                              </Button>
                            </div>
                          </form>
                        )}
                      </div>
                    </ModalContent>
                  </Modal>
                </div>
              </Card>
            </AnimatedStaggerItem>
          ))}
        </AnimatedStaggerGroup>
      </section>
    </div>
  )
}
