'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ExpectationsSection() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())
  const { language, t } = useLanguage()

  const toggleIndex = (index: number) => {
    const newSet = new Set(openIndices)
    if (newSet.has(index)) {
      newSet.delete(index)
    } else {
      newSet.add(index)
    }
    setOpenIndices(newSet)
  }

  const expectations = [
    {
      title: {
        sv: 'Skapa och leverera värde',
        en: 'Create and deliver value'
      },
      color: 'from-purple-500 to-pink-500',
      means: {
        sv: [
          'Ni arbetar kontinuerligt med det som skapar mest effekt mot prioriterade mål inom SVT:s ekosystem',
          'Ni mäter effekten av det som utvecklas med mixed methods',
          'Ni delar kontinuerligt önskade effekter och faktiska resultat av ert arbete',
          'Ni utvärderar risker, insikter och andra faktorer som påverkar vårt arbete',
          'Ni betraktar stabila system som en grund för att skapa värde'
        ],
        en: [
          'You continuously work with what creates the most effect towards prioritized SVT eco system goals',
          'You measure the effects of what you develop using mixed methods',
          'You continuously share the desired effects and actual outcomes of your work',
          'You evaluate risks, insights and other factors that affect our work',
          'You consider stable systems as a foundation for creating value'
        ]
      },
      doesNotMean: {
        sv: [
          'Ni är en feature factory',
          'Att allt måste vara perfekt innan release'
        ],
        en: [
          'You are a feature factory',
          'That everything needs to be perfect to release'
        ]
      }
    },
    {
      title: {
        sv: 'Lära, som team och individer',
        en: 'Learn, as teams and individuals'
      },
      color: 'from-blue-500 to-cyan-500',
      means: {
        sv: [
          'Ni förstår att lärande är grunden för att förbli relevanta för våra användare',
          'Ni utforskar och experimenterar – och hanterar fynd och insikter strukturerat för att sprida kunskap och hjälpa varandra lära',
          'Ni är ansvariga för er egen lärandeutveckling',
          'Ni möjliggör era kollegors utveckling'
        ],
        en: [
          'You understand that learning is the foundation for staying relevant to our users',
          'You do research and experiment – and handle findings and insights in a structured manner to spread knowledge and help each other learn',
          'You are responsible for your own learning development',
          'You enable your colleagues\' development'
        ]
      },
      doesNotMean: {
        sv: [
          'Ni kan inte göra saker som är enkla eller redan allmän kunskap',
          'Ni kan inte be om hjälp eller stöd'
        ],
        en: [
          'You can\'t do stuff that is simple or already common knowledge',
          'You can\'t ask for help or support'
        ]
      }
    },
    {
      title: {
        sv: 'Kommunicera',
        en: 'Communicate'
      },
      color: 'from-green-500 to-emerald-500',
      means: {
        sv: [
          'Ni lyssnar och försöker aktivt förstå vad andra har att säga',
          'Ni säger till när ni har något att bidra med',
          'Ni är tydliga med intention – varför och när information delas',
          'Ni får bekräftelse på att ert budskap har blivit förstått'
        ],
        en: [
          'You listen to and actively try to understand what others have to say',
          'You speak up when you have something to contribute',
          'To be clear with intent – why and when information is shared',
          'To get confirmation that your message has been understood'
        ]
      },
      doesNotMean: {
        sv: [
          'Ni måste alltid prata',
          'Ni måste delta i varje diskussion',
          'Ni kan inte dra er tillbaka när det behövs'
        ],
        en: [
          'You must always speak',
          'You need to participate in every discussion',
          'You can\'t retreat when needed'
        ]
      }
    },
    {
      title: {
        sv: 'Arbeta och ta ansvar som team',
        en: 'Work and take responsibility as teams'
      },
      color: 'from-orange-500 to-red-500',
      means: {
        sv: [
          'Ni arbetar enligt SVT:s designprinciper, t.ex. AI ska användas som standard',
          'Ni alla – som individer – har ett gemensamt ansvar för framgångar såväl som misslyckanden',
          'Ni är alla ansvariga för att onboarda nya teammedlemmar',
          'Ni samarbetar kring det arbete som behöver göras, oavsett roller i teamet',
          'Ni samarbetar kring det arbete som behöver göras tillsammans med de team som behövs'
        ],
        en: [
          'You work according to the SVT design principles, e.g. AI should be used as a standard',
          'You all – as individuals – have a joint responsibility for successes as well as failures',
          'You are all responsible for onboarding new team members',
          'You collaborate on work that needs to be done, regardless of your roles within the team',
          'You collaborate on work that needs to be done together with the teams needed'
        ]
      },
      doesNotMean: {
        sv: [
          'Ni som individer inte har något eget ansvar',
          'Ni kan förbise individuella behov i teamets bästa intresse'
        ],
        en: [
          'You as an individual have no responsibilities',
          'You can overlook individual needs in the name of the team\'s best interest'
        ]
      }
    },
    {
      title: {
        sv: 'Samarbeta',
        en: 'Collaborate'
      },
      color: 'from-pink-500 to-rose-500',
      means: {
        sv: [
          'Ni samarbetar alltid inom teamet',
          'Ni arbetar på ett sätt som eliminerar personberoenden',
          'Ni samarbetar med andra team och avdelningar',
          'Ni samarbetar för att bidra till det övergripande fokuset i SVT:s ekosystem',
          'Ni hjälper varandra',
          'Ni ber om hjälp',
          'Ni kan vara oeniga i diskussionen men är lojala med beslutet när det är taget'
        ],
        en: [
          'You always collaborate within the team',
          'You work in a way that eliminates personal dependencies',
          'You collaborate with other teams and departments',
          'You collaborate to contribute to the overall focus of the SVT eco system',
          'You help each other',
          'You ask for help',
          'You disagree and commit'
        ]
      },
      doesNotMean: {
        sv: [
          'Att alla i teamet förväntas ha djup kunskap om allt',
          'Att du aldrig kan arbeta individuellt'
        ],
        en: [
          'That everyone in the team is expected to have deep knowledge about everything',
          'That you can never work individually'
        ]
      }
    },
    {
      title: {
        sv: 'Arbeta agilt',
        en: 'Work in an agile manner'
      },
      color: 'from-indigo-500 to-purple-500',
      means: {
        sv: [
          'Ni reflekterar och lär för att förbättra produkt och process',
          'Ni arbetar effekt- och experimentdrivet',
          'Ni gör balanserade beslut där affärsvärde, användarvärde och genomförbarhet är lika viktiga',
          'Ni arbetar iterativt för att minska risk',
          'Ni förväntas göra misstag – om ni inte gör det är ni antingen inte utmanade eller känner er inte trygga'
        ],
        en: [
          'You reflect and learn to improve product and process',
          'You work in an effect and experiment driven manner',
          'You make balanced decisions where business value, user value and feasibility are all equally important',
          'You work iteratively to reduce risk',
          'You are expected to make mistakes, if you don\'t you are either not being challenged or not feeling safe'
        ]
      },
      doesNotMean: {
        sv: [
          'Ni måste följa ett specifikt agilt ramverk, eftersom ni äger er process och väljer era verktyg',
          'Det balanserade beslutet beror på antalet personer inom varje perspektiv'
        ],
        en: [
          'You must follow a specific agile framework, since you own your process and choose your tools',
          'The balanced decision depends on the number of people within each perspectives'
        ]
      }
    }
  ]

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 text-svt-dark">
          {t('Våra förväntningar', 'Our expectations')}
        </h2>
        <p className="text-center text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          {t(
            'Som medarbetare och team på SVTi har vi höga förväntningar på varandra. Här är vad det innebär i praktiken.',
            'As employees and teams at SVTi, we have high expectations of each other. Here is what this means in practice.'
          )}
        </p>

        <div className="space-y-3 sm:space-y-4">
          {expectations.map((expectation, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleIndex(index)}
                className={`w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-3 bg-gradient-to-r ${expectation.color} text-white hover:opacity-90 transition-opacity min-h-[64px]`}
                aria-expanded={openIndices.has(index)}
                aria-controls={`expectation-${index}`}
                aria-label={`${expectation.title[language]} - ${t('Klicka för att', 'Click to')} ${openIndices.has(index) ? t('stänga', 'close') : t('öppna', 'open')} ${t('detaljer', 'details')}`}
              >
                <span id={`expectation-heading-${index}`} className="text-lg sm:text-xl font-semibold leading-tight flex-1">
                  {expectation.title[language]}
                </span>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transform transition-transform ${openIndices.has(index) ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndices.has(index) && (
                <div
                  id={`expectation-${index}`}
                  role="region"
                  aria-labelledby={`expectation-heading-${index}`}
                  className="px-4 sm:px-6 py-5 sm:py-6 space-y-5 sm:space-y-6"
                >
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-3 text-green-700">
                      {t('Detta innebär...', 'This means...')}
                    </h4>
                    <ul className="space-y-2.5 sm:space-y-3">
                      {expectation.means[language].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0 text-base sm:text-lg">✓</span>
                          <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-base sm:text-lg mb-3 text-red-700">
                      {t('Detta innebär INTE...', 'This does not mean...')}
                    </h4>
                    <ul className="space-y-2.5 sm:space-y-3">
                      {expectation.doesNotMean[language].map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-red-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0 text-base sm:text-lg">✗</span>
                          <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
