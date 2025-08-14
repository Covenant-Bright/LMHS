"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, MapPin, Users, Star, ArrowRight, X, Share2, Heart, Bookmark, Phone, Mail } from "lucide-react"
import { useState, useEffect } from "react"

const upcomingEvents = [
  {
    id: 1,
    title: "Summer Coaching",
    description:
      "An intensive holiday program designed to help students strengthen academic skills, prepare for upcoming classes, and engage in productive learning activities.",
    fullDescription: `
      <p>Our Summer Coaching Program is specially designed to give students a head start on the new academic year. This engaging and well-structured program runs across all Miracle Intl School Branches, offering targeted lessons, skill-building sessions, and interactive learning activities.</p>
      
      <p><strong>Program Highlights:</strong></p>
      <ul>
        <li>Focused revision of core subjects: Mathematics, English Language, and Sciences</li>
        <li>Preparatory classes for external examinations</li>
        <li>Workshops on study skills, time management, and personal development</li>
        <li>Interactive group activities to encourage teamwork and problem-solving</li>
        <li>Mentorship sessions with experienced teachers</li>
      </ul>
      
      <p><strong>Learning Areas Covered:</strong></p>
      <ul>
        <li>Mathematics (Basic to Advanced concepts)</li>
        <li>English Language (Grammar, Writing, and Comprehension)</li>
        <li>Sciences (Physics, Chemistry, Biology)</li>
        <li>ICT and Digital Literacy</li>
      </ul>
      
      <p>Don't miss this opportunity to keep your child engaged, motivated, and ready for the next school term!</p>
    `,
    date: "August 11",
    time: "9:00 AM - 1:30 PM",
    location: "All Branches",
    campus: "All Branches",
    category: "Academic",
    image: "/images/summer-coaching-animation.webp?height=300&width=400",
    attendees: "All Students",
    featured: true,
    status: "upcoming",
    contact: {
      phone: "+234 803 391 6011",
      email: "info@lmhs.sch.ng",
    },
    requirements: "Open to all students from Preparatory to Secondary levels. Registration required.",
    organizer: "School Management",
  },
  {
    id: 2,
    title: "Christmas Carol",
    description:
      "An evening of joyful carol singing, student performances, and festive celebration for the whole school community.",
    fullDescription: `
      <p>Our annual Christmas Carol is a cherished tradition that brings students, parents, and staff together to celebrate the joy and warmth of the season. The event will feature heartwarming music, inspiring performances, and moments that capture the true spirit of Christmas.</p>
      
      <p><strong>Highlights Include:</strong></p>
      <ul>
        <li>School choir performing classic and contemporary Christmas carols</li>
        <li>Solo and group musical performances by our talented students</li>
        <li>Drama sketches portraying the Christmas story</li>
        <li>Audience sing-along sessions</li>
      </ul>
      
      <p><strong>Special Touches:</strong></p>
      <p>Beautiful decorations, warm lighting, and a festive atmosphere will make the evening truly magical. Parents and guests are welcome to join in the singing and enjoy seasonal refreshments after the performances.</p>
      
      <p><strong>Dress Code:</strong></p>
      <p>Festive wear or Christmas colors are encouraged for all attendees to add to the holiday cheer.</p>
      
      <p>We look forward to sharing this memorable evening with you as we celebrate the season of peace, joy, and goodwill.</p>
    `,
    date: "December 2025",
    time: "10:00 AM",
    location: "All Branches",
    campus: "All Branches",
    category: "Celebration",
    image: "/images/christmas-carol.webp?height=300&width=400",
    featured: true,
    status: "upcoming",
    contact: {
      phone: "+234 803 391 6011",
      email: "info@lmhs.sch.ng",
    },
    requirements: "Event Fee.",
    organizer: "Management",
  },
  {
    id: 3,
    title: "Inter-House Sports Competition",
    description:
      "Annual sports competition between different houses featuring athletics, football, basketball, and other sporting events.",
    fullDescription: `
      <p>Get ready for the most exciting sporting event of the year! The Inter-House Sports Competition brings together students from all four houses - Red House (Courage), Blue House (Wisdom), Green House (Unity), and Yellow House (Excellence) - in a thrilling display of athletic prowess, teamwork, and school spirit.</p>
      
      <p><strong>Competition Events:</strong></p>
      <ul>
        <li>Track and Field Events (100m, 200m, 400m, 800m, 1500m, relays)</li>
        <li>Field Events (Long jump, High jump, Shot put, Discus)</li>
        <li>Football (Soccer) tournaments for different age groups</li>
        <li>Basketball competitions</li>
        <li>Volleyball matches</li>
        <li>Table tennis championships</li>
        <li>Swimming competitions (where facilities available)</li>
        <li>Traditional games and cultural sports</li>
      </ul>
      
      <p><strong>Age Categories:</strong></p>
      <ul>
        <li>Primary School (Ages 6-11)</li>
        <li>Junior Secondary (Ages 12-14)</li>
        <li>Senior Secondary (Ages 15-17)</li>
        <li>Staff and Parent Exhibition Matches</li>
      </ul>
      
      <p><strong>Special Features:</strong></p>
      <p>This year's competition includes special recognition for sportsmanship, team spirit, and individual achievements. Professional coaches and former athletes will be present to provide guidance and inspiration to our young athletes.</p>
      
      <p><strong>Awards and Recognition:</strong></p>
      <p>Medals and trophies will be awarded to winners in each category, with special awards for:</p>
      <ul>
        <li>Overall House Championship</li>
        <li>Best Athlete (Male and Female)</li>
        <li>Most Improved Athlete</li>
        <li>Best Team Spirit</li>
        <li>Fair Play Award</li>
      </ul>
      
      <p><strong>Spectator Information:</strong></p>
      <p>Parents, family members, and community supporters are welcome to attend and cheer for their favorite house. Food and beverages will be available for purchase, and seating areas will be provided.</p>
      
      <p>Come and witness the future champions in action while celebrating the values of healthy competition and excellence!</p>
    `,
    date: "2026",
    time: "9:00 AM",
    location: "All Branches",
    campus: "All Branches",
    category: "Sports",
    image: "/images/inter-house-sports.webp?height=300&width=400",
    attendees: "All Students",
    featured: false,
    status: "upcoming",
    contact: {
      phone: "+234 803 391 6011",
      email: "info@lmhs.sch.ng",
    },
    requirements: "Sports attire required for participants. Spectators welcome.",
    organizer: "Sports Department",
  },
  {
  id: 4,
  title: "Parent-Teacher Association Meeting",
  description:
    "Important PTA meeting to introduce and explain the school's transition to a digital management system for fees and academic information.",
  fullDescription: `
    <p>This upcoming Parent-Teacher Association (PTA) meeting will serve as an important platform to inform and guide parents through the school's transition to a modern School Management System. The new digital platform will enable parents to conveniently pay school fees online and access essential academic information such as results, attendance records, and announcements.</p>
    
    <p><strong>Key Topics:</strong></p>
    <ul>
      <li>Overview of the new School Management System</li>
      <li>Step-by-step guide on how to pay school fees online</li>
      <li>Accessing student academic records and performance updates</li>
      <li>Communication channels through the digital portal</li>
      <li>Data privacy and security measures</li>
    </ul>
    
    <p><strong>Benefits for Parents:</strong></p>
    <ul>
      <li>Faster and more secure payment process</li>
      <li>24/7 access to academic information</li>
      <li>Improved communication with teachers and school administration</li>
      <li>Reduced paperwork and administrative delays</li>
    </ul>
    
    <p>Parents will also have the opportunity to ask questions, provide feedback, and receive live demonstrations of the system during the meeting. This transition marks an important step in enhancing school efficiency and improving the overall parent-school partnership.</p>
    
    <p>We encourage all parents to attend and be part of this digital transformation journey.</p>
  `,
  date: "September, 2025",
  time: "10:00 AM",
  location: "All Branches",
  campus: "All Branches",
  category: "Community",
  image: "/images/parent-teacher-conference.webp?height=300&width=400",
  attendees: "All Parents",
  featured: false,
  status: "upcoming",
  contact: {
    phone: "+234 803 391 6011",
    email: "info@lmhs.sch.ng",
  },
  requirements: "All parents and guardians.",
  organizer: "Management",
},
]

const categories = ["All", "Academic", "Sports", "Cultural", "Community", "Workshop", "Celebration", "Arts"]

// Enhanced calendar functionality
const generateICSFile = (event: (typeof upcomingEvents)[0]) => {
  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(`${dateStr} ${timeStr.split(" - ")[0]}`)
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const startDateTime = formatDate(event.date, event.time)
  const endDateTime = formatDate(event.date, event.time.split(" - ")[1] || event.time.split(" - ")[0])

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Miracle International Schools//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}-${Date.now()}@miracleschools.edu.ng`,
    `DTSTAMP:${formatDate(new Date().toDateString(), "00:00:00")}`,
    `DTSTART:${startDateTime}`,
    `DTEND:${endDateTime}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/<[^>]*>/g, "")}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `${event.title.toLowerCase().replace(/\s+/g, "-")}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const addEventToCalendar = (event: (typeof upcomingEvents)[0], service?: string) => {
  const startDate = new Date(`${event.date} ${event.time.split(" - ")[0]}`)
  const endDate = new Date(`${event.date} ${event.time.split(" - ")[1] || event.time.split(" - ")[0]}`)

  const formatDateForUrl = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const eventData = {
    title: event.title,
    description: event.description.replace(/<[^>]*>/g, ""),
    location: event.location,
    startDate: formatDateForUrl(startDate),
    endDate: formatDateForUrl(endDate),
  }

  if (!service) {
    // Show calendar options modal
    const calendarOptions = [
      { name: "Google Calendar", value: "google" },
      { name: "Outlook", value: "outlook" },
      { name: "Yahoo Calendar", value: "yahoo" },
      { name: "Download ICS File", value: "download" },
    ]

    const choice = window.prompt(
      `Choose your calendar service:\n${calendarOptions.map((opt, idx) => `${idx + 1}. ${opt.name}`).join("\n")}\n\nEnter number (1-4):`,
    )

    const selectedOption = calendarOptions[Number.parseInt(choice || "0") - 1]
    if (selectedOption) {
      if (selectedOption.value === "download") {
        generateICSFile(event)
      } else {
        addEventToCalendar(event, selectedOption.value)
      }
    }
    return
  }

  let url = ""

  switch (service) {
    case "google":
      url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${eventData.startDate}/${eventData.endDate}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`
      break
    case "outlook":
      url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventData.title)}&startdt=${eventData.startDate}&enddt=${eventData.endDate}&body=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`
      break
    case "yahoo":
      url = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(eventData.title)}&st=${eventData.startDate}&et=${eventData.endDate}&desc=${encodeURIComponent(eventData.description)}&in_loc=${encodeURIComponent(eventData.location)}`
      break
  }

  if (url) {
    window.open(url, "_blank")
  }
}

export default function EventsCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof upcomingEvents)[0] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedEvent])

  // Filter events based on selected category
  const filteredEvents =
    selectedCategory === "All" ? upcomingEvents : upcomingEvents.filter((event) => event.category === selectedCategory)

  const filteredFeaturedEvents = filteredEvents.filter((event) => event.featured)

  const EventModal = ({ event, onClose }: { event: (typeof upcomingEvents)[0]; onClose: () => void }) => (
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
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl" />
            <button
              onClick={onClose}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors border border-gray-200 shadow-lg"
              aria-label="Close event details"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
              <span className="bg-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 inline-block">
                {event.category}
              </span>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 line-clamp-2">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-200">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{event.location}</span>
                </div>
                {event.attendees && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{event.attendees}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 md:p-8">
              <div
                className="prose prose-sm sm:prose-lg max-w-none text-gray-700 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: event.fullDescription }}
              />

              {/* Event Details */}
              <div className="grid md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-4 sm:p-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Event Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <strong>Organizer:</strong> {event.organizer}
                    </div>
                    <div>
                      <strong>Requirements:</strong> {event.requirements}
                    </div>
                    
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{event.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{event.contact.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors text-sm">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Interested</span>
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
                <div className="text-xs sm:text-sm text-gray-500">Organized by {event.organizer}</div>
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Events Calendar</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for exciting events, educational workshops, and community celebrations happening across all our
            branches.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Filter by Category</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
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
              ? `Showing all ${filteredEvents.length} events`
              : `Showing ${filteredEvents.length} event${filteredEvents.length !== 1 ? "s" : ""} in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Featured Events */}
        {filteredFeaturedEvents.length > 0 && (
          <motion.div
            id="featured-events"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Featured Events
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredFeaturedEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-64">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                    <div className="flex items-center justify-between">
                      {event.attendees && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} Expected</span>
                        </div>
                      )}
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Events Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            {selectedCategory === "All" ? "All Upcoming Events" : `${selectedCategory} Events`}
          </h3>
          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-48">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{event.time.split(" - ")[0]}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span>{event.campus}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between">
                      {event.attendees && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees}</span>
                        </div>
                      )}
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        Details
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500 mb-6">
                There are no events in the {selectedCategory} category at the moment.
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                View All Events
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Calendar Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-purple-50 rounded-2xl p-8"
        >
          <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Never Miss an Event</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our events calendar and get notifications about upcoming events, workshops, and celebrations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                // Add all upcoming events to calendar
                upcomingEvents.forEach((event) => generateICSFile(event))
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Subscribe to Calendar
            </button>
            <button
              onClick={() => {
                // Generate a comprehensive PDF schedule
                window.print()
              }}
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Download PDF Schedule
            </button>
          </div>
        </motion.div>
      </div>

      {/* Event Modal */}
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </section>
  )
}