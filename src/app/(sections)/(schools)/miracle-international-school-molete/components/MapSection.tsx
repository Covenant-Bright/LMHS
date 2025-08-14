"use client"

import { motion } from "framer-motion"

export default function MapSection() {
  // Since we don't have the exact location, I'll create a general Molete area map
  // This is a reasonable approximation for the Molete district in Ibadan


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
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Find Our Molete Branch</h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Conveniently located in the bustling Molete area of Ibadan. Our s
            School is easily accessible and
            surrounded by vibrant community amenities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="bg-gray-100 rounded-lg h-[450px] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">M</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Molete Branch</h4>
                <p className="text-gray-600 mb-4">Located in the heart of Molete Area</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Address:</strong> Along Ibadan grammar, Molete, Ibadan.
                  </p>
                  <p>
                    <strong>Landmark:</strong> Near Molete Park
                  </p>
                  <p>
                    <strong>Area:</strong> Molete Area
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  onClick={() => window.open("https://maps.google.com/?q=Molete,Ibadan,Nigeria", "_blank")}
                >
                  Open in Google Maps
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Contact Information
              </h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong>Address:</strong>
                  <br />
                  Molete District, Ibadan
                  <br />
                  Oyo State, Nigeria
                </div>
                <div>
                  <strong>Phone:</strong>
                  <br />
                  +234 803 391 6011
                </div>
                <div>
                  <strong>Email:</strong>
                  <br />
                  info@lmhs.sch.ng
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                School Hours
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Thursday:</span>
                  <span>7:30 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>7:30 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday & Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

           

        
          </motion.div>
        </div>
      </div>
    </section>
  )
}
