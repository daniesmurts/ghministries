"use client"
import * as React from "react"
import { useTranslations } from "next-intl"
import { Calendar as CalendarIcon, MapPin, List, Grid, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatedSection, AnimatedStaggerGroup, AnimatedStaggerItem } from "@/components/ui/AnimatedSection"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export default function EventsClient({ events }: { events: any[] }) {
  const t = useTranslations('EventsPage')
  const [viewMode, setViewMode] = React.useState<"list" | "calendar">("list")
  const [currentDate, setCurrentDate] = React.useState(new Date())

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  const getLocationString = (location: any) => {
    if (!location) return 'Moscow HQ';
    if (typeof location === 'string') return location;
    if (location.isOnline) return 'Online Event';
    return location.venueName || location.city || location.address || 'Moscow HQ';
  }

  // Sort events chronologically
  const sortedEvents = [...events].sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())

  // Calendar Helpers
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const monthName = currentDate.toLocaleString('default', { month: 'long' })

  const calendarDays = []
  const daysCount = daysInMonth(currentYear, currentMonth)
  const startingDay = firstDayOfMonth(currentYear, currentMonth)

  // Padding for previous month
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(null)
  }

  // Actual days
  for (let i = 1; i <= daysCount; i++) {
    calendarDays.push(i)
  }

  const getEventsForDay = (day: number) => {
    return sortedEvents.filter(event => {
      const d = new Date(event.startDateTime)
      return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear
    })
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 md:px-8 py-8">
      
      {/* Header & Toggle View */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {viewMode === "calendar" ? (
          <div className="flex items-center gap-4">
            <h2 className="font-display text-2xl font-bold text-text-primary capitalize">
              {monthName} {currentYear}
            </h2>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={prevMonth} className="h-8 w-8 p-0">
                <span className="sr-only">Previous month</span>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={nextMonth} className="h-8 w-8 p-0">
                <span className="sr-only">Next month</span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : <div />}

        <div className="flex bg-surface-elevated rounded-lg p-1 border border-border">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "flex items-center px-4 py-2 rounded-md text-sm font-bold transition-all",
              viewMode === "list" ? "bg-surface-subtle text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
            )}
          >
            <List className="h-4 w-4 mr-2" />
            {t('toggle.list')}
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={cn(
              "flex items-center px-4 py-2 rounded-md text-sm font-bold transition-all",
              viewMode === "calendar" ? "bg-surface-subtle text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
            )}
          >
            <Grid className="h-4 w-4 mr-2" />
            {t('toggle.calendar')}
          </button>
        </div>
      </div>

      {/* Events View */}
      {viewMode === "list" ? (
        <AnimatedStaggerGroup className="flex flex-col space-y-4">
          {sortedEvents.map((event) => {
            const { month, day, time } = formatDate(event.startDateTime)
            return (
              <AnimatedStaggerItem key={event._id}>
                <Link href={`/events/${event.slug?.current || event.slug}`} className="block group">
                  <Card hoverLift className="flex flex-col sm:flex-row overflow-hidden border-transparent hover:border-accent-purple/50 transition-colors">
                    {/* Date Chip (Orange) */}
                    <div className="bg-accent-orange text-white flex flex-col items-center justify-center p-6 sm:w-32 shrink-0 group-hover:bg-[#e55317] transition-colors">
                      <span className="text-sm font-bold uppercase tracking-widest opacity-90">{month}</span>
                      <span className="font-display text-4xl font-bold">{day}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface-elevated">
                      <div className="flex-1">
                        <div className="flex items-center mb-2 gap-3">
                          <Badge variant="purple" className="text-[10px]">{event.type || 'Event'}</Badge>
                          <span className="text-sm font-medium text-accent-orange flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {time}
                          </span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-text-secondary text-sm">
                          <MapPin className="h-4 w-4 mr-1.5 shrink-0" />
                          {getLocationString(event.location)}
                        </div>
                      </div>
                      
                      <Button variant="secondary" className="shrink-0 pointer-events-none md:w-auto w-full group-hover:bg-accent-purple group-hover:text-white group-hover:border-accent-purple">
                        {t('card.register')}
                      </Button>
                    </div>
                  </Card>
                </Link>
              </AnimatedStaggerItem>
            )
          })}
          {sortedEvents.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              No upcoming events found.
            </div>
          )}
        </AnimatedStaggerGroup>
      ) : (
        <AnimatedSection className="bg-surface-elevated rounded-2xl shadow-elevated border border-border overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="p-4 text-center text-xs font-bold uppercase tracking-widest text-text-tertiary border-r border-border last:border-0 bg-surface-subtle">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              const dayEvents = day ? getEventsForDay(day) : []
              const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
              
              return (
                <div key={idx} className={cn(
                  "min-h-[120px] p-2 border-r border-b border-border last:border-r-0 transition-colors hover:bg-surface-subtle/50",
                  !day && "bg-surface-subtle/30"
                )}>
                  {day && (
                    <div className="flex flex-col h-full">
                      <span className={cn(
                        "inline-flex h-7 w-7 items-center justify-center text-sm font-bold rounded-full mb-1",
                        isToday ? "bg-accent-purple text-white" : "text-text-secondary"
                      )}>
                        {day}
                      </span>
                      <div className="flex flex-col gap-1 mt-1">
                        {dayEvents.map(event => (
                          <Link 
                            key={event._id} 
                            href={`/events/${event.slug?.current || event.slug}`}
                            className="text-[10px] p-1.5 rounded bg-accent-purple-10 text-accent-purple font-bold truncate hover:bg-accent-purple hover:text-white transition-all border border-accent-purple/20"
                          >
                            {event.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </AnimatedSection>
      )}
    </section>
  )
}
