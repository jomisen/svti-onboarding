'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { OnboardingPage } from '@/lib/kv'

interface OnboardingContextValue {
  personalization: OnboardingPage | null
  isPersonalized: boolean
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined)

interface OnboardingProviderProps {
  children: ReactNode
  personalization: OnboardingPage | null
}

export function OnboardingProvider({ children, personalization }: OnboardingProviderProps) {
  const value: OnboardingContextValue = {
    personalization,
    isPersonalized: personalization !== null
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)

  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }

  return context
}
