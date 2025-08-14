"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Download, School, Users, CheckCircle } from "lucide-react"
import { useState } from "react"

// Define ColorKey from colorClasses
const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    gradient: "from-blue-500 to-blue-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    button: "bg-green-600 hover:bg-green-700",
    gradient: "from-green-500 to-green-600",
  },
} as const

type ColorKey = keyof typeof colorClasses

// Typed form entries
const forms: {
  id: number
  title: string
  subtitle: string
  description: string
  features: string[]
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: ColorKey
  downloadUrl: string
}[] = [
  {
    id: 1,
    title: "Miracle International School",
    subtitle: "Application Form",
    description: "Complete application form for admission to Miracle International School",
    features: [
      "Prparatory to Primary levels",
      "All branch locations",
      "Academic year 2025/2026",
      "Fillable PDF format",
    ],
    icon: School,
    color: "blue",
    downloadUrl: "/forms/miracle-application-form.pdf",
  },
  {
    id: 2,
    title: "Living Miracle School",
    subtitle: "Application Form",
    description: "Complete application form for admission to Living Miracle High School",
    features: ["Junior & Secondary School levels", "Agbeja branch", "Academic year 2025/2026", "Fillable PDF format"],
    icon: Users,
    color: "green",
    downloadUrl: "/forms/living-miracle-application-form.pdf",
  },
]

const requirements = [
  "Completed application form",
  "Recent passport photographs (2 copies)",
  "Birth certificate (photocopy)",
  "Previous academic records/transcripts",
  "Medical certificate",
  "Parent/Guardian identification",
]

export default function FormDownloads() {
  const [downloadingForm, setDownloadingForm] = useState<string | null>(null)

  const handleDownload = async (formType: "miracle" | "living-miracle", downloadUrl: string) => {
    setDownloadingForm(formType)

    try {
      // Create a temporary link element to trigger download
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download =
        formType === "miracle"
          ? "Miracle-International-School-Application-Form.pdf"
          : "Living-Miracle-School-Application-Form.pdf"

      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Show success feedback
      setTimeout(() => {
        setDownloadingForm(null)
      }, 1500)
    } catch (error) {
      console.error("Download failed:", error)
      alert("Download failed. Please try again or contact support.")
      setDownloadingForm(null)
    }
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
            Application <span className="text-green-600">Forms</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download the appropriate application form for your preferred school and begin your admission journey
          </p>
        </motion.div>

        {/* Form Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {forms.map((form, index) => {
            const Icon = form.icon
            const colors = colorClasses[form.color]
            const isDownloading = downloadingForm === (form.color === "blue" ? "miracle" : "living-miracle")

            return (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              >
                {/* Header */}
                <div className="flex items-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colors.gradient} flex items-center justify-center mr-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{form.title}</h3>
                    <p className={`text-sm ${colors.text} font-medium`}>{form.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{form.description}</p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {form.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className={`w-4 h-4 mr-3 ${colors.text}`} />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(form.color === "blue" ? "miracle" : "living-miracle", form.downloadUrl)}
                  disabled={isDownloading}
                  className={`w-full py-3 px-6 ${colors.button} text-white rounded-lg transition-all duration-300 font-semibold flex items-center justify-center ${
                    isDownloading ? "opacity-75 cursor-not-allowed" : "hover:scale-105"
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download Form
                    </>
                  )}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Requirements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Requirements List */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Required Documents</h3>
              <div className="space-y-4">
                {requirements.map((req, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{req}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h3>
              <div className="space-y-4 text-gray-600">
                <p>1. Download the appropriate application form.</p>
                <p>2. Fill out all sections completely using block letters.</p>
                <p>3. Attach all required documents as listed.</p>
                <p>4. Submit the completed form to the school's admission office.</p>
                <p>5. Pay the application processing fee upon submission.</p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
                <p className="text-blue-700 text-sm">
                  Contact our admissions office for assistance with the application process.
                </p>
                <div className="mt-2">
                  <span className="text-blue-600 font-medium">Phone: </span>
                  <span className="text-blue-700">+234 803 391 6011</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
