import { NextResponse } from 'next/server'

// ✏️ Replace this with real email sending (AWS SES, Resend, etc.)
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // TODO: Send email using AWS SES
    // Example with AWS SES SDK:
    // const sesClient = new SESClient({ region: 'ap-south-1' })
    // await sesClient.send(new SendEmailCommand({ ... }))

    console.log('Contact form submission:', { name, email, message })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
