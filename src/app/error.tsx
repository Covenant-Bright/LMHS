"use client"

import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          {/* Error Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
            {/* Error Icon */}
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle size={40} className="text-white" />
              </div>
            </div>

            {/* Error Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong!</h2>

            {/* Error Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              We encountered an unexpected error. Please try again or return to the homepage.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Try Again Button */}
              <button
                onClick={reset}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              >
                <RefreshCw size={20} />
                Try Again
              </button>

              {/* Go Home Button */}
              <button
                onClick={handleGoHome}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Go Home
              </button>
            </div>
          </div>

          {/* Additional Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              If this problem persists, please contact our{" "}
              <button
                onClick={() => router.push("/")}
                className="text-orange-500 hover:text-orange-600 underline font-medium"
              >
                support team
              </button>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
