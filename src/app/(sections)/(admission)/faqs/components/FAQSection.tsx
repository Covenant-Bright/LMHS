"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp, School, CreditCard, Calendar, Users, BookOpen, Shield } from "lucide-react"

// 1. Define colorClasses as a const object
const colorClasses = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-500 to-blue-600" },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
    gradient: "from-green-500 to-green-600",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-500 to-purple-600",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
    gradient: "from-orange-500 to-orange-600",
  },
  teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", gradient: "from-teal-500 to-teal-600" },
  pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-500 to-pink-600" },
} as const

// 2. Extract literal keys into a type
type ColorKey = keyof typeof colorClasses

// 3. Strongly type your FAQ categories
type FAQ = { question: string; answer: string }

type FAQCategory = {
  id: string
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: ColorKey
  faqs: FAQ[]
}

const faqCategories: FAQCategory[] = [
  {
    id: "admission",
    title: "Admission Process",
    icon: School,
    color: "blue",
    faqs: [
      {
        question: "What is the admission process for Miracle Schools?",
        answer:
          "Our admission process involves 6 simple steps: Application submission, document review, assessment & interview, admission decision, fee payment, and welcome orientation. The entire process typically takes a weeks from application to enrollment.",
      },
      {
        question: "What documents are required for admission?",
        answer:
          "Required documents include: completed application form, recent passport photographs (2 copies), birth certificate (photocopy), previous academic records/transcripts, medical certificate, and parent/guardian identification.",
      },
      {
        question: "Is there an entrance examination?",
        answer:
          "Yes, we conduct age-appropriate assessment tests to evaluate the student's academic readiness. The assessment covers basic subjects relevant to the student's intended grade level.",
      },
      {
        question: "What is the minimum age requirement for admission?",
        answer:
          "For Nursery: 2-3 years, Preparatory: 4-5 years, Primary: 6-11 years, Secondary: 12-17 years. Age requirements may vary slightly based on the child's academic readiness and development.",
      },
    ],
  },
  {
    id: "fees",
    title: "Fees & Payment",
    icon: CreditCard,
    color: "green",
    faqs: [
      {
        question: "What are the school fees for different levels?",
        answer:
          "School fees vary by class and branch. Please contact our admissions office for current fee structure. We offer competitive rates with flexible payment plans to accommodate different family budgets.",
      },
      {
        question: "Are there payment plan options available?",
        answer:
          "Yes, we offer flexible payment plans including termly, bi-annual, and annual payment options. Early payment discounts are available for full annual payments.",
      },
      {
        question: "What additional costs should I expect?",
        answer:
          "Additional costs may include uniforms, textbooks, extracurricular activities e.t.c. We provide a comprehensive cost breakdown during the admission process.",
      },
      {
        question: "Is there a registration fee?",
        answer:
          "Yes, there is a one-time registration fee payable upon admission. This fee covers administrative costs and is non-refundable once the admission process is completed.",
      },
    ],
  },
  {
    id: "academic",
    title: "Academic Programs",
    icon: BookOpen,
    color: "purple",
    faqs: [
      {
        question: "What curriculum do you follow?",
        answer:
          "We follow the Nigerian National Curriculum enhanced with international best practices. Our curriculum is designed to prepare students for both local and international examinations including WAEC, NECO, and JAMB.",
      },
      {
        question: "What is your student-to-teacher ratio?",
        answer:
          "We maintain a low student-to-teacher ratio of 16:1 to ensure personalized attention and quality education. This allows our teachers to focus on individual student needs and learning styles.",
      },
      {
        question: "Do you offer extracurricular activities?",
        answer:
          "Yes, we offer a wide range of extracurricular activities including sports, music, drama, debate, science clubs, and community service programs to ensure holistic development.",
      },
      {
        question: "How do you support students with learning difficulties?",
        answer:
          "We have trained special education teachers and support staff who work with students requiring additional learning support. We develop individualized education plans (IEPs) when necessary.",
      },
    ],
  },
  {
    id: "facilities",
    title: "School Facilities",
    icon: Shield,
    color: "orange",
    faqs: [
      {
        question: "What facilities are available in school premises?",
        answer:
          "Our branches feature modern classrooms, science laboratories, computer labs, libraries, sports facilities and playgrounds to support comprehensive education.",
      },
      {
        question: "Do you provide transportation services?",
        answer:
          "At the moment, we do not provide school bus services. However, this is under active consideration, and we are exploring the possibility of introducing safe and reliable transportation for our students in the near future.",
      },
      {
        question: "What safety and security measures are in place?",
        answer:
          "We maintain comprehensive security measures, including trained security personnel, controlled access points, established emergency response procedures, and regular safety drills to ensure the safety and well-being of our students and staff.",
      },
      {
        question: "Do you provide meals for students?",
        answer:
          "No, we do not operate a cafeteria service at the moment. Parents are responsible for providing both morning and afternoon meals for their wards. We encourage parents to pack nutritious and balanced meals to support the children's health and learning throughout the day.",
      },
    ],
  },
  {
    id: "policies",
    title: "School Policies",
    icon: Users,
    color: "teal",
    faqs: [
      {
        question: "What is your attendance policy?",
        answer:
          "We require a minimum of 85% attendance for academic progression. Parents are notified of absences, and make-up work is provided for excused absences. Chronic absenteeism may affect promotion.",
      },
      {
        question: "What is your discipline policy?",
        answer:
          "We follow a positive discipline approach focusing on character development and responsible behavior. Our discipline policy emphasizes respect, responsibility, and restorative practices.",
      },
      {
        question: "Can students transfer between branches?",
        answer:
          "Yes, students can transfer between our branches subject to availability and academic requirements. Transfer requests are evaluated on a case-by-case basis.",
      },
      {
        question: "What is your refund policy?",
        answer:
          "Refund policies vary depending on the timing of withdrawal and circumstances. Please refer to our enrollment agreement or contact the admissions office for specific refund terms.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact & Communication",
    icon: Calendar,
    color: "pink",
    faqs: [
      {
        question: "How can parents communicate with teachers?",
        answer:
          "Parents can communicate with teachers through our parent portal, scheduled parent-teacher conferences, email, phone calls, and regular progress reports. We encourage open communication.",
      },
      {
        question: "How often do you provide progress reports?",
        answer:
          "We provide progress reports at mid-term and end of each term. Additionally, parents receive regular updates through our parent portal and can request meetings with teachers as needed.",
      },
      {
        question: "Do you have a parent-teacher association?",
        answer:
          "Yes, we have an active Parent-Teacher Association (PTA) that meets regularly to discuss school matters, organize events, and support school development initiatives.",
      },
      {
        question: "What are your school hours?",
        answer:
          "School hours are typically from 8:00 AM to 5:00 PM, Monday through Thursday. On Fridays, school closes at 12:00 PM. We also offer extended care and after-school programs for working parents who may need additional supervision for their children.",
      },
    ],
  },
]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory["id"]>("admission")
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const toggleFAQ = (faqId: string) => setOpenFAQ(openFAQ === faqId ? null : faqId)

  const activeData = faqCategories.find((c) => c.id === activeCategory)!

  const openWhatsAppChat = () => {
    const phoneNumber = "2348033916011" // School's phone number without + and spaces
    const message = "Hello! I have a question about admission to your school. Can you please help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Frequently Asked <span className="text-purple-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our admission process, academic programs, and school policies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {faqCategories.map((cat) => {
                  const Icon = cat.icon
                  const colors = colorClasses[cat.color]
                  const isActive = cat.id === activeCategory
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? `${colors.bg} ${colors.text} ${colors.border} border`
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className={`w-5 h-5 mr-3 ${isActive ? colors.text : "text-gray-400"}`} />
                        <span className="text-sm font-medium">{cat.title}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses[activeData.color].gradient} flex items-center justify-center mr-4`}
                >
                  <activeData.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{activeData.title}</h3>
                  <p className="text-gray-600">{activeData.faqs.length} questions</p>
                </div>
              </div>

              <div className="space-y-4">
                {activeData.faqs.map((faq, idx) => {
                  const faqId = `${activeCategory}-${idx}`
                  const isOpen = openFAQ === faqId
                  return (
                    <motion.div
                      key={faqId}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(faqId)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-300 flex items-center justify-between"
                      >
                        <span className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our admissions team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openWhatsAppChat}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold"
              >
                Chat Admin
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
