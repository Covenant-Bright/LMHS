import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, request: message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid field types" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const supportEmail = process.env.SUPPORT_EMAIL
    const brevoSmtpUser = process.env.BREVO_SMTP_USER
    const brevoSmtpPass = process.env.BREVO_SMTP_PASS

    if (!supportEmail || !brevoSmtpUser || !brevoSmtpPass) {
      console.error("Missing required environment variables for email service")
      return NextResponse.json({ error: "Email service configuration error" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: brevoSmtpUser,
        pass: brevoSmtpPass,
      },
    })

    await transporter.verify()

    // ✅ 1. Send support email to your support inbox
    await transporter.sendMail({
      from: `"Miracle Schools Support" <${supportEmail}>`,
      to: supportEmail,
      replyTo: email,
      subject: `Support Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Support Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
      text: `Support Request\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    // ✅ 2. Send confirmation email to sender
    await transporter.sendMail({
      from: `"Miracle Schools Support" <${supportEmail}>`,
      to: email,
      subject: "We received your support request",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <p>Hi ${name},</p>
          <p>Thank you for contacting Miracle Schools. We’ve received your message and will get back to you shortly.</p>
          <p><strong>Your message:</strong></p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 1em; color: #555;">${message.replace(/\n/g, "<br>")}</blockquote>
          <p style="margin-top: 2em;">Warm regards,<br>Miracle Schools Support Team</p>
        </div>
      `,
      text: `
        Hi ${name},

        Thank you for contacting Miracle Schools. We’ve received your message and will get back to you shortly.

        Your message:
        "${message}"

        – Miracle Schools Support Team
      `,
    })

    return NextResponse.json({ message: "Support request sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Support form error:", error)

    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        return NextResponse.json({ error: "Email service authentication failed" }, { status: 500 })
      }
      if (error.message.includes("Connection timeout")) {
        return NextResponse.json({ error: "Email service temporarily unavailable" }, { status: 503 })
      }
    }

    return NextResponse.json({ error: "Failed to send support request" }, { status: 500 })
  }
}
