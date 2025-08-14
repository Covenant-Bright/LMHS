"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { FaBars, FaTimes, FaChevronRight, FaSearch } from "react-icons/fa"
import { motion, AnimatePresence, easeInOut } from "framer-motion"
import Image from "next/image"

// LogoSwitcher Component
function LogoSwitcher({
  className = "",
  alt = "School Logo",
}: {
  className?: string
  alt?: string
}) {
  const logos = useMemo(() => ["/images/logo.png", "/images/logo2.png"], [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const imageRefs = useRef<HTMLImageElement[]>([])

  // Preload both images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      try {
        // Create an array of promises for loading each image
        const imagePromises = logos.map((src, index) => {
          return new Promise<void>((resolve, reject) => {
            const img = new window.Image()
            img.crossOrigin = "anonymous" // Set crossOrigin to avoid CORS issues
            img.onload = () => {
              // Store the loaded image element in the ref array
              imageRefs.current[index] = img
              resolve()
            }
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
            img.src = src
          })
        })

        // Wait for all images to load
        await Promise.all(imagePromises)
        setImagesLoaded(true)
      } catch (error) {
        console.error("Error preloading images:", error)
        // Still mark as loaded even if there's an error, to avoid blocking the UI
        setImagesLoaded(true)
      }
    }

    preloadImages()
  }, [logos])

  useEffect(() => {
    if (imagesLoaded) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % logos.length)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [logos.length, imagesLoaded])

  const currentLogo = logos[currentIndex]

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={currentLogo}
        src={currentLogo}
        alt={alt}
        className={className}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 1 } }}
        exit={{ x: -100, opacity: 0, transition: { duration: 1 } }}
        style={{
          backfaceVisibility: "hidden",
          transform: "translate3d(0,0,0)",
          willChange: "transform, opacity",
        }}
      />
    </AnimatePresence>
  )
}

// Search functionality
interface SearchResult {
  title: string
  description: string
  url: string
  category: string
}

// Search index - this would typically come from a CMS or API
const searchIndex: SearchResult[] = [
  // Home
  { title: "Home", description: "Welcome to Living Miracle High School", url: "/", category: "Navigation" },

  // About
  {
    title: "Mission & Vision",
    description: "Our mission and vision for educational excellence",
    url: "/mission-&-vision",
    category: "About",
  },
  { title: "History", description: "The history and founding of our school", url: "/history", category: "About" },
  { title: "School Policy", description: "School policies and guidelines", url: "/school-policy", category: "About" },

   // Portal
  {
    title: "Student Portal",
    description: "Access student resources and information",
    url: "/student-portal",
    category: "Portal",
  },
  {
    title: "Teacher Portal",
    description: "Access teacher resources and tools",
    url: "/teacher-portal",
    category: "Portal",
  },

  // Academics
  {
    title: "Daycare",
    description: "Early childhood care and development programs",
    url: "/daycare",
    category: "Academics",
  },
  { title: "Preparatory", description: "Preparatory education programs", url: "/preparatory", category: "Academics" },
  { title: "Nursery", description: "Nursery education and care", url: "/nursery", category: "Academics" },
  { title: "Primary", description: "Primary school education programs", url: "/primary", category: "Academics" },
  { title: "Secondary", description: "Secondary school education programs", url: "/secondary", category: "Academics" },

  // Schools
  {
    title: "Miracle International School Ososami",
    description: "Our Ososami branch location and facilities",
    url: "/miracle-international-school-ososami",
    category: "Schools",
  },
  {
    title: "Miracle International School Molete",
    description: "Our Molete branch location and facilities",
    url: "/miracle-international-school-molete",
    category: "Schools",
  },
  {
    title: "Miracle International School Osoba",
    description: "Our Osoba branch location and facilities",
    url: "/miracle-international-school-osoba",
    category: "Schools",
  },
  {
    title: "Living Miracle School Agbeja",
    description: "Our Agbeja branch location and facilities",
    url: "/living-miracle-school-agbeja",
    category: "Schools",
  },

  // Admission
  {
    title: "Admission Process",
    description: "How to apply and admission requirements",
    url: "/admission-process",
    category: "Admission",
  },
  {
    title: "Application Form",
    description: "Download and submit application forms",
    url: "/application-form",
    category: "Admission",
  },
  { title: "FAQs", description: "Frequently asked questions about admission", url: "/faqs", category: "Admission" },

  // Events & News
  {
    title: "Latest News",
    description: "Stay updated with our latest news and announcements",
    url: "/latest-news",
    category: "News & Events",
  },
  {
    title: "Photo Gallery",
    description: "View photos and videos from school events",
    url: "/photo-gallery",
    category: "News & Events",
  },
  {
    title: "Upcoming Events",
    description: "Check out our upcoming school events",
    url: "/upcoming-events",
    category: "News & Events",
  },


  // Additional searchable content
  {
    title: "Enrollment",
    description: "Enroll your child in our school programs",
    url: "/admission-process",
    category: "Admission",
  },
  { title: "Education", description: "Quality education programs for all ages", url: "/", category: "Academics" },
  {
    title: "Learning",
    description: "Innovative learning approaches and methodologies",
    url: "/mission-&-vision",
    category: "About",
  },
  { title: "Students", description: "Student life and activities", url: "/student-portal", category: "Portal" },
  { title: "Teachers", description: "Our qualified teaching staff", url: "/teacher-portal", category: "Portal" },
  { title: "Branches", description: "Our multiple branches locations", url: "/", category: "Schools" },
  { title: "Facilities", description: "Modern facilities and infrastructure", url: "/", category: "Schools" },
]

// Variants for header fade and slide animation
const headerVariants = {
  visible: { y: 0, opacity: 1 },
  hidden: {
    y: -50,
    opacity: 0,
    transition: { duration: 0.5, ease: easeInOut },
  },
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [snowflakes, setSnowflakes] = useState<number[]>([])
  const [fadeHeader, setFadeHeader] = useState(false)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    typeof window !== "undefined" ? (window.innerWidth > window.innerHeight ? "landscape" : "portrait") : "portrait",
  )
  const [isTransitioning, setIsTransitioning] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Search state
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Preload the click sound
  const audioBufferRef = useRef<{
    audioContext: AudioContext
    buffer: AudioBuffer
  } | null>(null)

  const logos = useMemo(() => ["/images/logo.png", "/images/logo2.png"], [])

  // Search functionality
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    setIsSearching(true)

    // Simulate search delay for better UX
    setTimeout(() => {
      const results = searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults(results)
      setShowSearchResults(true)
      setIsSearching(false)
    }, 300)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    performSearch(query)
  }

  // Handle search result click
  const handleSearchResultClick = (url: string) => {
    playClickSound()
    setMenuOpen(false)
    setSearchQuery("")
    setSearchResults([])
    setShowSearchResults(false)

    setTimeout(() => {
      window.location.href = url
    }, 500)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setShowSearchResults(false)
    searchInputRef.current?.focus()
  }

  // Handle orientation changes
  useEffect(() => {
    const handleResize = () => {
      // Detect orientation change
      const newOrientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait"

      if (newOrientation !== orientation) {
        // Set transitioning state to prevent animations during orientation change
        setIsTransitioning(true)

        // If menu is open during orientation change, close it to prevent glitches
        if (menuOpen) {
          setMenuOpen(false)
        }

        // Update orientation after a short delay
        setTimeout(() => {
          setOrientation(newOrientation)
          setIsTransitioning(false)
        }, 300)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [orientation, menuOpen])

  useEffect(() => {
    const loadSound = async () => {
      try {
        const response = await fetch("/click.txt")
        const base64String = await response.text()
        const audioContext = new (
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        )()
        const binaryString = atob(base64String.trim())
        const len = binaryString.length
        const uint8Array = new Uint8Array(len)
        for (let i = 0; i < len; i++) {
          uint8Array[i] = binaryString.charCodeAt(i)
        }
        const decodedBuffer = await audioContext.decodeAudioData(uint8Array.buffer)
        audioBufferRef.current = { audioContext, buffer: decodedBuffer }
      } catch (error) {
        console.error("Error preloading sound:", error)
      }
    }

    loadSound()
  }, [])

  // Function to play the preloaded click sound
  const playClickSound = () => {
    try {
      if (!audioBufferRef.current) return
      const { audioContext, buffer } = audioBufferRef.current
      // Resume the context if it is suspended (e.g., due to user interaction policies)
      if (audioContext.state === "suspended") {
        audioContext.resume()
      }
      const source = audioContext.createBufferSource()
      source.buffer = buffer
      source.connect(audioContext.destination)
      source.start(0)
    } catch (error) {
      console.error("Error playing sound:", error)
    }
  }

  useEffect(() => {
    if (menuOpen) {
      const flakes = Array.from({ length: 50 }, (_, i) => i)
      setSnowflakes(flakes)
    } else {
      setSnowflakes([])
      // Clear search when menu closes
      setSearchQuery("")
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.height = "100%"
    } else {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.height = ""
    }

    return () => {
      // Cleanup styles when component unmounts
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.height = ""
    }
  }, [menuOpen])

  // Scroll listener to check footer position
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer")
      if (footer) {
        const rect = footer.getBoundingClientRect()
        if (rect.top < 200) {
          setFadeHeader(true)
        } else {
          setFadeHeader(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu)
  }

  // Updated menuItems with links for each submenu
  const menuItems = [
    {
      name: "Home",
      link: "/", // Direct link for Home
      submenu: [], // No submenu
    },
    {
      name: "About",
      submenu: [
        { name: "Mission & Vision", link: "/mission-&-vision" },
        { name: "History", link: "/history" },
        { name: "School Policy", link: "/school-policy" },
      ],
    },
      {
      name: "Portal",
      submenu: [
        { name: "Student Portal", link: "/student-portal" },
        { name: "Teacher Portal", link: "/teacher-portal" },
      ],
    },
    {
      name: "Academics",
      submenu: [
        { name: "Daycare", link: "/daycare" },
        { name: "Preparatory", link: "/preparatory" },
        { name: "Nursery", link: "/nursery" },
        { name: "Primary", link: "/primary" },
        { name: "Secondary", link: "/secondary" },
      ],
    },
    {
      name: "Schools",
      submenu: [
        { name: "Miracle Intl School Ososami", link: "/miracle-international-school-ososami" },
        { name: "Miracle Intl School Molete", link: "/miracle-international-school-molete" },
        { name: "Miracle Intl School Osoba", link: "/miracle-international-school-osoba" },
        { name: "Living Miracle School Agbeja", link: "/living-miracle-school-agbeja" },
      ],
    },
    {
      name: "Admission",
      submenu: [
        { name: "Admission Process", link: "/admission-process" },
        { name: "Application Form", link: "application-form" },
        { name: "FAQs", link: "/faqs" },
      ],
    },
    {
      name: "Events & News",
      submenu: [
        { name: "Latest News", link: "/latest-news" },
        { name: "Photo & Video Gallery", link: "/photo-gallery" },
        { name: "Upcoming Events", link: "/upcoming-events" },
      ],
    },
  
  ]

  // Helper function to handle link clicks with delay
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault()
    playClickSound()
    // Close the menu, triggering the exit animation.
    setMenuOpen(false)
    // Delay navigation until after the exit animation (0.5s)
    setTimeout(() => {
      window.location.href = link
    }, 500)
  }

  // Define the snowflake animation style
  const snowflakeAnimationStyle = `
    @keyframes fall {
      0% { transform: translate3d(0, -10vh, 0); opacity: 1; }
      100% { transform: translate3d(0, 100vh, 0); opacity: 0; }
    }
  `

  return (
    <>
      <style jsx global>
        {snowflakeAnimationStyle}
      </style>

      <motion.header
        variants={headerVariants}
        animate={fadeHeader ? "hidden" : "visible"}
        className="fixed top-0 left-0 w-full flex justify-between items-center py-2 pl-0 pr-2 sm:px-6 z-50 pointer-events-none"
        style={{
          backfaceVisibility: "hidden",
          transform: "translate3d(0,0,0)",
          willChange: "transform, opacity",
        }}
      >
        <div className="pointer-events-auto flex items-center">
          <LogoSwitcher
            className="h-30 sm:h-30 md:h-40 lg:h-40 xl:h-40 max-[320px]:h-20 max-[320px]:ml-2 mt-[-4px]"
            alt="School Logo"
          />
        </div>

        <nav className="pointer-events-auto flex items-center gap-8 text-white text-lg mr-2 sm:mr-4 md:mr-6 lg:mr-16 py-2 rounded-md bg-black/60 border-4 border-white/70 shadow-5xl shadow-black/80 hover:bg-black/70 hover:border-grey transition-all">
          <div className="hidden md:flex gap-8 max-[320px]:hidden mt-[-4px]">
            {/* Changed to button with onClick handler */}
            <button
              onClick={() => (window.location.href = "/admission-process")}
              className="ml-3 uppercase font-bold text-2xl text-white bg-transparent border-none cursor-pointer"
            >
              Enroll
            </button>
            <button
              onClick={() => (window.location.href = "/portal")}
              className="uppercase font-bold text-2xl text-white bg-transparent border-none cursor-pointer"
            >
              Portal
            </button>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault() // Prevent any default behavior
              if (!isTransitioning) {
                playClickSound()
                setMenuOpen(true)
              }
            }}
            className="uppercase font-bold text-2xl flex items-center gap-2 p-2 rounded transition-transform duration-300 transform hover:scale-110 active:scale-90 max-[320px]:text-base max-[320px]:p-1 max-[320px]:mr-2 mt-[-4px]"
            disabled={isTransitioning}
            style={{
              transform: "translate3d(0,0,0)",
              willChange: "transform",
            }}
            type="button" // Explicitly set the type to button
          >
            <FaBars size={28} className="max-[320px]:text-lg" />
            <span className="max-[320px]:hidden">Menu</span>
          </button>
        </nav>
      </motion.header>

      {/* Only render menu when not transitioning between orientations */}
      {!isTransitioning && (
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: "auto",
                overflowX: "hidden",
                perspective: "1000px",
                backfaceVisibility: "hidden",
                transform: "translate3d(0,0,0)",
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {/* Snowflakes container with fixed positioning */}
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  overflow: "hidden",
                  zIndex: -1,
                  pointerEvents: "none",
                }}
              >
                {snowflakes.map((flake) => {
                  // Pre-calculate random values to avoid recalculations during render
                  const size = Math.random() * 3 + (window.innerWidth > 768 ? 2 : 1)
                  const top = Math.random() * 100
                  const left = Math.random() * 100
                  const duration = Math.random() * 5 + 3

                  return (
                    <div
                      key={flake}
                      className="absolute bg-white rounded-full opacity-75"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        top: `${top}vh`,
                        left: `${left}vw`,
                        animation: `fall ${duration}s linear infinite`,
                        willChange: "transform",
                        transform: "translate3d(0,0,0)",
                        backfaceVisibility: "hidden",
                      }}
                    />
                  )
                })}
              </div>

              {/* LARGE-SCREEN MENU */}
              <div
                className="hidden md:flex flex-col items-start text-white text-3xl w-full h-full max-h-[90vh] overflow-y-auto p-2 relative"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "translate3d(0,0,0)",
                  willChange: "transform, opacity",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                 <div className="absolute top-6 left-10">
                  <LogoSwitcher className="h-36" alt="School Logo" />
                </div>

                {/* Search Bar and Close Button Container */}
                <div className="fixed top-4 right-10 flex items-center gap-4 z-50">
                  {/* Search Bar */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 1, ease: easeInOut }}
                    className="relative"
                  >
                    <div className="relative flex items-center bg-white/10 backdrop-blur-sm border border-yellow-600/30 rounded-full px-4 py-3 min-w-[350px] transition-all duration-300 hover:bg-yellow-900/15 focus-within:bg-yellow-900/20 focus-within:ring-2 focus-within:ring-yellow-500">
                      <FaSearch className="text-yellow-400 mr-3" size={18} />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search our website..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="bg-transparent text-white placeholder-yellow-200/60 outline-none flex-1 text-lg tracking-wide"
                        autoComplete="off"
                      />
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="text-yellow-400/70 hover:text-yellow-300 ml-2 transition-colors p-1"
                          type="button"
                        >
                          <FaTimes size={14} />
                        </button>
                      )}
                    </div>

                    {/* Search Results Dropdown */}
                    {showSearchResults && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-0 right-0 mt-3 bg-yellow-900/95 backdrop-blur-xl border border-yellow-600/50 rounded-xl shadow-2xl max-h-[400px] overflow-y-auto z-50 overflow-hidden"
                      >
                        {isSearching ? (
                          <div className="p-4 flex flex-col items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
                            <p className="mt-3 text-yellow-300 font-medium">Searching...</p>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <div className="py-2">
                            {searchResults.map((result, index) => (
                              <button
                                key={index}
                                onClick={() => handleSearchResultClick(result.url)}
                                className="w-full text-left px-4 py-3 hover:bg-yellow-800/50 transition-all duration-200 border-b border-yellow-800 last:border-b-0 group"
                                type="button"
                              >
                                <div className="flex items-start">
                                  <div className="mr-3 flex items-center justify-center mt-1">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 group-hover:bg-yellow-400 transition-colors"></div>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-white text-base group-hover:text-yellow-300 transition-colors">
                                      {result.title}
                                    </h4>
                                    <p className="text-yellow-300/80 text-sm mt-1 line-clamp-2">
                                      {result.description}
                                    </p>
                                    <div className="mt-2">
                                      <span className="text-xs bg-yellow-800 text-yellow-100 px-2 py-1 rounded">
                                        {result.category}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-800/50 mb-4">
                              <FaSearch className="text-yellow-400 text-xl" />
                            </div>
                            <p className="text-yellow-300 font-medium">No results found</p>
                            <p className="text-yellow-500 text-sm mt-1">
                              Try different keywords or browse our menu
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Close Button */}
                  <motion.button
                    onClick={() => {
                      playClickSound()
                      setMenuOpen(false)
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 1, ease: easeInOut }}
                    className="bg-yellow-800/80 hover:bg-yellow-700 border border-yellow-600/50 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl transition-all duration-300 hover:scale-105"
                    style={{
                      transform: "translate3d(0,0,0)",
                      willChange: "transform, opacity",
                    }}
                    type="button"
                  >
                    <FaTimes />
                  </motion.button>
                </div>

               <nav className="flex flex-col items-start gap-6 pl-[1cm] lg:pl-[2cm] mt-[10.5rem]"> 
                  {menuItems.map((item) =>
                    item.name === "Home" ? (
                      <button
                        key={item.name}
                        onClick={(e) => {
                          e.preventDefault()
                          handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, item.link!)
                        }}
                        className="text-4xl md:mr-[2cm] lg:mr-[3cm] hover:text-yellow-400 transition-all duration-300 text-white bg-transparent border-none cursor-pointer text-left"
                        style={{ transform: "translate3d(0,0,0)" }}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <div key={item.name} className="relative w-full">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleSubmenu(item.name)
                          }}
                          className="w-full flex items-center justify-between hover:text-yellow-400 transition-all duration-300 text-white bg-transparent border-none cursor-pointer text-left"
                          style={{ transform: "translate3d(0,0,0)" }}
                          type="button"
                        >
                          <span className=" text-4xl md:mr-[2cm] lg:mr-[3cm]">{item.name}</span>
                          {item.submenu.length > 0 && <FaChevronRight className="text-3xl md:mr-[1.5cm] lg:mr-[1cm]" />}
                        </button>

                        {item.submenu.length > 0 && openSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, ease: easeInOut }}
                            className="hidden md:block absolute left-full top-0 border-l border-yellow-500 pl-4 ml-0 space-y-1 max-h-[80vh] overflow-y-auto"
                            style={{
                              transform: "translate3d(0,0,0)",
                              willChange: "transform, opacity",
                              backfaceVisibility: "hidden",
                            }}
                          >
                            {item.submenu.map((sub) => (
                              <button
                                key={sub.name}
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, sub.link!)
                                }}
                                className="block text-white hover:text-yellow-400 py-2 text-2xl whitespace-nowrap bg-transparent border-none cursor-pointer text-left w-full"
                                style={{ transform: "translate3d(0,0,0)" }}
                              >
                                {sub.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ),
                  )}
                </nav>
              </div>

              {/* SMALL-SCREEN MENU */}
              <div
                className="md:hidden w-full h-full p-2 overflow-y-auto overflow-x-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "translate3d(0,0,0)",
                  willChange: "transform, opacity",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {/* Top Bar with Search and Close */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 1, ease: easeInOut }}
                  className="fixed top-0 left-0 w-full bg-black bg-opacity-80 text-white py-4 px-4 z-50 flex justify-between items-center max-[320px]:py-2 max-[320px]:px-3"
                  style={{
                    transform: "translate3d(0,0,0)",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Mobile Search Bar */}
                  <div className="relative flex-1 mr-4">
                    <div className="relative flex items-center bg-white/10 backdrop-blur-sm border border-yellow-600/30 rounded-full px-3 py-2 transition-all duration-300 focus-within:bg-yellow-900/15 focus-within:ring-1 focus-within:ring-yellow-500">
                      <FaSearch className="text-yellow-400 mr-2" size={16} />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="bg-transparent text-white placeholder-yellow-200/60 outline-none flex-1 text-base max-[320px]:text-sm"
                        autoComplete="off"
                      />
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="text-yellow-400/70 hover:text-yellow-300 ml-2 transition-colors p-1"
                          type="button"
                        >
                          <FaTimes size={12} />
                        </button>
                      )}
                    </div>

                    {/* Mobile Search Results */}
                    {showSearchResults && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-0 right-0 mt-2 bg-yellow-900/95 backdrop-blur-xl border border-yellow-600/50 rounded-xl shadow-2xl max-h-[300px] overflow-y-auto z-50 overflow-hidden"
                      >
                        {isSearching ? (
                          <div className="p-3 flex flex-col items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
                            <p className="mt-2 text-yellow-300 text-sm">Searching...</p>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <div className="py-1">
                            {searchResults.map((result, index) => (
                              <button
                                key={index}
                                onClick={() => handleSearchResultClick(result.url)}
                                className="w-full text-left px-3 py-3 hover:bg-yellow-800/50 transition-colors border-b border-yellow-800 last:border-b-0 group"
                                type="button"
                              >
                                <div className="flex items-start">
                                  <div className="mr-2 flex items-center justify-center mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 group-hover:bg-yellow-400 transition-colors"></div>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-white text-sm group-hover:text-yellow-300 transition-colors">
                                      {result.title}
                                    </h4>
                                    <p className="text-yellow-300/80 text-xs mt-1 line-clamp-1">
                                      {result.description}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center">
                            <p className="text-yellow-300 text-sm">No results found</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      playClickSound()
                      setMenuOpen(false)
                    }}
                    className="bg-yellow-800/80 hover:bg-yellow-700 border border-yellow-600/50 rounded-full w-10 h-10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:scale-105 max-[320px]:w-8 max-[320px]:h-8 max-[320px]:text-base"
                    type="button"
                  >
                    <FaTimes />
                  </button>
                </motion.div>

                <div className="w-full flex justify-start pl-0 mb-8 mt-[5rem] max-[320px]:mt-[4rem]">
                  <LogoSwitcher className="h-40 max-[320px]:h-24 mt-[-5px]" alt="School Logo" />
                </div>

                <nav className="flex flex-col items-start gap-6 mt-[0.3cm] pl-[1cm] max-[320px]:mt-[-25px] max-[320px]:gap-3">
                  {menuItems.map((item) =>
                    item.name === "Home" ? (
                      <button
                        key={item.name}
                        onClick={(e) => {
                          e.preventDefault()
                          handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, item.link!)
                        }}
                        className="text-3xl max-[320px]:text-lg hover:text-yellow-400 transition-all duration-300 text-white bg-transparent border-none cursor-pointer text-left"
                        style={{ transform: "translate3d(0,0,0)" }}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <div key={item.name} className="relative w-full">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            toggleSubmenu(item.name)
                          }}
                          className="w-full flex items-center justify-between hover:text-yellow-400 transition-all duration-300 text-white bg-transparent border-none cursor-pointer text-left"
                          style={{ transform: "translate3d(0,0,0)" }}
                          type="button"
                        >
                          <span className="text-3xl max-[320px]:text-lg">{item.name}</span>
                          {item.submenu.length > 0 && (
                            <FaChevronRight className="text-3xl mr-6 sm:mr-8 max-[320px]:text-sm" />
                          )}
                        </button>

                        {item.submenu.length > 0 && openSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: easeInOut }}
                            className="ml-4 border-l border-yellow-500 pl-3 space-y-1"
                            layout
                            style={{
                              transform: "translate3d(0,0,0)",
                              willChange: "transform, opacity",
                              backfaceVisibility: "hidden",
                            }}
                          >
                            {item.submenu.map((sub) => (
                              <button
                                key={sub.name}
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, sub.link!)
                                }}
                                className="block text-white hover:text-yellow-400 py-2 text-lg sm:text-xl max-[320px]:text-sm whitespace-normal break-words bg-transparent border-none cursor-pointer text-left w-full"
                                style={{ transform: "translate3d(0,0,0)" }}
                              >
                                {sub.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ),
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Preload images with opacity 0 */}
      <div
        className="opacity-0 absolute pointer-events-none"
        aria-hidden="true"
        style={{
          position: "absolute",
          visibility: "hidden",
        }}
      >
        {logos.map((logo, index) => (
          <Image key={index} src={logo || "/placeholder.svg"} width={100} height={100} alt="" />
        ))}
      </div>
    </>
  )
}