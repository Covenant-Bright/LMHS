"use client"

import { motion } from "framer-motion"
import { Construction, Clock, Wrench, Cog, Users, BookOpen } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-indigo-400/20 rounded-full"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-12 h-12 bg-blue-300/20 rounded-full"
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          

          {/* Main Construction Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <div className="relative mx-auto w-32 h-32 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Construction className="w-16 h-16 text-yellow-400" />
              </motion.div>

              {/* Orbiting Tools */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Wrench className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 text-blue-300" />
                <Cog className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 text-indigo-300" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Student Portal
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-4">Under Construction</h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              We&apos;re building something amazing for our students. Our new portal will provide seamless access to
              grades, assignments, schedules, and much more.
            </p>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <BookOpen className="w-8 h-8 text-blue-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Academic Records</h3>
              <p className="text-blue-100 text-sm">Access grades, transcripts, and academic progress</p>
            </div>
           <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
  <Clock className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
  <h3 className="text-white font-semibold mb-2">Fees Payment</h3>
  <p className="text-blue-100 text-sm">Make and track school fee payments easily</p>
</div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Users className="w-8 h-8 text-indigo-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Communication</h3>
              <p className="text-blue-100 text-sm">Connect with teachers and classmates</p>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mb-8"
          >
            <div className="bg-white/20 rounded-full h-4 max-w-md mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-blue-400"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-blue-100 mt-2">75% Complete</p>
          </motion.div>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="inline-block bg-yellow-500 text-blue-900 px-6 py-3 rounded-full font-bold text-lg"
          >
            Coming Soon - 2025
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </section>
  )
}
