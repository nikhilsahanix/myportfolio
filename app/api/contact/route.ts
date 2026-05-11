import { NextResponse } from 'next/server'
import { Resend } from 'resend'
const recipientEmail = 'contact@nikhilsahani.in'

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_api_key_here') {
      return NextResponse.json({ error: 'Email service is not configured yet' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <leadscontact@nikhilsahani.in>',
      to: [recipientEmail],
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
