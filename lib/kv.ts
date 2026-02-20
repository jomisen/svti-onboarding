import { kv } from '@vercel/kv'

export interface OnboardingPage {
  id: string
  employeeName: string
  managerName: string
  buddyName: string
  teamName: string
  startDate: string // ISO format
  meetingInfo: string
  slackWebhook: string
  language: 'sv' | 'en'
  createdAt: number
  expiresAt: number
}

const TTL_SECONDS = 30 * 24 * 60 * 60 // 30 days

/**
 * Save an onboarding page to Vercel KV with 30-day TTL
 */
export async function saveOnboardingPage(page: OnboardingPage): Promise<string> {
  const key = `onboarding:${page.id}`

  await kv.set(key, JSON.stringify(page), { ex: TTL_SECONDS })

  return page.id
}

/**
 * Retrieve an onboarding page from Vercel KV
 * Returns null if not found or expired
 */
export async function getOnboardingPage(id: string): Promise<OnboardingPage | null> {
  const key = `onboarding:${id}`

  try {
    const data = await kv.get<string>(key)

    if (!data) {
      return null
    }

    const page = JSON.parse(data) as OnboardingPage

    // Double-check expiration (KV TTL should handle this, but safety check)
    if (page.expiresAt < Date.now()) {
      await kv.del(key)
      return null
    }

    return page
  } catch (error) {
    console.error('Error fetching onboarding page:', error)
    return null
  }
}

/**
 * Delete an onboarding page from Vercel KV
 */
export async function deleteOnboardingPage(id: string): Promise<boolean> {
  const key = `onboarding:${id}`

  try {
    await kv.del(key)
    return true
  } catch (error) {
    console.error('Error deleting onboarding page:', error)
    return false
  }
}
