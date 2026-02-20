'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function MedarbetarpolicySection() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 text-svt-dark">
          {t('SVT:s medarbetarpolicy', 'SVT Employee Policy')}
        </h2>
        <p className="text-center text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
          {t(
            'Här kan du läsa om våra riktlinjer och policys som medarbetare på SVT.',
            'Here you can read about our guidelines and policies as an employee at SVT.'
          )}
        </p>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-svt-purple">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-3 bg-gradient-to-r from-svt-purple to-svt-pink text-white hover:opacity-90 transition-opacity min-h-[64px]"
            aria-expanded={isOpen}
            aria-controls="policy-content"
          >
            <span className="text-lg sm:text-xl font-semibold leading-tight flex-1">
              {t('Läs medarbetarpolicyn', 'Read the employee policy')}
            </span>
            <svg
              className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div
              id="policy-content"
              role="region"
              className="px-4 sm:px-6 py-5 sm:py-6 bg-gray-50"
            >
              <div className="prose prose-sm sm:prose-base max-w-none">
                {/* PLACEHOLDER CONTENT - Replace with actual policy */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>{t('Observera:', 'Note:')}</strong> {t('Detta är exempelinnehåll. Den faktiska medarbetarpolicyn kommer att läggas till här efter godkännande.', 'This is sample content. The actual employee policy will be added here after approval.')}
                  </p>
                </div>

                <h3 className="text-xl font-bold text-svt-dark mb-4">
                  {t('Exempel på innehåll i medarbetarpolicyn', 'Example Employee Policy Content')}
                </h3>

                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-svt-dark">
                      {t('1. Arbetsmiljö och värdegrund', '1. Work Environment and Values')}
                    </h4>
                    <p className="leading-relaxed">
                      {t(
                        'På SVT ska alla medarbetare känna sig trygga, respekterade och välkomna. Vi bygger vår arbetsmiljö på öppenhet, mångfald och inkludering.',
                        'At SVT, all employees should feel safe, respected and welcome. We build our work environment on openness, diversity and inclusion.'
                      )}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-svt-dark">
                      {t('2. Arbetstider och flexibilitet', '2. Working Hours and Flexibility')}
                    </h4>
                    <p className="leading-relaxed">
                      {t(
                        'Vi erbjuder flexibla arbetstider och möjlighet till distansarbete för att främja en god work-life balance.',
                        'We offer flexible working hours and the possibility of remote work to promote a good work-life balance.'
                      )}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-svt-dark">
                      {t('3. Personlig utveckling', '3. Personal Development')}
                    </h4>
                    <p className="leading-relaxed">
                      {t(
                        'Varje medarbetare uppmuntras till kontinuerligt lärande och utveckling genom kurser, konferenser och intern kunskapsdelning.',
                        'Every employee is encouraged to continuous learning and development through courses, conferences and internal knowledge sharing.'
                      )}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-svt-dark">
                      {t('4. Integritet och datasäkerhet', '4. Privacy and Data Security')}
                    </h4>
                    <p className="leading-relaxed">
                      {t(
                        'Alla medarbetare ansvarar för att följa SVT:s riktlinjer för datasäkerhet och integritetsskydd.',
                        'All employees are responsible for following SVT\'s guidelines for data security and privacy protection.'
                      )}
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                    <p className="text-sm text-blue-800">
                      <strong>{t('Fullständig policy:', 'Full policy:')}</strong> {t('Den kompletta medarbetarpolicyn kommer att finnas tillgänglig här när den godkänts för publicering.', 'The complete employee policy will be available here once approved for publication.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
