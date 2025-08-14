"use client"

import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { useEffect, useState } from "react"
import { FaImage } from "react-icons/fa" // Fallback icon for broken images

export default function Mission() {
  // Only destructure the values we actually use
  const [sectionRef, isInView] = useInView({
    threshold: [0.1, 0.5],
  });

  const [isAnimated, setIsAnimated] = useState(false)
  const [isImageBroken, setIsImageBroken] = useState(false) // Track if image fails

  useEffect(() => {
    if (isInView) {
      setIsAnimated(true)
    } else {
      setIsAnimated(false)
    }
  }, [isInView])

  // Handle broken image
  const handleImageError = () => {
    setIsImageBroken(true)
  }

  return (
    <section ref={sectionRef} className="w-full py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-24">
        <div className="flex flex-col md:flex-row items-center gap-8 relative">
          {/* Text Section */}
          <div
            className={`w-full md:w-1/2 transition-transform duration-1000 ${
              isAnimated ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <h2 className="inline-block text-4xl font-extrabold tracking-wider uppercase text-[#d4af37] border border-gray-700 rounded px-4 py-1 mb-6">
  Mission
</h2>

            <p className="text-gray-700">
              Our Vision is dedicated to providing a holistic, inclusive education that empowers students
              to excel academically, socially, and emotionally. Our mission is to create a dynamic learning
              community that celebrates diversity and fosters a passion for learning. We aim to equip
              students with the skills, knowledge, and values needed to become compassionate leaders who
              contribute positively to society. By fostering a growth mindset, we ensure that every child has
              the opportunity to reach their full potential and succeed in a rapidly evolving world.
            </p>
          </div>

          {/* Demarcation Line (Only visible on md screens and above) */}
          <div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-full items-center justify-center"
            aria-hidden="true"
          >
            <div className={`w-[2px] bg-gray-400 transition-all duration-1000 ${isAnimated ? "h-full" : "h-0"}`}></div>
          </div>

          {/* Image Section with Broken Image Handling */}
          <div
            className={`w-full md:w-1/2 transition-transform duration-1000 delay-300 ${
              isAnimated ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            {isImageBroken ? (
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-md">
                <FaImage className="text-6xl text-gray-400" />
              </div>
            ) : (
              <Image
                src="/images/IMG_3721.webp?height=400&width=400"
                alt="Student engaged in creative learning"
                width={400}
                height={400}
                className="rounded-md object-cover w-full h-auto"
                onError={handleImageError} // Handle image load failure
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

