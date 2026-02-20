'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function ManifestoSection() {
  const { language, t } = useLanguage()

  const values = [
    {
      title: {
        sv: 'Keep calm and act for change',
        en: 'Keep calm and act for change'
      },
      icon: '🌀',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      points: {
        sv: [
          'Den organiska rörelsen av människor och potential finns i vårt DNA och hjälper skapa lugn i en ständigt föränderlig värld.',
          'Anpassning baserad på mål och syfte är viktigare än organisatoriska och ekonomiska strukturer.',
          'Onboarding för nya samarbeten är enkelt och möjliggör för både team och individer att bidra där det skapar mest värde.',
          'Vi värdesätter nätverkande och respekterar varandras autonomi och individuella fokus.'
        ],
        en: [
          'The organic movement of people and potential is in our DNA and helps create calm in an ever-changing world.',
          'Alignment based on goals and purpose is more important than organizational and financial structures.',
          'Onboarding for new collaborations is easy and enables both teams and individuals to contribute where it generates the most value.',
          'We value networking and respect each other\'s autonomy and individual focus.'
        ]
      }
    },
    {
      title: {
        sv: 'Proud to earn trust',
        en: 'Proud to earn trust'
      },
      icon: '❤️',
      color: 'bg-gradient-to-br from-pink-500 to-red-500',
      points: {
        sv: [
          'Data hjälper oss att lära känna våra användare så att vi kan möta deras behov på bästa möjliga sätt.',
          'Vi är transparenta om vårt syfte med att använda data. Vi delar våra insikter och lärdomar, inte integriteten hos våra användare.',
          'Data behandlas alltid med omsorg.'
        ],
        en: [
          'Data helps us get to know our users so that we can meet their needs in the best possible way.',
          'We are transparent about our purpose of using data. We share our insights and learnings, not the integrity of our users.',
          'Data is always treated with care.'
        ]
      }
    },
    {
      title: {
        sv: 'Dependent on independence',
        en: 'Dependent on independence'
      },
      icon: '🦅',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      points: {
        sv: [
          'Vårt oberoende är grunden för vårt public service-uppdrag.',
          'Vi bygger tillgängliga, stabila tjänster på webben och externa plattformar för att möta våra användare där de är.',
          'Vi utmanar gränserna, utmanar oss själva och leder vägen till bättre tjänster för hela Sverige.'
        ],
        en: [
          'Our independence is the foundation of our public service mission.',
          'We build accessible, stable services on the web and external platforms to meet our users wherever they are.',
          'We push the limits, challenge ourselves and lead the way to better services for the whole of Sweden.'
        ]
      }
    },
    {
      title: {
        sv: 'Transformed by diversity',
        en: 'Transformed by diversity'
      },
      icon: '🌈',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      points: {
        sv: [
          'Vi välkomnar ett brett spektrum av erfarenhet och kunskap för att hantera komplexa utmaningar och bygga världsklasstjänster.',
          'Vi behöver bli mer diversifierade, och vi rekryterar medvetet baserat på vilka vi är, såväl som på vilka vi inte är.',
          'Vi lyssnar på och omfamnar ett mångsidigt spektrum av perspektiv istället för att tro att vi vet allt.',
          'Hos oss kan du vara dig själv.'
        ],
        en: [
          'We welcome a wide range of experience and knowledge in order to tackle complex challenges and build world-class services.',
          'We need to become more diverse, and we recruit consciously based on who we are, as well as on who we are not.',
          'We listen to and embrace a diverse range of perspectives instead of thinking we know everything.',
          'With us, you can be yourself.'
        ]
      }
    },
    {
      title: {
        sv: 'For a sustainable future',
        en: 'For a sustainable future'
      },
      icon: '🌍',
      color: 'bg-gradient-to-br from-teal-500 to-green-500',
      points: {
        sv: [
          'Vi håller vårt koldioxidavtryck nere genom aktiva, medvetna val och ett hållbart tankesätt.',
          'Vi bygger energieffektiva tjänster, arbetar aktivt för att minimera avfall och möjliggör klimatvänlig streaming för våra användare.',
          'Vi är ambassadörer för hållbar tjänsteutveckling, delar generöst med oss av vår kunskap och pushar för en hållbar streamingindustri.'
        ],
        en: [
          'We keep our carbon footprint down through active, conscious choices and a sustainable mindset.',
          'We build energy-efficient services, work actively to minimize waste, and enable climate-friendly streaming for our users.',
          'We are sustainable service development ambassadors, share our knowledge generously, and push for a sustainable streaming industry.'
        ]
      }
    }
  ]

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 text-svt-dark">
          {t('Vårt kulturmanifest', 'Our culture manifesto')}
        </h2>
        <p className="text-center text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          {t(
            'Dessa värderingar har skapats av medarbetarna på SVTi och definierar vår kultur.',
            'These values have been created by the employees at SVTi and define our culture.'
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className={`${value.color} p-5 sm:p-6 text-white`}>
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{value.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight">{value.title[language]}</h3>
              </div>
              <div className="p-5 sm:p-6">
                <ul className="space-y-2.5 sm:space-y-3">
                  {value.points[language].map((point, i) => (
                    <li key={i} className="flex items-start text-sm sm:text-base text-gray-700 leading-relaxed">
                      <span className="text-svt-purple mr-2 mt-0.5 flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
