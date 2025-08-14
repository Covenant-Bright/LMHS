"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Camera, Images } from "lucide-react"

export default function Hero() {
  const scrollToPhotoAlbums = () => {
    const element = document.getElementById("photo-albums")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section className="relative min-h-[60vh] bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 left-16 w-28 h-28 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-16 right-16 w-36 h-36 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-white rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Camera className="w-4 h-4" />
              <span className="text-sm font-medium">Visual Stories</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Photo
              <span className="block text-yellow-300">Gallery</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed"
            >
              Explore memorable moments, achievements, and daily life at Miracle International Schools through our
              comprehensive photo collection.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={scrollToPhotoAlbums}
                className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Browse Gallery
              </button>
            </motion.div>

            {/* Gallery Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">20</div>
                <div className="text-sm text-green-200">Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">2</div>
                <div className="text-sm text-green-200">Albums</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">4</div>
                <div className="text-sm text-green-200">Branches</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Featured Photo Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Featured Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="col-span-2 relative h-64 rounded-2xl overflow-hidden shadow-2xl group"
              >
                <Image
                  src="/images/IMG_2163.webp?height=256&width=500"
                  alt="Featured Photo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Classroom Excellence</h3>
                  <p className="text-sm text-gray-200">Interactive Learning Session</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">Recent</span>
                </div>
              </motion.div>

              {/* Small Photos */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="relative h-32 rounded-xl overflow-hidden shadow-lg group"
              >
                <Image
                  src="/images/IMG_2167.webp?height=128&width=200"
                  alt="Sports Day"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-xs font-medium">Sports Day</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="relative h-32 rounded-xl overflow-hidden shadow-lg group"
              >
                <Image
                  src="/images/_MG_2003.webp?height=128&width=200"
                  alt="Graduation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-xs font-medium">Graduation</p>
                </div>
              </motion.div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Images className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Latest Album</div>
                  <div className="text-sm text-gray-600">School activities 2025</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
