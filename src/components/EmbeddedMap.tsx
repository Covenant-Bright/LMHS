"use client"

import { motion } from "framer-motion"

interface EmbeddedMapProps {
  embedUrl: string
  schoolName: string
  height?: number
  className?: string
}

export default function EmbeddedMap({ embedUrl, schoolName, height = 450, className = "" }: EmbeddedMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative w-full bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${schoolName} Location Map`}
        className="rounded-lg"
      />
    </motion.div>
  )
}
