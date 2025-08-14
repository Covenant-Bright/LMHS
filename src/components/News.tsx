"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FaImage, FaTimes } from "react-icons/fa"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

export default function News() {
  const [brokenImages, setBrokenImages] = useState<boolean[]>([])
  const [selectedNewsIndex, setSelectedNewsIndex] = useState<number | null>(null)
  const [modalImageError, setModalImageError] = useState(false)

  const newsItems = [
    {
      image: "/images/slide1.webp",
      alt: "Enroll Today",
      title: "Now Enrolling for 2025/2026 Academic Session!",
      description: "Miracle Intl School Spotlight",
      fullContent: `Enrollment for the 2025/2026 academic session is officially open! Give your child the advantage of a world-class education at Miracle International School. Our modern facilities, dedicated educators, and well-rounded curriculum ensure not just academic success but also character growth, creativity, and confidence for the future.`
    },
    {
      image: "/images/IMG_3709.webp",
      alt: "School Resumes",
      title: "School Resumes on 15th September 2025",
      description: "Miracle Intl School Spotlight",
      fullContent: `Mark your calendars! The new academic year begins on Monday, September 15th, 2025. All students are expected to resume by 7:45 AM for our traditional welcome assembly, where we will share important updates for the term.

Key Information:
- Uniform schedule remains unchanged.
- Students are to come with their textbooks and writing materials during the first week.
- Punctuality and regular attendance will be monitored.
- School fees would be paid via the school portal.

We look forward to welcoming all students back for another exciting and productive school year!`
    },
    {
      image: "/images/IMG_3736.webp",
      alt: "Summer Coaching",
      title: "Summer Coaching would commence from the 11th of August 2025",
      description: "Miracle Intl School Spotlight",
      fullContent: `Beat the summer slump with our intensive academic enrichment program starting August 11th, 2025. Our summer coaching sessions are designed to help students:
- Strengthen core academic skills
- Prepare for advanced coursework
- Develop effective study techniques`
    },
  ]

  // Initialize broken image tracking
  useEffect(() => {
    setBrokenImages(new Array(newsItems.length).fill(false))
  }, [newsItems.length])

  // Handle broken images
  const handleImageError = (index: number) => {
    setBrokenImages((prev) => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  const handleModalOpen = (index: number) => {
    setSelectedNewsIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const handleModalClose = () => {
    setSelectedNewsIndex(null)
    setModalImageError(false)
    document.body.style.overflow = 'auto'
  }

  const navigateNews = (direction: 'prev' | 'next') => {
    if (selectedNewsIndex === null) return
    
    setModalImageError(false)
    if (direction === 'prev') {
      setSelectedNewsIndex(prev => {
        if (prev === null) return newsItems.length - 1
        return prev === 0 ? newsItems.length - 1 : prev - 1
      })
    } else {
      setSelectedNewsIndex(prev => {
        if (prev === null) return 0
        return prev === newsItems.length - 1 ? 0 : prev + 1
      })
    }
  }

  return (
    <section className="bg-gray-100 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">News</h2>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {newsItems.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : index === 1 ? 50 : 0, y: index === 2 ? 50 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: index === 0 ? -50 : index === 1 ? 50 : 0, y: index === 2 ? 50 : 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
              className="group"
            >
              <div 
                onClick={() => handleModalOpen(index)}
                className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  {brokenImages[index] ? (
                    <div className="w-full h-60 flex items-center justify-center bg-gray-200">
                      <FaImage className="text-6xl text-gray-400" />
                    </div>
                  ) : (
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.alt}
                      width={500}
                      height={300}
                      className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => handleImageError(index)}
                    />
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-gray-500">{news.description}</p>
                  <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                    {news.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-12">
          <Link href="/latest-news" passHref className="relative inline-block text-lg font-bold text-gray-900">
            <motion.span whileHover="hover" initial="rest" animate="rest">
              <span>See More</span>
              <motion.span
                variants={{
                  rest: { scaleX: 0.2 },
                  hover: { scaleX: 1 },
                }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "center" }}
                className="block bg-black h-[2px] mt-1"
              />
            </motion.span>
          </Link>
        </div>
      </div>

      {/* News Modal */}
      <AnimatePresence>
        {selectedNewsIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
            onClick={handleModalClose}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={handleModalClose}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <FaTimes className="text-gray-700 text-xl" />
              </button>
              
              {/* Navigation Arrows */}
              <button 
                onClick={(e) => { e.stopPropagation(); navigateNews('prev') }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                aria-label="Previous"
              >
                <IoIosArrowBack className="text-gray-700 text-2xl" />
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); navigateNews('next') }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                aria-label="Next"
              >
                <IoIosArrowForward className="text-gray-700 text-2xl" />
              </button>

              {/* Modal Content */}
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Fixed Image Section */}
                <div className="relative w-full md:w-1/2 h-64 md:h-full bg-gray-100 flex-shrink-0">
                  {modalImageError || brokenImages[selectedNewsIndex] ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <FaImage className="text-6xl text-gray-400" />
                    </div>
                  ) : (
                    <Image
                      src={newsItems[selectedNewsIndex].image}
                      alt={newsItems[selectedNewsIndex].alt}
                      fill
                      className="object-cover"
                      onError={() => setModalImageError(true)}
                    />
                  )}
                </div>

                {/* Scrollable Content Section */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-6 md:p-8">
                    <p className="text-sm text-blue-600 font-semibold mb-2">
                      {newsItems[selectedNewsIndex].description}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {newsItems[selectedNewsIndex].title}
                    </h3>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">
                        {newsItems[selectedNewsIndex].fullContent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}