"use client"

import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Shield, Users, BookOpen, Clock, Heart, Gavel } from "lucide-react"
import { useState } from "react"

const policyData = [
  {
    id: "admission",
    title: "Admission Policy",
    icon: BookOpen,
    color: "blue",
    sections: [
      {
        title: "Admission Requirements",
        content: [
          "Completed application form with all required documentation",
          "Birth certificate or age declaration affidavit",
          "Previous school records and transcripts (for transfer students)",
          "Medical examination report and immunization records",
          "Passport photographs (4 copies)",
          "Parent/guardian identification documents",
        ],
      },
      {
        title: "Age Requirements",
        content: [
          "Daycare: 6 months - 2 years",
          "Preparatory: 2 - 4 years",
          "Nursery: 4 - 6 years",
          "Primary: 6 - 11 years",
          "Secondary: 11 - 17 years",
        ],
      },
      {
        title: "Admission Process",
        content: [
          "Submit completed application with required documents",
          "Attend entrance assessment (for Primary and Secondary)",
          "Parent/guardian interview with school administration",
          "Payment of admission and first term fees",
          "Orientation program for new students and parents",
        ],
      },
    ],
  },
  {
    id: "academic",
    title: "Academic Policy",
    icon: BookOpen,
    color: "green",
    sections: [
      {
        title: "Curriculum Standards",
        content: [
          "Nigerian National Curriculum with international best practices",
          "STEM-focused learning approach",
          "Character and moral education integration",
          "Regular curriculum review and updates",
          "Qualified and certified teaching staff",
        ],
      },
      {
        title: "Assessment and Grading",
        content: [
          "Continuous assessment throughout the term (40%)",
          "End-of-term examinations (60%)",
          "Grade scale: A (70-100%), B (69-50%), C (49-45%), D (44-40%), F (Below 40%)",
          "Progress reports issued three times per academic year",
          "Parent-teacher conferences scheduled regularly",
        ],
      },
      {
        title: "Homework and Assignments",
        content: [
          "Age-appropriate homework assignments",
          "Weekend and holiday assignments as necessary",
          "Late submission penalties apply",
          "Parent involvement encouraged for younger students",
          "Digital platforms used for assignment distribution",
        ],
      },
    ],
  },
  {
    id: "conduct",
    title: "Student Conduct Policy",
    icon: Users,
    color: "purple",
    sections: [
      {
        title: "Code of Conduct",
        content: [
          "Respect for all members of the school community",
          "Honesty and integrity in all academic and social interactions",
          "Punctuality and regular attendance",
          "Proper use of school facilities and resources",
          "Adherence to dress code and grooming standards",
          "No tolerance for bullying, harassment, or discrimination",
        ],
      },
      {
        title: "Disciplinary Measures",
        content: [
          "Verbal warning and counseling",
          "Written warning to parents/guardians",
          "Detention or community service",
          "Suspension (internal or external)",
          "Expulsion (for serious offenses)",
          "Restorative justice approaches when appropriate",
        ],
      },
      {
        title: "Prohibited Items",
        content: [
          "Weapons or dangerous objects",
          "Illegal substances or alcohol",
          "Inappropriate electronic devices during class",
          "Offensive or inappropriate materials",
          "Items that disrupt the learning environment",
          "Unauthorized food items (due to allergies)",
        ],
      },
    ],
  },
  {
    id: "attendance",
    title: "Attendance Policy",
    icon: Clock,
    color: "orange",
    sections: [
      {
        title: "Attendance Requirements",
        content: [
          "Minimum 85% attendance required for promotion",
          "School hours: 7:30 AM - 5:00 PM (Monday to Friday)",
          "Punctuality is mandatory - late arrivals recorded",
          "Early departures require prior approval",
          "Make-up work required for excused absences",
          "Excessive absences may result in grade retention",
        ],
      },
      {
        title: "Excused Absences",
        content: [
          "Illness with medical certificate",
          "Family emergencies or bereavement",
          "Religious observances",
          "Pre-approved educational trips",
          "Court appearances or legal obligations",
          "Other circumstances approved by administration",
        ],
      },
      {
        title: "Reporting Procedures",
        content: [
          "Notify school by 9:00 AM on day of absence",
          "Medical certificate required for illness over 3 days",
          "Advance notice required for planned absences",
          "Regular communication with class teachers",
          "Attendance records maintained and reported to parents",
        ],
      },
    ],
  },
  {
    id: "safety",
    title: "Safety and Security Policy",
    icon: Shield,
    color: "red",
    sections: [
      {
        title: "Security",
        content: [
          "24/7 security personnel on all school branches",
          "Controlled access with visitor registration",
          "Emergency response procedures in place",
          "Regular safety drills and training",
        ],
      },

      {
        title: "Emergency Procedures",
        content: [
          "Fire evacuation plans and regular drills",
          "Lockdown procedures for security threats",
          "Medical emergency response protocols",
          "Parent notification systems",
          "Coordination with local emergency services",
          "Staff training on emergency procedures",
        ],
      },
    ],
  },
  {
    id: "parent",
    title: "Parent Engagement Policy",
    icon: Heart,
    color: "pink",
    sections: [
      {
        title: "Communication Channels",
        content: [
          "Regular newsletters and school updates",
          "Parent-teacher conferences each term",
          "Open door policy for parent consultations",
          "Digital platforms for real-time communication",
          "Parent WhatsApp groups for each branch",
          "Annual parent satisfaction surveys",
        ],
      },
      {
        title: "Volunteer Opportunities",
        content: [
          "School event planning and coordination",
          "Career day presentations and mentoring",
          "Library and reading program support",
          "Sports and extracurricular activities",
          "Parent-Teacher Association participation",
        ],
      },
      {
        title: "Home-School Partnership",
        content: [
          "Shared responsibility for student success",
          "Regular homework and study support",
          "Reinforcement of school values at home",
          "Attendance at school events and programs",
          "Timely communication of concerns",
          "Support for school policies and procedures",
        ],
      },
    ],
  },
]

export default function PolicySections() {
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const togglePolicy = (policyId: string) => {
    setExpandedPolicy(expandedPolicy === policyId ? null : policyId)
    setExpandedSection(null)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500/10 border-blue-500/20 text-blue-600",
      green: "bg-green-500/10 border-green-500/20 text-green-600",
      purple: "bg-purple-500/10 border-purple-500/20 text-purple-600",
      orange: "bg-orange-500/10 border-orange-500/20 text-orange-600",
      red: "bg-red-500/10 border-red-500/20 text-red-600",
      pink: "bg-pink-500/10 border-pink-500/20 text-pink-600",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Policies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guidelines that ensure excellence, safety, and success for our entire school community.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {policyData.map((policy, index) => {
            const Icon = policy.icon
            const isExpanded = expandedPolicy === policy.id

            return (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => togglePolicy(policy.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(policy.color)}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{policy.title}</h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-6 space-y-4">
                      {policy.sections.map((section, sectionIndex) => {
                        const sectionId = `${policy.id}-${sectionIndex}`
                        const isSectionExpanded = expandedSection === sectionId

                        return (
                          <div key={sectionIndex} className="border border-gray-200 rounded-lg">
                            <button
                              onClick={() => toggleSection(sectionId)}
                              className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-gray-800">{section.title}</h4>
                                {isSectionExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                              </div>
                            </button>

                            {isSectionExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-gray-200 p-4 bg-gray-50"
                              >
                                <ul className="space-y-2">
                                  {section.content.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex items-start space-x-3">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-gray-700 leading-relaxed">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-blue-900 text-white rounded-xl p-8 max-w-2xl mx-auto">
            <Gavel className="w-12 h-12 text-blue-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Questions About Our Policies?</h3>
            <p className="text-blue-100 mb-6">
              Our administration team is here to help clarify any policy questions or concerns you may have.
            </p>
            <div className="space-y-2">
              <p className="text-blue-200">
                <strong>Email:</strong> support@lmhs.sch.ng
              </p>
              <p className="text-blue-200">
                <strong>Phone:</strong> +234 803 391 6011
              </p>
              <p className="text-blue-200">
                <strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 4:00 PM
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
