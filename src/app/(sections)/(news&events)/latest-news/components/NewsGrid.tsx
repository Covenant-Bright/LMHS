"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, User, ArrowRight, Eye, X, Share2, Heart, Bookmark } from "lucide-react"
import { useState, useEffect } from "react"

const newsArticles = [
  {
    id: 1,
    title: "End of the session party & Graduation Ceremony",
    excerpt:
      "Students from Miracle International School branches participated in the annual End of the session Party & Graduation ceremony event with remarkable performances.",
    fullContent: `The End of Year Party & Graduation Ceremony 2025 was a heartwarming celebration of milestones, achievements, and unforgettable memories for Miracle International School & Living Miracle School. This year, all our branches — Ososami, Molete, Osoba, and Agbeja — came together under one roof at the Living Miracle Multipurpose Hall for a truly grand and unified event.

The day began with graduates, parents, and guests arriving in elegant attire, capturing the spirit of the occasion. The hall was beautifully decorated with dazzling lights, floral arrangements, and thematic stage designs, creating the perfect setting for a memorable ceremony.

Memorable Highlights
This year's graduation honored our outgoing classes — from pupils moving up to secondary school to those stepping into the world of tertiary education. Emotional moments filled the air as graduates received their certificates, accompanied by cheers from proud parents and teachers. Special awards were presented for academic excellence, leadership, creativity, and community service.

The celebration continued with captivating musical performances, drama sketches, and cultural dances that reflected the diversity and vibrancy of our school community. The highlight of the evening came with the cutting of the graduation cake, symbolizing the sweet memories shared and the bright futures ahead.

A Bond Beyond Classrooms
Parents, alumni, and well-wishers expressed their joy and gratitude for the nurturing environment Miracle International Schools provide. The Parent-Teacher Association generously supported the event, ensuring every attendee enjoyed refreshments and entertainment throughout the day.

The celebration concluded with heartfelt speeches from the school leadership, reminding graduates that their journey with Miracle International School is just the beginning of greater achievements.

The celebration concluded with heartfelt remarks from the Proprietor, Pastor Muyiwa Ojo (P.M.O.), who encouraged graduates to pursue excellence in all aspects of life. He reminded them that the values of discipline, integrity, and perseverance they have learned at Miracle International Schools will guide them to success wherever life takes them.`,
    image: "/images/_MG_1786.webp?height=300&width=400",
    category: "Events",
    date: "August 5, 2025",
    author: "Management",
    readTime: "3 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Outstanding Performance in WAEC Results 2025",
    excerpt:
      "Living Miracle High School students Schools achieve 98% pass rate in WAEC examinations.",
    fullContent: `Living Miracle Students has once again demonstrated academic excellence with outstanding results in the 2025 West African Examinations Council (WAEC) Senior School Certificate Examination. Our students achieved a remarkable 98% pass rate, with 85% scoring five credits and above including English Language and Mathematics.

Preliminary checks show that candidates of Living Miracle High School delivered a commendable performance in the 2025 WAEC examinations. Many students attained five credits and above, including English Language and Mathematics, with several earning distinctions in key subject areas.

Subjects such as Mathematics, the sciences, and social studies recorded particularly strong outcomes, reflecting the depth of preparation and academic commitment of our students. This achievement is also a testament to the dedication of our teachers, the guidance of our school leadership, and the unwavering support from parents.

Final verification of individual results is ongoing, and a comprehensive breakdown will be released once the process is complete.
Recognition and Appreciation
These outstanding results are a testament to the dedication of our teachers, the hard work of our students, and the support of parents and the entire school community. Our comprehensive approach to education, combining academic rigor with character development, continues to produce well-rounded graduates ready for higher education and future careers.

The school management extends heartfelt congratulations to all students, teachers, and parents for this remarkable achievement.`,
    image: "/images/_MG_1873.webp?height=300&width=400",
    category: "Academics",
    date: "August 4, 2025",
    author: "Management",
    readTime: "3 min read",
    featured: true,
  },
  {
    id: 4,
    title: "Cultural Day Showcases Rich Nigerian Culture",
    excerpt:
      "Students and staff celebrate Nigeria's diverse cultural heritage through traditional dances, music, and cuisine.",
    fullContent: `The annual Cultural Day celebration at Miracle International School was a colorful celebration of Nigeria’s diverse traditions and customs. Students from different classes arrived in beautifully designed outfits representing various ethnic groups, including Yoruba, Igbo, Hausa.

A Tapestry of Cultures
The program featured energetic traditional dances, dramatic reenactments of historical events, and choral renditions of folk songs. Cultural displays showcased unique crafts, fabrics, and symbolic items from different regions, while the food exhibition offered a taste of Nigeria’s well-loved dishes such as jollof rice, pounded yam, suya, and moimoi.

Spectacular Performances
The highlight of the day was the series of cultural performances. Students presented traditional dances including the Yoruba Bata dance, Igbo Atilogwu, Hausa Koroso, and various regional folk dances. The school's cultural troupe, dressed in authentic costumes, delivered mesmerizing performances that left audiences spellbound.

The music performances featured traditional instruments such as talking drums, flutes, xylophones, and the kora. Students demonstrated their skills in playing these instruments while singing traditional songs in various Nigerian languages.

Cultural Education
Parents, staff, and students moved from one display to another, learning about the meanings behind the attire, dances, and artifacts. The event not only provided entertainment but also deepened understanding of the traditions that make Nigeria unique.`,
    image: "/images/_MG_1842.webp?height=300&width=400",
    category: "Culture",
    date: "March, 2025",
    author: "Management",
    readTime: "3 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Upcoming Parent-Teacher Conference Meeting",
    excerpt: "Strengthening School–Parent Communication",
    fullContent: `There would be an upcoming Parent-Teacher Conference Meeting for the current academic session. This important gathering will bring together parents, guardians, and teachers from all branches to discuss key updates regarding the school’s operations and student progress.

Introducing the New Digital System
A major highlight of this meeting will be the introduction of the school’s transition to a fully digital system, where parents will be able to pay school fees and manage related transactions securely through the school portal. The session will guide parents on how to navigate the platform, access payment records, and enjoy the convenience of online transactions.

Collaborative Learning Strategies
All parents and guardians are encouraged to attend, as this development marks a significant step toward improving efficiency, transparency, and ease of access to school services.`,
    image: "/images/parent-teacher-conference.webp?height=300&width=400",
    category: "Community",
    date: "September, 2025",
    author: "Management",
    readTime: "2 min read",
    featured: false,
  },
]

const categories = ["All", "Events", "Academics", "Infrastructure", "Culture", "Community", "Environment"]

export default function NewsGrid() {
  const [selectedArticle, setSelectedArticle] = useState<(typeof newsArticles)[0] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({})

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedArticle])

  // Initialize view counts from localStorage
  useEffect(() => {
    const savedViews = localStorage.getItem("article-views")
    const initialViewCounts: Record<number, number> = {}

    // Initialize all articles to 0 views
    newsArticles.forEach((article) => {
      initialViewCounts[article.id] = 0
    })

    // Merge with saved views if they exist
    if (savedViews) {
      const savedViewCounts = JSON.parse(savedViews)
      Object.keys(savedViewCounts).forEach((id) => {
        const articleId = Number.parseInt(id)
        if (!isNaN(articleId)) {
          initialViewCounts[articleId] = savedViewCounts[articleId]
        }
      })
    }

    setViewCounts(initialViewCounts)
    localStorage.setItem("article-views", JSON.stringify(initialViewCounts))
  }, [])

  // Function to increment view count
  const incrementViewCount = (articleId: number) => {
    setViewCounts((prev) => {
      const newCount = (prev[articleId] || 0) + 1
      const newCounts = { ...prev, [articleId]: newCount }
      localStorage.setItem("article-views", JSON.stringify(newCounts))
      return newCounts
    })
  }

  // Update the onClick handlers to increment views
  const handleArticleClick = (article: (typeof newsArticles)[0]) => {
    incrementViewCount(article.id)
    setSelectedArticle(article)
  }

  // Filter articles based on selected category
  const filteredArticles =
    selectedCategory === "All" ? newsArticles : newsArticles.filter((article) => article.category === selectedCategory)

  const filteredFeaturedArticles = filteredArticles.filter((article) => article.featured)

  const ArticleModal = ({ article, onClose }: { article: (typeof newsArticles)[0]; onClose: () => void }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-4xl h-full max-h-[98vh] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixed */}
          <div className="relative h-48 sm:h-64 md:h-80 flex-shrink-0">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl" />
            <button
              onClick={onClose}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors border border-gray-200 shadow-lg"
              aria-label="Close article"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
              <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 inline-block">
                {article.category}
              </span>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 line-clamp-2">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-200">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{viewCounts[article.id] || 0} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 md:p-8">
              <div
                className="prose prose-sm sm:prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.fullContent }}
              />
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors text-sm">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors text-sm">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors text-sm">
                    <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Save</span>
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">Published by {article.author}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Recent News & Updates</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, achievements, and events happening across all Miracle International
            School branches.
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
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-gray-600">
            {selectedCategory === "All"
              ? `Showing all ${filteredArticles.length} articles`
              : `Showing ${filteredArticles.length} article${filteredArticles.length !== 1 ? "s" : ""} in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Featured News */}
        {filteredFeaturedArticles.length > 0 && (
          <motion.div
            id="featured-stories"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Stories</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredFeaturedArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-64">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span>{viewCounts[article.id] || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <button
                      onClick={() => handleArticleClick(article)}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All News Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            {selectedCategory === "All" ? "All News" : `${selectedCategory} News`}
          </h3>
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <span>{viewCounts[article.id] || 0} views</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <button
                      onClick={() => handleArticleClick(article)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Eye className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">
                There are no articles in the {selectedCategory} category at the moment.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                View All Articles
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Article Modal */}
      {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </section>
  )
}
