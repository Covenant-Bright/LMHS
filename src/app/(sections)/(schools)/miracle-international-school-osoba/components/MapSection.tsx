"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Clock, Calendar } from "lucide-react"

export default function MapSection() {
  // Enhanced embed URL with purple marker for Osoba
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12324.074805290466!2d3.8730409266467682!3d7.365824032292071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d57361985db%3A0xd358922aea2b5a57!2sMiracle%20International%20Nursery%20%26%20Primary%20School!5e1!3m2!1sen!2sng!4v1754170494886!5m2!1sen!2sng&markers=color:purple%7Clabel:O%7C7.37222,3.90036"

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Find Our Osoba Branch</h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Located in the tranquil Osoba area, our branch offers easy access and a conducive learning environment. Use
            our map to navigate to our peaceful school.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div
                className="relative w-full bg-white rounded-lg shadow-lg overflow-hidden"
                style={{ height: "450px" }}
              >
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Miracle International School Osoba Location Map"
                  className="rounded-lg"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
  <div className="bg-white p-6 rounded-lg shadow-lg">
  <h4 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
    <MapPin className="w-5 h-5 text-purple-700" />
    Contact Information
  </h4>
  <div className="space-y-3">
    <div className="flex items-start gap-3">
      <MapPin className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
      <div>
        <p className="font-medium text-gray-900">Address</p>
        <p className="text-gray-800 text-sm">
          Agbokojo Area, Osoba, Ibadan, Oyo State, Nigeria
        </p>
      </div>
    </div>
    <div className="flex items-start gap-3">
      <Phone className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
      <div>
        <p className="font-medium text-gray-900">Phone</p>
        <p className="text-gray-800 text-sm">+234 803 391 6011</p>
      </div>
    </div>
    <div className="flex items-start gap-3">
      <Clock className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
      <div>
        <p className="font-medium text-gray-900">School Hours</p>
        <p className="text-gray-800 text-sm">Mon - Thur: 7:30 AM - 5:00 PM</p>
        <p className="text-gray-800 text-sm">Fri: 7:30 AM - 2:00 PM</p>
      </div>
    </div>
  </div>
</div>


           
          </motion.div>
        </div>
      </div>
    </section>
  )
}
