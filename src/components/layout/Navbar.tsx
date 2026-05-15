"use client"
import * as React from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Link, usePathname } from "@/i18n/routing"
import { Button } from "@/components/ui/Button"
import { LanguageToggle } from "@/components/ui/LanguageToggle"
import { CartDrawer } from "@/components/store/CartDrawer"
import { useCartStore } from "@/store/useCartStore"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "About",
    dropdown: [
      { name: "Vision", href: "/vision" },
      { name: "Leadership", href: "/leadership" },
      { name: "Beliefs & Values", href: "/beliefs" },
    ],
  },
  {
    name: "Ministries",
    dropdown: [
      { name: "Home Groups", href: "/home-groups" },
      { name: "Media Library", href: "/media" },
      { name: "Prayer Request", href: "/prayer" },
    ],
  },
  {
    name: "Join Us",
    dropdown: [
      { name: "Volunteering", href: "/volunteering" },
      { name: "Careers", href: "/opportunities" },
      { name: "Giving", href: "/giving" },
    ],
  },
  {
    name: "Services",
    dropdown: [
      { name: "General", href: "/services/general" },
      { name: "Children", href: "/services/children" },
      { name: "Teenagers", href: "/services/teenagers" },
      { name: "Youth", href: "/services/youth" },
      { name: "Seniors", href: "/services/seniors" },
      { name: "National", href: "/services/national" },
    ],
  },
  { name: "Global", href: "/global" },
  { name: "Events Calendar", href: "/events" },
  { name: "Contact", href: "/contact" },
] as const

export function Navbar() {
  const pathname = usePathname()
  const t = useTranslations('Navbar')
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const { toggleCart, totalItems } = useCartStore()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center transition-all duration-300",
          "h-[64px] md:h-[72px]",
          "bg-[rgba(249,249,249,0.85)] backdrop-blur-[20px] saturate-180",
          isScrolled ? "border-b border-[rgba(232,232,236,0.8)] shadow-sm" : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-8 lg:px-12">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple rounded-sm lg:mr-8 xl:mr-12">
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src="/logo.png"
                alt="Great Harvest Ministries Logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-display text-sm font-bold tracking-tight text-text-primary whitespace-nowrap md:text-base">
                GREAT HARVEST
              </span>
              <span className="font-display text-[9px] font-normal tracking-[0.2em] text-text-secondary md:text-[10px]">
                MINISTRIES
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => 'dropdown' in link && setActiveDropdown(link.name)}
                onMouseLeave={() => 'dropdown' in link && setActiveDropdown(null)}
              >
                {'dropdown' in link ? (
                  <button className="flex items-center space-x-1 py-4 text-sm font-medium text-text-primary transition-colors hover:text-accent-purple focus-visible:outline-none whitespace-nowrap">
                    <span>{t(link.name as Parameters<typeof t>[0])}</span>
                    <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "relative py-4 text-sm font-medium transition-colors hover:text-accent-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple rounded-sm whitespace-nowrap",
                      pathname === link.href ? "text-accent-purple" : "text-text-primary"
                    )}
                  >
                    {t(link.name as Parameters<typeof t>[0])}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-3 left-0 right-0 h-[2px] bg-accent-purple"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )}

                {'dropdown' in link && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-[-8px] w-56 rounded-md border border-border bg-surface-elevated py-2 shadow-elevated"
                      >
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            className="block px-4 py-2 text-sm text-text-primary hover:bg-surface-subtle hover:text-accent-purple"
                          >
                            {t(subLink.name as Parameters<typeof t>[0])}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA, Cart & Language */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <LanguageToggle />
            <button 
              onClick={toggleCart}
              className="relative p-2 text-text-primary hover:bg-surface-subtle rounded-full transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems() > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-accent-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {totalItems()}
                </span>
              )}
            </button>
            <Button variant="primary" asChild>
              <Link href="/giving">{t('Give')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle & Cart */}
          <div className="flex items-center lg:hidden space-x-2">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-text-primary hover:bg-surface-subtle rounded-full transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems() > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-accent-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center translate-x-1 -translate-y-1">
                  {totalItems()}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center p-2 text-text-primary hover:bg-surface-subtle rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Global Cart Drawer */}
      <CartDrawer />

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] flex flex-col bg-surface-elevated px-6 py-6"
          >
            <div className="flex items-center justify-between mb-12">
            <Link href="/" className="flex items-center space-x-3" onClick={closeMobileMenu}>
              <div className="relative h-10 w-10">
                <Image
                  src="/logo.png"
                  alt="Great Harvest Ministries Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="font-display text-sm font-bold tracking-tight text-text-primary whitespace-nowrap">
                  GREAT HARVEST
                </span>
                <span className="font-display text-[9px] font-normal tracking-[0.2em] text-text-secondary">
                  MINISTRIES
                </span>
              </div>
            </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-text-primary hover:bg-surface-subtle rounded-md"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 overflow-y-auto pb-24">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {'dropdown' in link ? (
                    <div className="space-y-4">
                      <div className="text-2xl font-bold text-text-secondary">{t(link.name as Parameters<typeof t>[0])}</div>
                      <div className="flex flex-col space-y-4 pl-4 border-l-2 border-border">
                        {link.dropdown.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            onClick={closeMobileMenu}
                            className="text-xl font-semibold text-text-primary"
                          >
                            {t(subLink.name as Parameters<typeof t>[0])}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "text-2xl font-bold",
                        pathname === link.href ? "text-accent-purple" : "text-text-primary"
                      )}
                    >
                      {t(link.name as Parameters<typeof t>[0])}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col space-y-6 pt-6 border-t border-border bg-surface-elevated">
              <div className="flex items-center justify-center">
                 <LanguageToggle />
              </div>
              <Button variant="primary" size="lg" className="w-full text-lg" asChild>
                <Link href="/giving" onClick={closeMobileMenu}>{t('Give Now')}</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
