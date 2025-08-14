"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image src="/images/IMG_3760.webp" alt="Living Miracle School Agbeja" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white px-4 max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase">Living Miracle School</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-red-400">Agbeja Branch</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Transforming lives through quality education and spiritual development in the vibrant Agbeja community.
        </p>
      </motion.div>
    </section>
  )
}
