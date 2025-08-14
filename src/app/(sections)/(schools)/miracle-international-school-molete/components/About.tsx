"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/IMG_3702.webp" alt="Students learning" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Excellence in Molete</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Molete  branch represents innovation in education, combining traditional values with modern teaching
              methodologies. We serve the diverse community of Molete with programs designed to meet the unique needs of
              each student.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              With state-of-the-art learning resources and a dedicated team of educators, our Molete branch continues to
              set standards in academic excellence and student development.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Innovation Hub
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                STEM Programs
              </span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                Arts & Culture
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
