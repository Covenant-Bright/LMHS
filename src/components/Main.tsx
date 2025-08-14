"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"

export default function Main() {
  const textControls = useAnimation()
  const imageControls = useAnimation()
  const dividerControls = useAnimation()
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const sectionRef = useRef(null)

  const isTextInView = useInView(textRef, { amount: "some", once: false })
  const isImageInView = useInView(imageRef, { amount: "some", once: false })

  const [showBubbles, setShowBubbles] = useState(false)

  useEffect(() => {
    if (isTextInView) {
      textControls.start({ opacity: 1, y: 0, x: 0 })
    } else {
      textControls.start({ opacity: 0, y: 50, x: -50 })
    }
  }, [isTextInView, textControls])

  useEffect(() => {
    if (isImageInView) {
      imageControls.start({ opacity: 1, y: 0, x: 0 })
    } else {
      imageControls.start({ opacity: 0, y: 50, x: 50 })
    }
  }, [isImageInView, imageControls])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBubbles(true)
    }, 1000) // Delay bubble animation by 1 second

    return () => clearTimeout(timeout)
  }, [])

  // Animate the demarcation line (growing effect)
  useEffect(() => {
    dividerControls.start({ height: "100%" })
  }, [dividerControls])

  const bubbles = useMemo(() => {
    return [...Array(20)].map(() => ({
      size: Math.random() * 50 + 10,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 3,
    }))
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col md:flex-row items-center justify-center w-full h-auto text-white px-4 sm:px-6 md:px-10 gap-6
                 bg-gradient-to-b from-black/0 via-black/80 to-black overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24"
    >
      {/* Floating Bubbles Effect */}
      {showBubbles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {bubbles.map((bubble, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/20 rounded-full"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                top: `${bubble.top}%`,
                left: `${bubble.left}%`,
              }}
              animate={{ y: [0, -100], opacity: [1, 0] }}
              transition={{
                duration: bubble.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: bubble.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Growing Demarcation Line */}
      <motion.div
        className="absolute top-0 left-1/2 hidden md:block transform -translate-x-1/2"
        initial={{ height: "0%" }}
        animate={dividerControls}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          width: "2px",
          backgroundColor: "gray",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      ></motion.div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center md:gap-x-10">
        {/* Left Side - Text Content */}
        <motion.div
          ref={textRef}
          className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, y: 50, x: -50 }}
          animate={textControls}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">We Transform the School Experience</h1>
          <p className="text-base sm:text-lg leading-relaxed">
            At Miracle School, established in 1994, we are committed to transforming the school experience by fostering
            innovation, inclusivity, and excellence in education. Our dynamic curriculum blends modern technology with
            holistic learning, ensuring students develop critical thinking, creativity, and leadership skills. With
            state-of-the-art facilities, passionate educators, and a student-centered approach, we nurture a love for
            learning while preparing students for a rapidly evolving world. Through personalized support,
            extracurricular opportunities, and a strong community spirit, Miracle School empowers every child to achieve
            their full potential, making education not just a process but a life-changing journey.
          </p>
          <p className="text-lg font-semibold"> Pastor Muyiwa Ojo (P.M.O.), Proprietor</p>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          ref={imageRef}
          className="w-full md:w-1/2 flex justify-end md:justify-center"
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={imageControls}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/images/proprietor.webp"
            alt="Proprietor of Miracle School"
            width={500}
            height={400}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}

