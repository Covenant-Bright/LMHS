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
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Osoba Branch Excellence</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Nestled in the peaceful Osoba area, our school provides an ideal learning environment where students can
              focus on their academic pursuits while developing essential life skills and values.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our Osoba branch is known for its strong community ties and commitment to producing well-rounded
              individuals who are prepared to make positive contributions to society.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                Leadership Training
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                Community Focus
              </span>
              <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium">
                Character Building
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
              <Image src="/images/IMG_3679.webp" alt="School branch" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
