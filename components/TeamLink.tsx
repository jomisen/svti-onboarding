'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function TeamLink() {
  const { t } = useLanguage()
  const googleSlidesUrl = "https://docs.google.com/presentation/d/18h_ZxvZUfMGa8ufWzBumLAx9jat3sAgzyqUtF75-OxA/edit?slide=id.g15c1c2a7a3b_0_94#slide=id.g15c1c2a7a3b_0_94"

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-svt-purple to-svt-pink">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">
          {t('Träffa teamet', 'Meet the team')}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 opacity-95 leading-relaxed">
          {t(
            'Vi ser fram emot att arbeta med dig! Här kan du se alla som arbetar på SVTi.',
            'We look forward to working with you! Here you can see everyone who works at SVTi.'
          )}
        </p>
        <a
          href={googleSlidesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-svt-purple font-bold text-base sm:text-lg rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[44px]"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {t('Se alla medarbetare på SVTi', 'See all employees at SVTi')}
        </a>
        <p className="text-xs sm:text-sm text-white mt-3 sm:mt-4 opacity-75">
          {t('Öppnas i Google Slides', 'Opens in Google Slides')}
        </p>
      </div>
    </section>
  )
}
