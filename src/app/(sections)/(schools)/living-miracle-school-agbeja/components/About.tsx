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
              <Image src="/images/IMG_3723.webp" alt="School activities" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Living Miracle Agbeja</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Living Miracle School Agbeja stands as a testament to our commitment to holistic education. We combine
              academic excellence with moral and spiritual development, creating an environment where students thrive in
              all aspects of life.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our Agbeja branch is designed to nurture not just intellectual growth but also character development,
              preparing students to become responsible leaders and positive change agents in their communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                Holistic Education
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                Spiritual Development
              </span>
              <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">
                Community Service
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
