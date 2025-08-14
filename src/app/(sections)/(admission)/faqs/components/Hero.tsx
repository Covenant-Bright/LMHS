"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react"
import { useCallback } from "react"

export default function Hero() {
  const handleContactClick = useCallback(() => {
    window.location.href = 'tel:+2348033916011';
  }, []);

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-25 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4 mr-2" />
              Frequently Asked Questions
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Got <span className="text-purple-600">Questions?</span> We Have Answers
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find answers to the most commonly asked questions about our admission process, academic programs, and
              school policies.
            </p>

            {/* Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center p-4 bg-white rounded-lg shadow-md"
              >
                <Phone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-800">Call Us</div>
                <div className="text-xs text-gray-600">+234 803 391 6011</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center p-4 bg-white rounded-lg shadow-md"
              >
                <Mail className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-800">Email Us</div>
                <div className="text-xs text-gray-600">info@lmhs.sch.ng</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center p-4 bg-white rounded-lg shadow-md"
              >
                <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-800">Live Chat</div>
                <div className="text-xs text-gray-600">Available 9AM-5PM</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={handleContactClick}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold"
              >
                Contact Admission Office
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <Image
                src="/images/faq-animated.webp"
                alt="Students asking questions"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />

              {/* Floating Question Marks */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-6 -left-6 bg-white p-3 rounded-full shadow-lg"
              >
                <HelpCircle className="w-8 h-8 text-purple-600" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                className="absolute -bottom-6 -right-6 bg-white p-3 rounded-full shadow-lg"
              >
                <MessageCircle className="w-8 h-8 text-pink-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}