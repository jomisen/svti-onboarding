'use client'

export default function ExpiredPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Länken har utgått
          </h1>

          <p className="text-gray-600 mb-6">
            Denna onboarding-länk är inte längre giltig. Länkar är aktiva i 30 dagar från skapandet.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
            <h3 className="font-semibold text-sm mb-2 text-blue-900">
              Vad kan jag göra?
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Kontakta din chef för att få en ny länk</li>
              <li>• Kontakta HR-avdelningen på SVT</li>
              <li>• Skicka ett mail till din kontaktperson</li>
            </ul>
          </div>

          <a
            href="/"
            className="inline-block px-6 py-3 bg-svt-purple text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Till startsidan
          </a>
        </div>
      </div>
    </main>
  )
}
