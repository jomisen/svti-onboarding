'use client'

import HeroSection from '@/components/HeroSection'
import InfoCards from '@/components/InfoCards'
import ExpectationsSection from '@/components/ExpectationsSection'
import ManifestoSection from '@/components/ManifestoSection'
import MedarbetarpolicySection from '@/components/MedarbetarpolicySection'
import TeamLink from '@/components/TeamLink'
import OnboardingForm from '@/components/OnboardingForm'
import { useLanguage } from '@/contexts/LanguageContext'
import { OnboardingProvider } from '@/contexts/OnboardingContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <OnboardingProvider personalization={null}>
      <main id="main-content" className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <HeroSection />
        <InfoCards />
        <OnboardingForm />
        <ExpectationsSection />
        <ManifestoSection />
        <MedarbetarpolicySection />
        <TeamLink />

        {/* Footer */}
        <footer className="bg-svt-dark text-white py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} SVT. {t('Alla rättigheter förbehållna.', 'All rights reserved.')}
            </p>
            <p className="text-sm mt-2 text-gray-400">
              {t(
                'Frågor? Kontakta din HR-ansvarig eller IT-avdelningen.',
                'Questions? Contact your HR representative or the IT department.'
              )}
            </p>
          </div>
        </footer>
      </main>
    </OnboardingProvider>
  )
}
