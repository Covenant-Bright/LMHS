"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react"
import EmbeddedMap from "@/components/EmbeddedMap"

export default function MapSection() {
  // Google Maps embed URL for Miracle International School Ososami with marker
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24648.087762159357!2d3.8341234282653605!3d7.366936106595446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398db0d0d7d947%3A0x48fdc3c3133b2374!2sMiracle%20International%20School!5e1!3m2!1sen!2sng!4v1754168815089!5m2!1sen!2sng&markers=color:yellow%7Clabel:M%7C7.36664,3.85427"

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">
            Visit Our School
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Find Us in Ososami</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Located in Ososami area, our school is easily accessible and provides a safe, nurturing
            environment for learning and growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Address Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">School Address</h4>
                  <p className="text-gray-600">
                    Ososami area
                    <br />
                    Ibadan, Oyo State
                    <br />
                    Nigeria
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Us</h4>
                  <p className="text-gray-600">
                    +234 803 391 6011
                    <br />
                    info@lmhs.sch.ng
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">School Hours</h4>
                  <p className="text-gray-600">
                    Monday - Thursday: 7:30 AM - 5:00 PM
                    <br />
                    Friday: 7:30 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>

       
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <EmbeddedMap
              embedUrl={embedUrl}
              schoolName="Miracle International School - Ososami"
              height={500}
              className="h-full min-h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
