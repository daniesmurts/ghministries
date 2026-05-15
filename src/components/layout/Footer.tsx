"use client"
import { Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import Image from "next/image"

export function Footer() {
  const t = useTranslations('Footer')
  
  return (
    <footer className="bg-surface-dark py-16 text-text-tertiary">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <Link href="/" className="flex items-center space-x-4">
              <div className="relative h-14 w-14">
                <Image
                  src="/logo-white.png"
                  alt="Great Harvest Ministries Logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain mix-blend-screen"
                />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                  GREAT HARVEST
                </span>
                <span className="font-display text-[10px] font-normal tracking-[0.2em] text-text-tertiary md:text-xs">
                  MINISTRIES
                </span>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed">
              Spirit-led. Mission-conscious. Kingdom-minded. Where Heaven Meets Earth.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-text-tertiary transition-colors hover:text-white" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-text-tertiary transition-colors hover:text-white" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <a href="#" className="text-text-tertiary transition-colors hover:text-white" aria-label="Telegram">
                <Send className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-tertiary transition-colors hover:text-white" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-semibold text-white">{t('About')}</h4>
            <Link href="/vision" className="text-sm transition-colors hover:text-white">{t('Vision')}</Link>
            <Link href="/leadership" className="text-sm transition-colors hover:text-white">{t('Leadership')}</Link>
            <Link href="/beliefs" className="text-sm transition-colors hover:text-white">{t('Beliefs & Values')}</Link>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="font-semibold text-white">{t('Ministries')}</h4>
            <Link href="/home-groups" className="text-sm transition-colors hover:text-white">{t('Home Groups')}</Link>
            <Link href="/media" className="text-sm transition-colors hover:text-white">{t('Media Library')}</Link>
            <Link href="/prayer" className="text-sm transition-colors hover:text-white">{t('Prayer Request')}</Link>
            <Link href="/events" className="text-sm transition-colors hover:text-white">{t('Events Calendar')}</Link>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="font-semibold text-white">{t('Connect')}</h4>
            <Link href="/global" className="text-sm transition-colors hover:text-white">{t('Global')}</Link>
            <Link href="/giving" className="text-sm transition-colors hover:text-white">{t('Giving')}</Link>
            <Link href="/volunteering" className="text-sm transition-colors hover:text-white">{t('Volunteering')}</Link>
            <Link href="/store" className="text-sm transition-colors hover:text-white">{t('Store')}</Link>
            <Link href="/contact" className="text-sm transition-colors hover:text-white">{t('Contact')}</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between space-y-4 border-t border-[rgba(255,255,255,0.1)] pt-8 md:flex-row md:space-y-0">
          <p className="text-xs">
            © {new Date().getFullYear()} Great Harvest Ministries · {t('Built with Purpose')}
          </p>
          <div className="flex items-center space-x-6 text-xs">
            <Link href="#" className="transition-colors hover:text-white">{t('Privacy Policy')}</Link>
            <Link href="#" className="transition-colors hover:text-white">{t('Terms')}</Link>
          </div>
        </div>
      </div>
      
      {/* Accent Line */}
      <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-transparent via-accent-purple to-transparent opacity-50" />
    </footer>
  )
}
