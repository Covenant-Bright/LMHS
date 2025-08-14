"use client"

import { motion } from "framer-motion"
import EmbeddedMap from "@/components/EmbeddedMap"

export default function MapSection() {
  // Google Maps embed URL with marker for Living Miracle School Agbeja
  // Added marker parameter to always show school location
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3484.061500977583!2d3.878346392030771!3d7.3629025008015265!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sng!4v1754163705205!5m2!1sen!2sng" 

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Find Us
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Agbeja Branch</h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Located in the heart of Agbeja community, our branch is easily accessible and provides a safe, nurturing
            environment for learning. Use the interactive map below to get directions and plan your visit.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
            <p className="text-gray-600 text-sm">Agbeja, behind Ansarudeen Mosque, Ososami, Ibadan, Oyo State, Nigeria</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
            <p className="text-gray-600 text-sm">+234 803 391 6011</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">School Hours</h4>
            <p className="text-gray-600 text-sm">Mon - Thur: 7:30 AM - 5:00 PM</p>
            <p className="text-gray-600 text-sm">Fri: 7:30 AM - 2:00 PM</p>
          </motion.div>
        </div>

        <EmbeddedMap
          embedUrl={embedUrl}
          schoolName="Living Miracle School - Agbeja"
          height={500}
          className="shadow-2xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
        
        </motion.div>
      </div>
    </section>
  )
}
