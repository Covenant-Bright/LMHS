"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Calendar, User, X, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

const SubscriptionModal = ({ isOpen, onClose }: SubscriptionModalProps) => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setStatus("idle")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "Successfully subscribed to newsletter!")
        setEmail("")
        setTimeout(() => {
          onClose()
          setStatus("idle")
          setMessage("")
        }, 2000)
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Subscribe to Updates</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              Stay informed with the latest news, events, and announcements from Miracle International Schools.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
            <input
  type="email"
  id="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email address"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-500 disabled:opacity-70"
  required
  disabled={isLoading}
/>
            </div>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm">{message}</span>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{message}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Subscribe Now
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-xs text-gray-500 text-center">
            By subscribing, you agree to receive email updates from Miracle International Schools. You can unsubscribe
            at any time.
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Hero() {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false)

  const scrollToFeaturedStories = () => {
    const featuredSection = document.getElementById("featured-stories")
    if (featuredSection) {
      featuredSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <>
      <section className="relative min-h-[60vh] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Latest Updates</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Latest News &<span className="block text-yellow-300">Updates</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed"
              >
                Stay informed with the latest happenings, achievements, and announcements from Miracle International
                Schools across all our branches.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={scrollToFeaturedStories}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Read Latest News
                </button>
                <button
                  onClick={() => setIsSubscriptionModalOpen(true)}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  Subscribe to Updates
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-300">4</div>
                  <div className="text-sm text-blue-200">News Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-300">2</div>
                  <div className="text-sm text-blue-200">Events Monthly</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-300">100%</div>
                  <div className="text-sm text-blue-200">Coverage</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Featured News Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="/images/slide2.webp?height=256&width=400"
                    alt="Featured News"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Breaking News
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>September 15, 2025</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>Admin</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                   School resumes on September 15th, 2025.
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Students from all branches are expected to resume on the designated date, fully prepared with their books for the current session.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={() => setIsSubscriptionModalOpen(false)} />
    </>
  )
}
