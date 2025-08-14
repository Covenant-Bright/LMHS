"use client"

import { Home, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F]">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full"> {/* Reduced from max-w-2xl to max-w-md */}
          {/* Professional Error Card - reduced padding */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 text-center overflow-hidden border border-gray-200">
            {/* Premium Abstract Background */}
            <div className="absolute inset-0 overflow-hidden z-0">
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-r from-[#0A192F]/5 via-[#112240]/10 to-transparent"></div>
              <div className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full bg-gradient-to-r from-[#0A192F]/5 via-[#112240]/10 to-transparent"></div>
              
              {/* Geometric Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-48 h-48 border-t-2 border-r-2 border-[#112240] rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 border-b-2 border-l-2 border-[#112240] rounded-bl-2xl"></div>
              </div>
            </div>

            <div className="relative z-10">
              {/* Elegant 404 - reduced size */}
              <div className="mb-6 relative">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-[#0A192F]/10 rounded-full animate-pulse-slow"></div>
                    <h1 className="text-6xl font-light text-[#0A192F] tracking-tighter"> {/* Reduced size */}
                      404
                    </h1>
                  </div>
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-[#FFD700] to-[#FFA000] mx-auto mt-3 rounded-full"></div>
              </div>

              {/* Error Title - reduced text size */}
              <h2 className="text-2xl font-light text-[#0A192F] mb-3 tracking-tight"> {/* Reduced size */}
                Page Not Found
              </h2>

              {/* Professional Description - reduced text size */}
              <p className="text-gray-600 mb-6 text-sm leading-relaxed max-w-xs mx-auto font-light"> {/* Reduced size */}
                The page you're looking for might have been moved or doesn't exist. Please verify the URL or navigate using the options below.
              </p>

              {/* Sophisticated Action Buttons - reduced padding */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center"> {/* Reduced gap */}
                {/* Primary Button */}
                <button
                  onClick={handleGoHome}
                  className="relative group flex-1 bg-[#0A192F] text-white font-medium py-2.5 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border border-[#0A192F] hover:bg-[#112240] text-sm" 
                >
                  <div className="flex items-center justify-center gap-2">
                    <Home size={16} className="transition-transform group-hover:scale-110" /> {/* Reduced size */}
                    <span className="tracking-wide">Home Page</span>
                  </div>
                </button>

                {/* Secondary Button */}
                <button
                  onClick={handleGoBack}
                  className="relative group flex-1 bg-white text-[#0A192F] font-medium py-2.5 px-5 rounded-lg border border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md hover:bg-gray-50 text-sm" 
                >
                  <div className="flex items-center justify-center gap-2">
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> {/* Reduced size */}
                    <span className="tracking-wide">Go Back</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Professional Support Text - reduced text size */}
          <div className="mt-6 text-center"> {/* Reduced margin */}
            <p className="text-xs text-gray-400 font-light"> {/* Reduced size */}
              Require further assistance? Contact our support team at{" "}
              <a
                href="mailto:info@lmhs.sch.ng"
                className="text-[#FFD700] hover:text-[#FFA000] font-medium transition-colors"
              >
                info@lmhs.sch.ng
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}