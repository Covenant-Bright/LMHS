"use client"

import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { useEffect, useState } from "react"
import { FaImage } from "react-icons/fa" // Fallback icon for broken images

export default function EducationalPhilosophy() {
  // Correctly destructure the values returned by useInView
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
              isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <h2 className="inline-block text-4xl font-extrabold tracking-wider uppercase text-[#d4af37] border border-gray-700 rounded px-4 py-1 mb-6">
  Educational Philosophy
</h2>

            <p className="text-gray-700">
              At Miracle School, we believe that education is not just about academic achievement but about
              nurturing the whole child. We embrace a student-centered approach that encourages curiosity,
              creativity, and collaboration. Our educational philosophy is rooted in respect for each child’s
              individuality, fostering an environment where students feel valued, safe, and motivated to
              learn. We aim to cultivate critical thinking, emotional intelligence, and a love for learning
              through personalized, engaging, and innovative teaching methods that prepare students for success in life.
            </p>
          </div>

          {/* Animated Demarcation Line (Only for md and above) */}
          <div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-full items-center justify-center"
            aria-hidden="true"
          >
            <div className={`w-[2px] bg-gray-400 transition-all duration-1000 ${isAnimated ? "h-full" : "h-0"}`}></div>
          </div>

          {/* Image Section with Broken Image Handling */}
          <div
            className={`w-full md:w-1/2 transition-transform duration-1000 delay-300 ${
              isAnimated ? "opacity-100 rotate-0" : "opacity-0 rotate-12"
            }`}
          >
            {isImageBroken ? (
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-md">
                <FaImage className="text-6xl text-gray-400" />
              </div>
            ) : (
              <Image
                src="/images/IMG_3715.webp?height=400&width=400"
                alt="Students engaged in learning"
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
