import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const brevoApiKey = process.env.BREVO_API_KEY
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not configured")
      return NextResponse.json({ error: "Service configuration error" }, { status: 500 })
    }

    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [1],
        updateEnabled: true,
      }),
    })

    let responseData = null
    try {
      const text = await brevoResponse.text()
      responseData = text ? JSON.parse(text) : null
    } catch (err) {
      console.warn("Brevo response is not valid JSON:", err)
    }

    if (!brevoResponse.ok) {
      if (brevoResponse.status === 400 && responseData?.code === "duplicate_parameter") {
        return NextResponse.json({ message: "Email is already subscribed to our newsletter" }, { status: 200 })
      }

      console.error("Brevo API error:", responseData)
      return NextResponse.json({ error: "Failed to subscribe to newsletter" }, { status: brevoResponse.status })
    }

    return NextResponse.json({ message: "Successfully subscribed to newsletter!" }, { status: 200 })
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
