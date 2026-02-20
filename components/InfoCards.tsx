'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function InfoCards() {
  const { t } = useLanguage()

  const cards = [
    {
      icon: '👥',
      title: t('Fadder', 'Buddy'),
      description: t(
        'Du får en fadder när du börjar som hjälper dig komma igång och svarar på dina frågor.',
        'You will get a buddy when you start who helps you get started and answers your questions.'
      )
    },
    {
      icon: '🏢',
      title: t('Första dagen', 'First day'),
      description: t(
        'Ta med giltig legitimation för att komma in i huset och hämta ut ditt passerkort.',
        'Bring valid ID to enter the building and pick up your access card.'
      )
    },
    {
      icon: '📸',
      title: t('Passerkortsfoto', 'Access card photo'),
      description: t(
        'Skicka in ett foto på dig själv via formuläret nedan så kan vi förbereda ditt passerkort.',
        'Submit a photo of yourself via the form below so we can prepare your access card.'
      )
    },
    {
      icon: '💻',
      title: t('Datorval', 'Computer choice'),
      description: t(
        'Välj vilken dator du vill ha via formuläret nedan, så beställer vi den åt dig.',
        'Choose which computer you want via the form below, and we will order it for you.'
      )
    }
  ]

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 text-svt-dark">
          {t('Viktigt att veta', 'Important to know')}
        </h2>
        <p className="text-center text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          {t(
            'Här är några praktiska saker att tänka på innan och under din första dag.',
            'Here are some practical things to keep in mind before and during your first day.'
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-5 sm:p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-svt-purple"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{card.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-svt-dark">{card.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
