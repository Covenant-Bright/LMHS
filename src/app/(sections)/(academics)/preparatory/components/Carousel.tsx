"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FaImage } from "react-icons/fa" // Fallback icon

interface CarouselProps {
  autoSlideInterval?: number
}

export default function Carousel({ autoSlideInterval = 6000 }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [brokenImages, setBrokenImages] = useState<boolean[]>([]) // Track broken images
  const slideRef = useRef<HTMLDivElement>(null)

  // Sample carousel items - replace with your actual images and content
  const slides = [
    {
      image: "/images/IMG_3704.webp",
      title: "Foundational Academic Skills",
      content:
        "Our Preparatory Classes focus on building essential literacy and numeracy skills. Through engaging activities and interactive lessons, students develop a solid foundation in reading, writing, and basic math, preparing them for the next educational phase.",
    },
    {
      image: "/images/IMG_3716.webp",
      title: "Student-Centered Learning",
      content: "In Preparatory Classes, children are encouraged to develop social skills such as cooperation, sharing, and communication. Guided interactions and group activities help them build self-confidence, emotional regulation, and empathy, ensuring they are well-prepared for primary school.",
    },
    {
      image: "/images/slide3.webp",
      title: "Community Engagement",
      content: "We integrate play-based learning into the curriculum to foster curiosity and creativity. Children explore concepts through hands-on activities, play, and discovery, helping them develop critical thinking and problem-solving skills in a fun, supportive environment.",
    },
  ]

  // Initialize broken image tracking
  useEffect(() => {
    setBrokenImages(new Array(slides.length).fill(false))
  }, [slides.length])

  // Handle automatic slide transition
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [currentSlide, autoSlideInterval, nextSlide])

  // Handle touch events for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Handle broken images
  const handleImageError = (index: number) => {
    setBrokenImages((prev) => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4 lg:px-24">
        <div
          className="flex flex-col md:flex-row gap-8 items-center overflow-hidden mt-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={slideRef}
        >
          {/* Image section */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
            <div
              className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full h-full relative">
                  {brokenImages[index] ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <FaImage className="text-6xl text-gray-400" />
                    </div>
                  ) : (
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                      onError={() => handleImageError(index)} // Handle broken images
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Content section */}
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden h-full">
              <div
                className="transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="flex">
                  {slides.map((slide, index) => (
                    <div key={index} className="min-w-full px-4">
                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#D2B48C] drop-shadow-lg mb-6">
                        {slide.title}
                     </h2>
                      <p className="text-gray-900 text-lg">{slide.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center mt-8 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-black w-8" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

