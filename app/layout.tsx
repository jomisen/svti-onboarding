import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Välkommen till SVTi',
  description: 'Onboarding för nya medarbetare och konsulter på SVTi - SVT:s avdelning för digital utveckling',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv">
      <body className={inter.className}>
        <LanguageProvider>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-svt-purple text-white px-6 py-3 rounded-lg z-50 font-semibold"
          >
            Hoppa till huvudinnehåll
          </a>
          {children}
          <Toaster position="bottom-right" />
        </LanguageProvider>
      </body>
    </html>
  )
}
