"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Camera, Heart, Download, Share2, Eye, Calendar, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const photoAlbums = [
  {
    id: 1,
    title: "Cultural Day",
    description: "Celebration of Nigerian culture with traditional dances and attire",
    coverImage: "/images/_MG_1841.webp?height=400&width=600",
    photoCount: 6,
    date: "March, 2025",
    location: "Multi-School",
    category: "Cultural",
    featured: false,
    likes: 156,
    isLiked: false,
    photos: [
      { id: 1, url: "/images/_MG_1824.webp?height=600&width=800", caption: "Traditional Yoruba dance performance" },
      { id: 2, url: "/images/_MG_2136.webp?height=600&width=800", caption: "Yoruba cultural display" },
      { id: 3, url: "/images/_MG_1841.webp?height=600&width=800", caption: "Yoruba traditional attire showcase" },
      { id: 4, url: "/images/_MG_1826.webp?height=600&width=800", caption: "Yoruba cultural display" },
      { id: 5, url: "/images/_MG_2153.webp?height=600&width=800", caption: "Igbo traditional attire showcase" },
      { id: 6, url: "/images/IMG_3783.webp?height=600&width=800", caption: "Yoruba traditional attire showcase" },
    ],
  },
  {
    id: 2,
    title: "Graduation Ceremony 2024",
    description: "Celebrating our graduating students' achievements and success",
    coverImage: "/images/_MG_1912.webp?height=400&width=600",
    photoCount: 13,
    date: "August 5, 2025",
    location: "All Branches",
    category: "Ceremony",
    featured: true,
    likes: 203,
    isLiked: true,
    photos: [
      { id: 1, url: "/images/_MG_1789.webp?height=600&width=800", caption: "Graduation event" },
      { id: 2, url: "/images/_MG_2069.webp?height=600&width=800", caption: "Graduation event" },
      { id: 3, url: "/images/_MG_2125.webp?height=600&width=800", caption: "Graduation event" },
      { id: 4, url: "/images/IMG_3936.webp?height=600&width=800", caption: "Graduation event" },
      { id: 5, url: "/images/_MG_1782.webp?height=600&width=800", caption: "Graduation event" },
      { id: 6, url: "/images/_MG_1785.webp?height=600&width=800", caption: "Graduation event" },
      { id: 7, url: "/images/_MG_1780.webp?height=600&width=800", caption: "Graduation event" },
      { id: 8, url: "/images/IMG_3893.webp?height=600&width=800", caption: "Graduation event" },
      { id: 9, url: "/images/IMG_3907.webp?height=600&width=800", caption: "Graduation event" },
      { id: 10, url: "/images/IMG_3798.webp?height=600&width=800", caption: "Graduation event" },
      { id: 11, url: "/images/_MG_1783.webp?height=600&width=800", caption: "Graduation event" },
      { id: 12, url: "/images/_MG_1912.webp?height=600&width=800", caption: "Graduation event" },
      { id: 13, url: "/images/_MG_1873.webp?height=600&width=800", caption: "Graduation event" },
    ],
  },
]

const categories = ["All", "Academic", "Sports", "Cultural", "Ceremony", "Arts", "Workshop"]

export default function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedAlbum, setSelectedAlbum] = useState<(typeof photoAlbums)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [albumLikes, setAlbumLikes] = useState<{ [key: number]: { likes: number; isLiked: boolean } }>({})

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedAlbum) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedAlbum]);

  const filteredAlbums =
    selectedCategory === "All" ? photoAlbums : photoAlbums.filter((album) => album.category === selectedCategory)

  const handleLike = (albumId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const album = photoAlbums.find((a) => a.id === albumId)
    if (!album) return

    const currentState = albumLikes[albumId] || { likes: album.likes, isLiked: album.isLiked }
    const newState = {
      likes: currentState.isLiked ? currentState.likes - 1 : currentState.likes + 1,
      isLiked: !currentState.isLiked,
    }

    setAlbumLikes((prev) => ({
      ...prev,
      [albumId]: newState,
    }))
  }

  const handleShare = (album: (typeof photoAlbums)[0], e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: album.title,
        text: album.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
    }
  }

  const handleDownload = async (album: (typeof photoAlbums)[0], e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real implementation, you would create a zip file of all images
    // For now, we'll just download the cover image
    try {
      const response = await fetch(album.coverImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${album.title.replace(/\s+/g, "_")}_cover.webp`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const AlbumModal = ({ album, onClose }: { album: (typeof photoAlbums)[0]; onClose: () => void }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-6xl w-full mx-4 max-h-[95vh] overflow-y-auto overflow-x-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 break-words">{album.title}</h2>
              <p className="text-gray-600 mt-1">{album.photos.length} photos</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors border border-gray-200 bg-white shadow-sm"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Main Image Display */}
          <div className="relative h-96 md:h-[500px] bg-black">
            <Image
              src={album.photos[currentImageIndex]?.url || "/placeholder.svg"}
              alt={album.photos[currentImageIndex]?.caption || "Gallery image"}
              fill
              className="object-contain"
            />

            {/* Navigation Arrows */}
            {album.photos.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? album.photos.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === album.photos.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {album.photos.length}
            </div>
          </div>

          {/* Image Caption */}
          {album.photos[currentImageIndex]?.caption && (
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <p className="text-gray-700 break-words">{album.photos[currentImageIndex].caption}</p>
            </div>
          )}

          {/* Thumbnail Strip */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {album.photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-green-500 ring-2 ring-green-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={photo.url || "/placeholder.svg"}
                    alt={photo.caption || `Photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => handleLike(album.id, e)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  (albumLikes[album.id]?.isLiked ?? album.isLiked)
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${(albumLikes[album.id]?.isLiked ?? album.isLiked) ? "fill-current" : ""}`}
                />
                <span>{albumLikes[album.id]?.likes ?? album.likes}</span>
              </button>
              <button
                onClick={(e) => handleShare(album, e)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
              <button
                onClick={(e) => handleDownload(album, e)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {album.date} • {album.location}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return (
    <section id="photo-albums" className="py-20 bg-gray-50 break-words">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Photo Albums</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our collection of memorable moments, achievements, and daily life at Miracle International
            Schools.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Albums */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Camera className="w-6 h-6 text-green-600" />
            Featured Albums
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredAlbums
              .filter((album) => album.featured)
              .map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="relative h-64">
                    <Image
                      src={album.coverImage || "/placeholder.svg"}
                      alt={album.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {album.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Camera className="w-4 h-4" />
                        <span>{album.photoCount}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1 truncate max-w-[80%]">{album.title}</h3>
                      <p className="text-sm text-gray-200 line-clamp-2">{album.description}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{album.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{album.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {album.photos.slice(0, 3).map((photo, photoIndex) => (
                            <div
                              key={photoIndex}
                              className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                            >
                              <Image
                                src={photo.url || "/placeholder.svg"}
                                alt={`Preview ${photoIndex + 1}`}
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {album.photoCount > 3 && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">+{album.photoCount - 3}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-600">{album.photoCount} photos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleLike(album.id, e)}
                          className={`p-2 transition-colors ${
                            (albumLikes[album.id]?.isLiked ?? album.isLiked)
                              ? "text-red-500 hover:text-red-600"
                              : "text-gray-400 hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${(albumLikes[album.id]?.isLiked ?? album.isLiked) ? "fill-current" : ""}`}
                          />
                        </button>
                        <button
                          onClick={(e) => handleShare(album, e)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDownload(album, e)}
                          className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Albums Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">All Albums</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album, index) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedAlbum(album)}
              >
                <div className="relative h-48">
                  <Image
                    src={album.coverImage || "/placeholder.svg"}
                    alt={album.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                      {album.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-md p-1">
                    <div className="flex items-center gap-1 text-xs text-gray-700">
                      <Camera className="w-3 h-3" />
                      <span>{album.photoCount}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-lg font-bold mb-1 truncate max-w-[85%]">{album.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="w-3 h-3" />
                    <span>{album.date}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{album.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 break-words">{album.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">View Album</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleLike(album.id, e)}
                        className={`p-1 transition-colors ${
                          (albumLikes[album.id]?.isLiked ?? album.isLiked)
                            ? "text-red-500 hover:text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${(albumLikes[album.id]?.isLiked ?? album.isLiked) ? "fill-current" : ""}`}
                        />
                      </button>
                      <button
                        onClick={(e) => handleShare(album, e)}
                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Album Modal */}
      {selectedAlbum && (
        <AlbumModal
          album={selectedAlbum}
          onClose={() => {
            setSelectedAlbum(null)
            setCurrentImageIndex(0)
          }}
        />
      )}
    </section>
  )
}