"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
  About Our Ososami Branch
</h3>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our Ososami branch stands as a beacon of educational excellence, providing comprehensive learning
              experiences from daycare through primary education. We pride ourselves on maintaining small class sizes
              that ensure personalized attention for every student.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Located in Ososami community, our school features modern facilities, experienced educators,
              and a nurturing environment that fosters both academic achievement and character development.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                Daycare - Primary
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Modern Facilities
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                Experienced Staff
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/IMG_3724.webp" alt="School facilities" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
