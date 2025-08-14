"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, X, RefreshCw } from "lucide-react"

interface BannerProps {
  errorMessage: string
  onReconnect: () => void
}

export const Banner: React.FC<BannerProps> = ({ errorMessage, onReconnect }) => {
  const [isReconnecting, setIsReconnecting] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  const isSuccess = errorMessage === "Internet Connection restored. Reconnecting..."
  const isUnstable = errorMessage === "Unstable connection to server. You might experience delays."

  useEffect(() => {
    if (isReconnecting) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 4
        })
      }, 40)

      return () => {
        clearInterval(interval)
      }
    } else {
      setProgress(0)
    }
  }, [isReconnecting])

  const handleReconnect = async () => {
    setIsReconnecting(true)
    await onReconnect()
    setTimeout(() => {
      setIsReconnecting(false)
      setProgress(0)
    }, 1000)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  // Show reconnect button only for regular error messages (not for success or unstable messages)
  const showButton = !isUnstable && !isSuccess

  if (!isVisible) return null

  return (
    <div
      role="alert"
      className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div
        className={`relative mx-auto max-w-md md:max-w-lg border-l-4 overflow-hidden mt-0 shadow-2xl ${
          isSuccess
            ? "bg-emerald-600 border-emerald-300 text-white"
            : isUnstable
              ? "bg-amber-600 border-amber-300 text-white"
              : "bg-red-600 border-red-300 text-white"
        }`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-full transform -translate-y-20 translate-x-20" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-white/20 via-white/10 to-transparent rounded-full transform translate-y-20 -translate-x-20" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        </div>

        {/* Glowing accent */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[4px] ${
            isSuccess ? "bg-emerald-300" : isUnstable ? "bg-amber-300" : "bg-red-300"
          }`}
        >
          <div
            className={`absolute top-0 left-0 w-2 h-full ${
              isSuccess ? "bg-emerald-200" : isUnstable ? "bg-amber-200" : "bg-red-200"
            } blur-md`}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-3 relative z-10">
          <div className="flex items-center space-x-3 flex-1">
            <div
              className={`relative w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center ${
                isSuccess
                  ? "bg-emerald-700 text-emerald-100"
                  : isUnstable
                    ? "bg-amber-700 text-amber-100"
                    : "bg-red-700 text-red-100"
              }`}
            >
              {isSuccess ? (
                <CheckCircle className="w-6 h-6" />
              ) : isUnstable ? (
                <AlertCircle className="w-6 h-6 animate-pulse" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
              <div
                className={`absolute inset-0 rounded-full ${
                  isSuccess
                    ? "animate-ping-slow bg-emerald-200/70"
                    : isUnstable
                      ? "animate-ping-slow bg-amber-200/70"
                      : "animate-ping-slow bg-red-200/70"
                }`}
              />
            </div>
            <span className="text-base font-medium tracking-wide">{errorMessage}</span>
          </div>

          <div className="flex items-center space-x-2 ml-2">
            {showButton && (
              <button
                onClick={handleReconnect}
                disabled={isReconnecting}
                className={`group relative px-5 py-2 text-sm font-medium rounded-md transition-all duration-300 overflow-hidden ${
                  isReconnecting
                    ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                    : "bg-white/90 hover:bg-white text-red-600 hover:text-red-700 active:scale-95 border border-red-300/50"
                }`}
              >
                {isReconnecting ? (
                  <>
                    <span className="relative z-10 flex items-center">
                      <RefreshCw className="w-4 h-4 mr-1.5 animate-spin" />
                      Reconnecting
                    </span>
                    <div className="absolute bottom-0 left-0 h-1 bg-red-500" style={{ width: `${progress}%` }} />
                  </>
                ) : (
                  <>
                    <span className="relative z-10 font-bold">Reconnect</span>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-200/0 via-red-200/50 to-red-200/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </>
                )}
              </button>
            )}

            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white rounded-full p-2 transition-colors duration-200 hover:bg-white/20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Animated border bottom */}
        <div className="h-[3px] w-full overflow-hidden">
          <div
            className={`h-full ${
              isSuccess
                ? "bg-gradient-to-r from-emerald-300/0 via-emerald-300 to-emerald-300/0"
                : isUnstable
                  ? "bg-gradient-to-r from-amber-300/0 via-amber-300 to-amber-300/0"
                  : "bg-gradient-to-r from-red-300/0 via-red-300 to-red-300/0"
            } animate-shimmer`}
          />
        </div>
      </div>

      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s infinite;
        }
      `}</style>
    </div>
  )
}

