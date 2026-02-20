'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-8 md:right-8 z-10">
      <div className="flex gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-1">
        <button
          onClick={() => setLanguage('sv')}
          className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-md font-semibold transition-all text-sm sm:text-base min-h-[44px] min-w-[44px] flex items-center justify-center ${
            language === 'sv'
              ? 'bg-white text-svt-purple shadow-md'
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Byt till svenska"
          aria-pressed={language === 'sv'}
        >
          SV
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded-md font-semibold transition-all text-sm sm:text-base min-h-[44px] min-w-[44px] flex items-center justify-center ${
            language === 'en'
              ? 'bg-white text-svt-purple shadow-md'
              : 'text-white hover:bg-white/10'
          }`}
          aria-label="Switch to English"
          aria-pressed={language === 'en'}
        >
          EN
        </button>
      </div>
    </div>
  )
}
