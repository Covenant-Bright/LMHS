"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

export default function ContactForms() {
  // Support form state
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    request: "",
  })

  // Newsletter form state
  const [newsletterEmail, setNewsletterEmail] = useState("")

  // Loading states
  const [supportLoading, setSupportLoading] = useState(false)
  const [newsletterLoading, setNewsletterLoading] = useState(false)

  // Success and error messages state
  const [supportMessage, setSupportMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const [newsletterMessage, setNewsletterMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  // Ref for the phone element to apply wiggle animation
  const phoneRef = useRef<HTMLDivElement>(null)

  // Check if the component is in view
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  // Handle support form submission
  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSupportLoading(true)
    setSupportMessage(null)

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supportForm),
      })

      const data = await response.json()

      if (response.ok) {
        setSupportMessage({
          type: "success",
          text: data.message || "Support request sent successfully!",
        })
        setSupportForm({ name: "", email: "", request: "" })
      } else {
        setSupportMessage({
          type: "error",
          text: data.error || "Failed to send support request",
        })
      }
    } catch {
      setSupportMessage({
        type: "error",
        text: "Network error. Please try again.",
      })
    } finally {
      setSupportLoading(false)
      // Hide message after 5 seconds
      setTimeout(() => setSupportMessage(null), 5000)
    }
  }

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterLoading(true)
    setNewsletterMessage(null)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail }),
      })

      const data = await response.json()

      if (response.ok) {
        setNewsletterMessage({
          type: "success",
          text: data.message || "Successfully subscribed to newsletter!",
        })
        setNewsletterEmail("")
      } else {
        setNewsletterMessage({
          type: "error",
          text: data.error || "Failed to subscribe to newsletter",
        })
      }
    } catch {
      setNewsletterMessage({
        type: "error",
        text: "Network error. Please try again.",
      })
    } finally {
      setNewsletterLoading(false)
      // Hide message after 5 seconds
      setTimeout(() => setNewsletterMessage(null), 5000)
    }
  }

  // Apply wiggle animation to phone when in view
  useEffect(() => {
    if (!inView || !phoneRef.current) return

    const wiggleAnimation = [
      { transform: "rotate(0deg)" },
      { transform: "rotate(-10deg)" },
      { transform: "rotate(10deg)" },
      { transform: "rotate(-5deg)" },
      { transform: "rotate(0deg)" },
    ]

    const wiggleTiming = {
      duration: 1000,
      iterations: 1,
    }

    const wiggleInterval = setInterval(() => {
      phoneRef.current?.animate(wiggleAnimation, wiggleTiming)
    }, 3000)

    return () => clearInterval(wiggleInterval)
  }, [inView])

  return (
    <section ref={ref} className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Newsletter Subscription Card */}
          <div className="w-full md:w-1/2">
            <div className="relative shadow-lg overflow-hidden rounded-3xl">
              <div className="bg-black/20 p-8">
                <div className="bg-white p-8 rounded-xl shadow-lg relative z-10 overflow-hidden">
                  {/* Background decorative element */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-gray-500 to-gray-300 rounded-full opacity-50 z-0"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-gray-500 to-gray-300 rounded-full opacity-50 z-0"></div>

                  <div className="relative z-10">
                    <h2
                      className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center mb-8 text-gray-800 tracking-wide break-words"
                      style={{
                        WebkitTextStroke: "1px #ccc",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      SUBSCRIBE TO OUR NEWSLETTER
                    </h2>

                    <form onSubmit={handleNewsletterSubmit}>
                      {newsletterMessage && (
                        <div
                          className={`mb-6 p-3 rounded-md text-sm font-medium text-center ${
                            newsletterMessage.type === "success"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {newsletterMessage.text}
                        </div>
                      )}

                      <div className="mb-8">
                        <input
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Your E-Mail"
                          className="w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent text-gray-800 placeholder-gray-500 text-lg"
                          required
                          disabled={newsletterLoading}
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={newsletterLoading}
                          className="px-8 py-2 bg-gray-600 text-white font-semibold text-sm rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {newsletterLoading ? "SUBMITTING..." : "SUBMIT"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Form Card */}
          <div className="w-full md:w-1/2">
            <div className="relative shadow-md overflow-hidden rounded-3xl">
              <div className="bg-black/20 p-6">
                <div className="bg-white p-6 rounded-xl shadow-lg relative z-10 overflow-hidden">
                  {/* Background decorative elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-[#A89C94] to-[#D9CFC7] rounded-full opacity-50 z-0"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-[#A89C94] to-[#D9CFC7] rounded-full opacity-50 z-0"></div>

                  <div className="relative z-10 flex flex-col md:flex-row">
                    {/* Phone SVG updated to a soft neutral tone */}
                    <div ref={phoneRef} className="w-full md:w-1/3 flex items-center justify-center mb-6 md:mb-0">
                      <svg
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-md"
                      >
                        {/* Phone receiver */}
                        <path
                          d="M40 30C40 24.4772 44.4772 20 50 20H70C75.5228 20 80 24.4772 80 30V40C80 45.5228 75.5228 50 70 50H50C44.4772 50 40 45.5228 40 40V30Z"
                          fill="#A89C94" /* Warm neutral tone */
                        />
                        <path
                          d="M40 80C40 74.4772 44.4772 70 50 70H70C75.5228 70 80 74.4772 80 80V90C80 95.5228 75.5228 100 70 100H50C44.4772 100 40 95.5228 40 90V80Z"
                          fill="#A89C94"
                        />

                        {/* Phone cord */}
                        <path d="M60 50V70" stroke="#A89C94" strokeWidth="6" strokeLinecap="round" />
                        <path
                          d="M60 100C60 100 60 110 50 110C40 110 30 110 30 110"
                          stroke="#A89C94"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray="0,10"
                        />

                        {/* Circular patterns on receivers */}
                        <circle cx="60" cy="35" r="8" fill="#D9CFC7" fillOpacity="0.6" />
                        <circle cx="60" cy="35" r="4" fill="#D9CFC7" fillOpacity="0.8" />
                        <circle cx="60" cy="85" r="8" fill="#D9CFC7" fillOpacity="0.6" />
                        <circle cx="60" cy="85" r="4" fill="#D9CFC7" fillOpacity="0.8" />
                      </svg>
                    </div>

                    {/* Form content */}
                    <div className="w-full md:w-2/3 md:pl-6">
                      <h2
                        className="text-2xl font-bold text-[#5E504B] text-center tracking-wide 
                        [text-shadow:_-1px_-1px_0_#D9CFC7,1px_-1px_0_#D9CFC7,-1px_1px_0_#D9CFC7,1px_1px_0_#D9CFC7]"
                      >
                        Need support?
                      </h2>

                      <p className="text-[#6E5E58] text-sm font-medium mt-1">
                        Contact us if you need further assistance.
                      </p>

                      <form onSubmit={handleSupportSubmit} className="mt-5">
                        {supportMessage && (
                          <div
                            className={`mb-4 p-3 rounded-md text-sm font-medium ${
                              supportMessage.type === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {supportMessage.text}
                          </div>
                        )}

                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-[#6E5E58] mb-1">
                            Name and surname
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={supportForm.name}
                            onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                             className="w-full p-3 bg-[#EDE7E4] rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-[#A89C94]/50 text-[#5E504B]"
                            required
                            disabled={supportLoading}
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-[#6E5E58] mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={supportForm.email}
                            onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                             className="w-full p-3 bg-[#EDE7E4] rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-[#A89C94]/50 text-[#5E504B]"
                            required
                            disabled={supportLoading}
                          />
                        </div>

                        <div className="mb-5">
                          <label htmlFor="request" className="block text-sm font-medium text-[#6E5E58] mb-1">
                            Please enter the details of your request.
                          </label>
                          <textarea
                            id="request"
                            value={supportForm.request}
                            onChange={(e) => setSupportForm({ ...supportForm, request: e.target.value })}
                            rows={3}
                             className="w-full p-3 bg-[#EDE7E4] rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-[#A89C94]/50 text-[#5E504B]"
                            required
                            disabled={supportLoading}
                          ></textarea>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={supportLoading}
                            className="px-6 py-2 bg-[#5E504B] text-white font-semibold text-sm rounded-md hover:bg-[#4A3F3A] focus:outline-none focus:ring-2 focus:ring-[#5E504B] focus:ring-offset-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {supportLoading ? "SUBMITTING..." : "SUBMIT"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
