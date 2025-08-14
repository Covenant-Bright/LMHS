"use client"
import { useState } from "react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { FaImage } from "react-icons/fa" // Fallback icon

export default function Intro() {
  // Remove the unused state variable
  const [brokenImages, setBrokenImages] = useState<boolean[]>([false, false, false])

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  const { ref: imagesRef, inView: imagesInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  // Handle broken images
  const handleImageError = (index: number) => {
    setBrokenImages((prev) => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text content */}
          <div
            ref={textRef}
            className={`transition-all duration-700 ${
              textInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3d4c] mb-6">
              Learn More About Our Day Care
            </h2>
            <p className="text-gray-600 mb-4">
              At Miracle School&apos;s Day Care, we offer a warm, nurturing environment where young children
              can grow and develop at their own pace. Our experienced staff is dedicated to creating a safe
              and supportive atmosphere that fosters curiosity, creativity, and social development. We focus
              on individualized care, ensuring that each child&apos;s needs are met, while providing age-
              appropriate activities that stimulate cognitive, emotional, and physical growth.
            </p>
            <p className="text-gray-600 mb-6">
              Our Day Care program is designed to provide children with the foundation for lifelong
              learning. With a balanced blend of play-based learning and structured activities, we help them
              build confidence, independence, and essential life skills.
            </p>
          </div>

          {/* Images */}
          <div
            ref={imagesRef}
            className={`relative h-[500px] md:h-[500px] transition-opacity duration-1000 ${
              imagesInView ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Main circular image */}
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-72 md:h-72 main-image rounded-full overflow-hidden border-8 border-white shadow-xl transition-all duration-1000 hover:border-red-500 transition-colors duration-300 ${
                imagesInView ? "scale-100" : "scale-90"
              }`}
            >
              {brokenImages[0] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <FaImage className="text-6xl text-gray-400" />
                </div>
              ) : (
                <Image
                  src="/images/daycare.webp?height=400&width=400"
                  alt="Children learning"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  onError={() => handleImageError(0)} // Handle broken image
                />
              )}
            </div>

            
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 480px) and (max-width: 768px) {
          .main-image {
            width: 20rem;
            height: 20rem;
          }
          .small-image {
            width: 10rem;
            height: 10rem;
          }
        }
        @media (max-width: 359px) {
          .main-image {
            width: 16rem;
            height: 16rem;
          }
        }
      `}</style>
    </section>
  )
}

