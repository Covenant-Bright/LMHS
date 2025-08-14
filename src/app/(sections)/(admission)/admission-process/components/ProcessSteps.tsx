"use client"

import { motion } from "framer-motion"
import { FileText, UserCheck, CreditCard, GraduationCap, CheckCircle, Users } from "lucide-react"

// ✅ Define color key type based on colorClasses
type ColorKey = keyof typeof colorClasses

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-500 to-blue-600",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    gradient: "from-indigo-500 to-indigo-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-500 to-purple-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    gradient: "from-green-500 to-green-600",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    gradient: "from-orange-500 to-orange-600",
  },
  teal: {
    bg: "bg-teal-100",
    text: "text-teal-600",
    border: "border-teal-200",
    gradient: "from-teal-500 to-teal-600",
  },
}

const steps: {
  id: number
  title: string
  description: string
  icon: any
  color: ColorKey
  details: string[]
}[] = [
  {
    id: 1,
    title: "Application Submission",
    description: "Complete and submit the admission application form with required documents",
    icon: FileText,
    color: "blue",
    details: [
      "Fill out the application form completely",
      "Submit academic transcripts",
      "Provide passport photographs",
      "Include birth certificate copy",
    ],
  },
  {
    id: 2,
    title: "Document Review",
    description: "Our admissions team reviews your application and supporting documents",
    icon: UserCheck,
    color: "indigo",
    details: [
      "Academic record verification",
      "Document authenticity check",
      "Eligibility assessment",
      "Initial screening process",
    ],
  },
  {
    id: 3,
    title: "Assessment & Interview",
    description: "Participate in our assessment test and interview process",
    icon: Users,
    color: "purple",
    details: [
      "Age-appropriate assessment test",
      "Student interview session",
      "Parent/guardian meeting",
      "School tour and orientation",
    ],
  },
  {
    id: 4,
    title: "Admission Decision",
    description: "Receive your admission decision and enrollment information",
    icon: CheckCircle,
    color: "green",
    details: [
      "Admission decision notification",
      "Enrollment package delivery",
      "Fee structure information",
      "Welcome orientation details",
    ],
  },
  {
    id: 5,
    title: "Fee Payment",
    description: "Complete the fee payment process to secure your admission",
    icon: CreditCard,
    color: "orange",
    details: [
      "Registration fee payment",
      "First term fee payment",
      "Payment plan options available",
      "Receipt and confirmation",
    ],
  },
  {
    id: 6,
    title: "Welcome to School",
    description: "Begin your educational journey with orientation and class assignment",
    icon: GraduationCap,
    color: "teal",
    details: [
      "New student orientation",
      "Class and section assignment",
      "Uniform and book collection",
      "First day preparation",
    ],
  },
]

export default function ProcessSteps() {
  return (
    <section id="admission-process" className="py-20 px-4 bg-white">
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
            Admission <span className="text-blue-600">Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined admission process is designed to make joining our school community as smooth as possible
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-green-200 rounded-full hidden lg:block"></div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              const colors = colorClasses[step.color]
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${isEven ? "lg:pr-12" : "lg:pl-12"}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                      {/* Step Number */}
                      <div className="flex items-center mb-4">
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${colors.gradient} text-white flex items-center justify-center text-sm font-bold mr-3`}
                        >
                          {step.id}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">Step {step.id}</div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                      <p className="text-gray-600 mb-6">{step.description}</p>

                      {/* Details */}
                      <div className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <div className={`w-2 h-2 rounded-full ${colors.bg} mr-3`}></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Icon */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Mobile Icon */}
                  <div className="lg:hidden mb-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Begin?</h3>
            <p className="text-gray-600 mb-6">Start your admission process today and join our academic community</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/application-form" // <-- put your link here
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-center"
              >
                Download Application Form
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
