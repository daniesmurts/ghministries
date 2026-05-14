"use client"

import * as React from "react"
import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/routing"

export function LanguageToggle() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ru' : 'en'
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple"
      aria-label="Toggle language"
    >
      <span className={locale === 'en' ? "font-bold text-accent-purple" : "text-text-secondary"}>
        EN
      </span>
      <span className="mx-1 text-text-tertiary">/</span>
      <span className={locale === 'ru' ? "font-bold text-accent-purple" : "text-text-secondary"}>
        RU
      </span>
    </button>
  )
}
