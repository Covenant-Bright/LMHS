"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/IMG_3757.webp"
          alt="Miracle International School Osoba"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white px-4 max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase">Miracle International School</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-purple-400">Osoba Branch</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Building tomorrow&apos;s leaders through comprehensive education and character formation in the serene Osoba
          environment.
        </p>
      </motion.div>
    </section>
  )
}
