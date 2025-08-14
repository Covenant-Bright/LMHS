import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simple health check response
    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        message: "Server is healthy",
      },
      { status: 200 },
    )
  } catch (error) {
  console.error("Health check error:", error)
  return NextResponse.json(
    {
      status: "error",
      timestamp: new Date().toISOString(),
      message: "Server health check failed",
    },
    { status: 500 },
  )
}

}
