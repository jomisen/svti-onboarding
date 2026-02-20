import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const computerChoice = formData.get('computerChoice') as string
    const photo = formData.get('photo') as File

    // Validate required fields with specific error messages
    if (!name || !name.trim()) {
      return NextResponse.json(
        {
          error: 'Namn är obligatoriskt',
          field: 'name'
        },
        { status: 400 }
      )
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        {
          error: 'E-post är obligatoriskt',
          field: 'email'
        },
        { status: 400 }
      )
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          error: 'Ange en giltig e-postadress',
          field: 'email'
        },
        { status: 400 }
      )
    }

    if (!computerChoice || !computerChoice.trim()) {
      return NextResponse.json(
        {
          error: 'Datorval är obligatoriskt',
          field: 'computerChoice'
        },
        { status: 400 }
      )
    }

    if (!photo) {
      return NextResponse.json(
        {
          error: 'Passerkortsfoto är obligatoriskt',
          field: 'photo',
          suggestion: 'Vänligen ladda upp ett foto i JPG eller PNG-format'
        },
        { status: 400 }
      )
    }

    // Validate photo type
    if (!photo.type.startsWith('image/')) {
      return NextResponse.json(
        {
          error: 'Endast bildfiler är tillåtna',
          field: 'photo',
          suggestion: 'Vänligen ladda upp ett foto i JPG, PNG eller HEIC-format'
        },
        { status: 400 }
      )
    }

    // Validate photo size (max 2MB after compression - shouldn't happen but safety check)
    if (photo.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: 'Bilden är för stor (max 2MB)',
          field: 'photo',
          suggestion: 'Försök komprimera bilden eller välj en mindre bild'
        },
        { status: 400 }
      )
    }

    // Convert photo to buffer
    const photoBuffer = await photo.arrayBuffer()
    const photoBase64 = Buffer.from(photoBuffer).toString('base64')

    // Send email via Resend
    const hrEmail = process.env.HR_EMAIL || 'emelie.jomer@svt.se'

    console.log('Sending email to:', hrEmail)
    console.log('Using API key:', process.env.RESEND_API_KEY ? 'Set' : 'NOT SET')

    const result = await resend.emails.send({
      from: 'SVTi Onboarding <onboarding@resend.dev>', // You'll need to update this with your verified domain
      to: hrEmail,
      subject: `Ny onboarding-information från ${name}`,
      html: `
        <h1>Ny medarbetare: ${name}</h1>

        <h2>Kontaktinformation</h2>
        <p><strong>Namn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>

        <h2>Datorval</h2>
        <p>${computerChoice}</p>

        <h2>Passerkortsfoto</h2>
        <p>Se bifogad fil.</p>

        <hr />
        <p style="color: #666; font-size: 12px;">
          Detta mail skickades automatiskt från SVTi:s onboarding-system.
        </p>
      `,
      attachments: [
        {
          filename: `passerkortsfoto-${name.replace(/\s/g, '-')}.${photo.type.split('/')[1]}`,
          content: photoBase64,
        },
      ],
    })

    console.log('Resend result:', JSON.stringify(result))

    return NextResponse.json(
      { message: 'Information skickad!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Något gick fel vid skickandet' },
      { status: 500 }
    )
  }
}
