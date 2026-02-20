import { NextRequest, NextResponse } from 'next/server'
import { saveOnboardingPage } from '@/lib/kv'
import { generateUniqueId } from '@/lib/utils'
import { validateSlackWebhook } from '@/lib/slack'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      employeeName,
      managerName,
      buddyName,
      teamName,
      startDate,
      meetingInfo,
      slackWebhook,
      language = 'sv'
    } = body

    // Validate required fields
    if (!employeeName || !managerName || !buddyName || !teamName || !startDate || !meetingInfo || !slackWebhook) {
      return NextResponse.json(
        {
          success: false,
          error: 'Alla fält är obligatoriska'
        },
        { status: 400 }
      )
    }

    // Validate Slack webhook URL
    if (!validateSlackWebhook(slackWebhook)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ogiltig Slack webhook URL. URL måste börja med https://hooks.slack.com/services/'
        },
        { status: 400 }
      )
    }

    // Validate language
    if (language !== 'sv' && language !== 'en') {
      return NextResponse.json(
        {
          success: false,
          error: 'Ogiltigt språk. Välj "sv" eller "en"'
        },
        { status: 400 }
      )
    }

    // Generate unique ID
    const id = generateUniqueId()

    // Create page object
    const now = Date.now()
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000

    const page = {
      id,
      employeeName: employeeName.trim(),
      managerName: managerName.trim(),
      buddyName: buddyName.trim(),
      teamName: teamName.trim(),
      startDate: startDate.trim(),
      meetingInfo: meetingInfo.trim(),
      slackWebhook: slackWebhook.trim(),
      language,
      createdAt: now,
      expiresAt: now + thirtyDaysInMs
    }

    // Save to KV
    await saveOnboardingPage(page)

    // Generate full URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const url = `${siteUrl}/onboarding/${id}`

    return NextResponse.json(
      {
        success: true,
        id,
        url
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating onboarding page:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Något gick fel. Försök igen.'
      },
      { status: 500 }
    )
  }
}
