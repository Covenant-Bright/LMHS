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
              Learn More About Our Primary Classes
            </h2>
            <p className="text-gray-600 mb-4">
              Our Primary Classes provide a structured and engaging learning environment where children
              develop a strong academic foundation. With a focus on subjects such as math, science,
              language arts, and social studies, our experienced educators create interactive lessons that
              cater to diverse learning styles, ensuring each child&apos;s needs are met.
            </p>
            <p className="text-gray-600 mb-6">
              Beyond academics, we emphasize critical thinking, problem-solving, and communication skills.
              Through hands-on activities, group projects, and extracurricular opportunities, students are
              encouraged to grow into confident, well-rounded individuals, equipped with the tools
              necessary to excel in their future educational journey and beyond.
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
                  src="/images/IMG_3709.webp?height=400&width=400"
                  alt="Children learning"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                  onError={() => handleImageError(0)} // Handle broken image
                />
              )}
            </div>

            {/* Small circular image - top right */}
            <div
              className={`absolute top-0 right-0 md:right-12 w-36 h-36 md:w-36 md:h-36 small-image rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-1000 delay-200 hover:border-red-500 transition-colors duration-300 ${
                imagesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {brokenImages[1] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <FaImage className="text-4xl text-gray-400" />
                </div>
              ) : (
                <Image
                  src="/images/IMG_3717.webp?height=200&width=200"
                  alt="Child with art supplies"
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="object-cover"
                  onError={() => handleImageError(1)} // Handle broken image
                />
              )}
            </div>

            {/* Small circular image - bottom left */}
            <div
              className={`absolute bottom-0 left-8 md:left-0 w-36 h-36 md:w-36 md:h-36 small-image rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-1000 delay-400 hover:border-red-500 transition-colors duration-300 ${
                imagesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {brokenImages[2] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <FaImage className="text-4xl text-gray-400" />
                </div>
              ) : (
                <Image
                  src="/images/IMG_3683.webp?height=200&width=200"
                  alt="Child playing"
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="object-cover"
                  onError={() => handleImageError(2)} // Handle broken image
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

