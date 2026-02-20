interface SlackNotificationData {
  employeeName: string
  email: string
  computerChoice: string
  photoUrl?: string
  managerName?: string
}

/**
 * Send a Slack notification using a webhook URL
 */
export async function sendSlackNotification(
  webhookUrl: string,
  data: SlackNotificationData
): Promise<boolean> {
  try {
    const blocks: any[] = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `🎉 Ny medarbetare: ${data.employeeName}`,
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Namn:*\n${data.employeeName}`
          },
          {
            type: 'mrkdwn',
            text: `*E-post:*\n${data.email}`
          },
          {
            type: 'mrkdwn',
            text: `*Datorval:*\n${data.computerChoice}`
          }
        ]
      }
    ]

    // Add photo if available
    if (data.photoUrl) {
      blocks.push({
        type: 'image',
        image_url: data.photoUrl,
        alt_text: 'Passerkortsfoto'
      })
    }

    // Add divider
    blocks.push({
      type: 'divider'
    })

    // Add footer
    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Skickat via SVTi Onboarding System • ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString('sv-SE')}`
        }
      ]
    })

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ blocks })
    })

    if (!response.ok) {
      console.error('Slack webhook failed:', response.statusText)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending Slack notification:', error)
    return false
  }
}

/**
 * Validate Slack webhook URL format
 */
export function validateSlackWebhook(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.hostname === 'hooks.slack.com' && parsedUrl.pathname.startsWith('/services/')
  } catch {
    return false
  }
}
