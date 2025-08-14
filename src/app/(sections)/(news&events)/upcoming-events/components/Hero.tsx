"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin, Clock, Users, Download } from "lucide-react"

// Function to generate ICS calendar file
const generateCalendarFile = () => {
  const event = {
    title: "School Resumption",
    description:
      "Students from all branches should resume on Monday 5th September 2025.",
    location: "All Branches - Miracle International Schools",
    startDate: new Date("2025-09-15T7:30:00"),
    endDate: new Date(""),
  }

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Miracle International Schools//Events//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@info@lmhs.sch.ng`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(event.startDate)}`,
    `DTEND:${formatDate(event.endDate)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  return icsContent
}

// Function to download calendar file
const downloadCalendarFile = () => {
  const icsContent = generateCalendarFile()
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "miracle-school-resumption.ics"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Function to add to different calendar services
const addToCalendar = (service: string) => {
  const event = {
    title: "Miracle School Resumption",
    description:
      "Students from all branches are expected to resume on 15th September 2025.",
    location: "All Branches - Miracle International Schools",
    startDate: "2025-09-15T07:30:00Z",
    endDate: "",
  }

  let url = ""

  switch (service) {
    case "google":
      url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
      break
    case "outlook":
      url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${event.startDate}&enddt=${event.endDate}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
      break
    case "yahoo":
      url = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(event.title)}&st=${event.startDate}&et=${event.endDate}&desc=${encodeURIComponent(event.description)}&in_loc=${encodeURIComponent(event.location)}`
      break
    default:
      downloadCalendarFile()
      return
  }

  window.open(url, "_blank")
}

export default function Hero() {
  const scrollToFeaturedEvents = () => {
    const featuredSection = document.getElementById("featured-events")
    if (featuredSection) {
      featuredSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleAddToCalendar = () => {
    // Show options for different calendar services
    const userAgent = navigator.userAgent.toLowerCase()

    if (userAgent.includes("mobile") || userAgent.includes("android") || userAgent.includes("iphone")) {
      // For mobile devices, download ICS file
      downloadCalendarFile()
    } else {
      // For desktop, show options
      const choice = window.confirm("Choose your calendar service:\n\nOK - Google Calendar\nCancel - Download ICS file")

      if (choice) {
        addToCalendar("google")
      } else {
        downloadCalendarFile()
      }
    }
  }

  return (
    <section className="relative min-h-[60vh] bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-24 h-24 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white rounded-full blur-lg"></div>
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-white rounded-full blur-xl"></div>
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
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Events Calendar</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Upcoming
              <span className="block text-yellow-300">Events</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-purple-100 mb-8 leading-relaxed"
            >
              Discover exciting events, workshops, competitions, and celebrations happening across all Miracle
              International School branches.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={scrollToFeaturedEvents}
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View All Events
              </button>
              <button
                onClick={handleAddToCalendar}
                className="border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Add to Calendar
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">2</div>
                <div className="text-sm text-purple-200">This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">4</div>
                <div className="text-sm text-purple-200">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm text-purple-200">Participants</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Featured Event Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative h-64">
                <Image src="/images/IMG_2193.webp?height=256&width=400" alt="Featured Event" fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Next Week</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">15</div>
                    <div className="text-xs text-gray-600">SEP</div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>7:30 AM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>All Branches</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">School Resumption</h3>
                <p className="text-gray-600 mb-4">
                  Students are expected to resume back to the school premises on 15th September 2025.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>700+ Expected</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
