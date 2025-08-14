"use client"

import { motion } from "framer-motion"
import { Construction, Clock, Wrench, Cog, Users, GraduationCap, Calendar } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-32 left-16 w-24 h-24 bg-green-400/20 rounded-full"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-60 right-24 w-18 h-18 bg-teal-400/20 rounded-full"
          animate={{
            y: [0, 25, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-14 h-14 bg-emerald-300/20 rounded-full"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
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
            <div className="relative mx-auto w-36 h-36 bg-orange-500/20 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Construction className="w-18 h-18 text-orange-400" />
              </motion.div>

              {/* Orbiting Tools */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Wrench className="absolute top-3 left-1/2 transform -translate-x-1/2 w-7 h-7 text-green-300" />
                <Cog className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-7 h-7 text-teal-300" />
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-emerald-300" />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-green-400" />
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
            Teacher Portal
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4">Under Development</h2>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              We&apos;re creating a comprehensive platform for parents to stay connected with their child&apos;s
              educational journey. Monitor progress, communicate with teachers, and access important school information.
            </p>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <GraduationCap className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Academic Progress</h3>
              <p className="text-green-100 text-sm">Track your child&apos;s grades and performance</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Calendar className="w-8 h-8 text-orange-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">School Calendar</h3>
              <p className="text-green-100 text-sm">Stay updated with events and schedules</p>
            </div>
         
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Clock className="w-8 h-8 text-emerald-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Attendance</h3>
              <p className="text-green-100 text-sm">Monitor attendance and punctuality</p>
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
                className="h-full bg-gradient-to-r from-orange-400 to-green-400"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ duration: 2.5, delay: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-green-100 mt-2">80% Complete</p>
          </motion.div>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="inline-block bg-orange-500 text-green-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg"
          >
            Launching 2025
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -120, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </section>
  )
}
