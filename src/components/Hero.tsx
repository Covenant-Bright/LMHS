"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const images = [
  "/images/slide1.webp",
  "/images/slide2.webp",
  "/images/slide3.webp",
  "/images/slide4.webp",
  "/images/slide5.webp"
];

const schoolNames = [
  ["MIRACLE", "INT'L SCHOOL"],
  ["LIVING MIRACLE", "HIGH SCHOOL"]
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [schoolNameIndex, setSchoolNameIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    const nameInterval = setInterval(() => {
      setSchoolNameIndex((prev) => (prev + 1) % schoolNames.length);
    }, 10000);
    return () => {
      clearInterval(imageInterval);
      clearInterval(nameInterval);
    };
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full min-h-[400px] h-[50vh] md:h-[50vh] lg:h-screen flex flex-col justify-center items-center overflow-hidden px-4">
      {/* Add font import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@400;500;700&display=swap');
        .alegreya-font {
          font-family: 'Alegreya Sans SC', sans-serif;
        }
      `}</style>

      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt="Slide"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Masking Effect */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
      
      {/* Tapered Demarcation Line */}
      <div className="absolute bottom-[-3rem] md:bottom-[-3.5rem] lg:bottom-0 left-1/2 hidden md:block transform -translate-x-1/2">
        <svg width="6" height="100" viewBox="0 0 6 100" preserveAspectRatio="none">
          <polygon points="3,0 6,100 0,100" fill="gray" />
        </svg>
      </div>

      {/* Animated School Name - MODIFIED SECTION */}
      <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center text-white text-center w-full max-w-screen-md">
        {schoolNames[schoolNameIndex].map((line, index) => {
          return (
            <motion.h1
              key={`${schoolNameIndex}-${index}-${line}`}
              className="alegreya-font max-[320px]:text-4xl text-[40px] sm:text-5xl md:text-6xl lg:text-[70px] font-bold uppercase leading-tight mt-2 text-white max-[320px]:flex max-[320px]:flex-col max-[320px]:items-center"
              style={{
                WebkitTextStroke: "2px rgba(50, 50, 50, 0.7)",
                textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)",
                fontWeight: 700 // Bold weight for Alegreya Sans SC
              }}
            >
              {typeof window !== "undefined" && window.innerWidth < 320
                ? line.replace("HIGH", "").trim().split(" ").map((word, i) => (
                    <span key={i} className="block">
                      <AnimatedText text={word} />
                    </span>
                  ))
                : <AnimatedText text={line} />
              }
            </motion.h1>
          );
        })}
      </div>
    </section>
  );
}