import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { getOnboardingPage } from '@/lib/kv'
import { sendSlackNotification } from '@/lib/slack'

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const computerChoice = formData.get('computerChoice') as string
    const photo = formData.get('photo') as File
    const pageId = formData.get('pageId') as string | null

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Namn är obligatoriskt', field: 'name' },
        { status: 400 }
      )
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'E-post är obligatoriskt', field: 'email' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Ange en giltig e-postadress', field: 'email' },
        { status: 400 }
      )
    }

    if (!computerChoice || !computerChoice.trim()) {
      return NextResponse.json(
        { error: 'Datorval är obligatoriskt', field: 'computerChoice' },
        { status: 400 }
      )
    }

    if (!photo) {
      return NextResponse.json(
        { error: 'Passerkortsfoto är obligatoriskt', field: 'photo' },
        { status: 400 }
      )
    }

    if (!photo.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Endast bildfiler är tillåtna', field: 'photo' },
        { status: 400 }
      )
    }

    // If pageId provided, send to Slack
    if (pageId) {
      // Fetch onboarding page data
      const onboardingPage = await getOnboardingPage(pageId)

      if (!onboardingPage) {
        return NextResponse.json(
          { error: 'Onboarding-sidan hittades inte eller har utgått' },
          { status: 404 }
        )
      }

      // Upload photo to Vercel Blob (temporary, 30 days)
      let photoUrl: string | undefined

      try {
        const photoBlob = await put(`onboarding-photos/${pageId}-${name.replace(/\s/g, '-')}.jpg`, photo, {
          access: 'public',
          addRandomSuffix: true,
          // Note: Vercel Blob doesn't support TTL directly, but we can manually clean up
        })

        photoUrl = photoBlob.url
      } catch (error) {
        console.error('Error uploading photo to Blob:', error)
        // Continue without photo URL if upload fails
      }

      // Send Slack notification
      const slackSent = await sendSlackNotification(onboardingPage.slackWebhook, {
        employeeName: name,
        email,
        computerChoice,
        photoUrl,
        managerName: onboardingPage.managerName
      })

      if (!slackSent) {
        console.error('Failed to send Slack notification, but continuing...')
        // Don't fail the request if Slack fails - form submission still succeeded
      }

      return NextResponse.json(
        { message: 'Information skickad!' },
        { status: 200 }
      )
    }

    // Fallback: No pageId, generic submission
    // This would be for the generic homepage form (if still needed)
    // For now, return success without doing anything
    return NextResponse.json(
      { message: 'Information mottagen!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error submitting onboarding:', error)
    return NextResponse.json(
      { error: 'Något gick fel vid skickandet' },
      { status: 500 }
    )
  }
}
