'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative bg-gradient-to-r from-svt-purple to-svt-pink text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <LanguageSwitcher />

      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-[fadeIn_0.8s_ease-out] leading-tight">
          {t('Hej och välkommen till SVTi! 👋', 'Hello and welcome to SVTi! 👋')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-95 leading-relaxed">
          {t(
            'Snart börjar du hos oss och vi ser verkligen fram emot det! SVTi utvecklar digitala tjänster som miljoner svenskar använder varje dag – och snart är du en del av det teamet.',
            'You will soon start working with us and we are really looking forward to it! SVTi develops digital services that millions of Swedes use every day – and soon you will be part of that team.'
          )}
        </p>

        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <p className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            {t('Den här sidan förbereder dig inför din första dag:', 'This page prepares you for your first day:')}
          </p>
          <div className="space-y-2 sm:space-y-3 text-left">
            <p className="flex items-start sm:items-center text-base sm:text-lg">
              <span className="mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0">✓</span>
              <span>{t('Läs om våra förväntningar och kultur', 'Read about our expectations and culture')}</span>
            </p>
            <p className="flex items-start sm:items-center text-base sm:text-lg">
              <span className="mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0">✓</span>
              <span>{t('Fyll i formuläret med dina uppgifter', 'Fill in the form with your information')}</span>
            </p>
            <p className="flex items-start sm:items-center text-base sm:text-lg">
              <span className="mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0">✓</span>
              <span>{t('Var redo för en fantastisk start!', 'Be ready for a fantastic start!')}</span>
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce">
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
