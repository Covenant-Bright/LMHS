"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-out" style={{ opacity: isLoaded ? 1 : 0 }}>
        <Image
          src="/images/slide1.webp"
          alt="About Us Background"
          fill
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Preparatory</h1>
      </div>

      {/* Bottom Clip Shape */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 bg-white"
        style={{
          clipPath: "polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)",
        }}
      ></div>
    </section>
  )
}

