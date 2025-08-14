'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { GraduationCap, Users, BookOpen, UserCheck, ArrowRight, Sparkles } from 'lucide-react'

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-25 animate-pulse"></div>
          <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-blue-300 rounded-full opacity-20 animate-bounce"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            School <span className="text-blue-600">Portals</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Access your personalized dashboard for academic management, communication, and school resources
          </motion.p>

          {/* Portal Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Portal */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Link href="/student-portal">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Student Portal</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Access your grades, assignments, class schedules, and communicate with teachers
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                        Academic Records & Grades
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        Class Schedules & Timetables
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                        Assignments & Resources
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mb-4">
                      Coming Soon - 2025
                    </div>

                    {/* Button */}
                    <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700">
                      Access Portal
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Teacher Portal */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Link href="/teacher-portal">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <UserCheck className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Teacher Portal</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Manage classes, track student progress, and communicate with parents
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-green-500" />
                        Student Management
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="w-4 h-4 mr-2 text-green-500" />
                        Grade & Assessment Tools
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Sparkles className="w-4 h-4 mr-2 text-green-500" />
                        Parent Communication
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mb-4">
                      Coming Soon - 2025
                    </div>

                    {/* Button */}
                    <div className="flex items-center justify-center text-green-600 font-semibold group-hover:text-green-700">
                      Access Portal
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 max-w-2xl mx-auto"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h4>
            <p className="text-gray-600 mb-4">
              Contact our IT support team for portal access assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@lmhs.sch.ng"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Email Support
              </a>
              <a
                href="tel:+2348137373574"
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300"
              >
                Call Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
