import { getOnboardingPage } from '@/lib/kv'
import { OnboardingProvider } from '@/contexts/OnboardingContext'
import HeroSection from '@/components/HeroSection'
import InfoCards from '@/components/InfoCards'
import OnboardingForm from '@/components/OnboardingForm'
import ExpectationsSection from '@/components/ExpectationsSection'
import ManifestoSection from '@/components/ManifestoSection'
import MedarbetarpolicySection from '@/components/MedarbetarpolicySection'
import TeamLink from '@/components/TeamLink'
import ExpiredPage from '@/components/ExpiredPage'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Toaster } from 'react-hot-toast'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PersonalizedOnboardingPage({ params }: PageProps) {
  const { id } = await params

  // Fetch onboarding page data from KV
  const personalization = await getOnboardingPage(id)

  // If not found or expired, show error page
  if (!personalization) {
    return <ExpiredPage />
  }

  return (
    <html lang={personalization.language}>
      <body>
        <LanguageProvider>
          <OnboardingProvider personalization={personalization}>
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
                    © {new Date().getFullYear()} SVT. Alla rättigheter förbehållna.
                  </p>
                  <p className="text-sm mt-2 text-gray-400">
                    Frågor? Kontakta din chef eller IT-avdelningen.
                  </p>
                </div>
              </footer>
            </main>
            <Toaster />
          </OnboardingProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const personalization = await getOnboardingPage(id)

  if (!personalization) {
    return {
      title: 'Länken har utgått | SVTi Onboarding'
    }
  }

  return {
    title: `Välkommen ${personalization.employeeName} | SVTi Onboarding`,
    description: `Personlig onboarding-sida för ${personalization.employeeName} på SVTi`
  }
}
