"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function HeroSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [lineHeight, setLineHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false); // Track when the component loads
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isSmallHeight = useMediaQuery("(max-height: 580px)");
  const isUltraSmallHeight = useMediaQuery("(max-height: 350px)");
  const isExtraSmallScreen = useMediaQuery("(max-width: 250px)");
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Calculate the height of the container before rendering
  useEffect(() => {
    const updateHeight = () => {
      let calculatedHeight = window.innerHeight * 0.8;

      if (isUltraSmallHeight) {
        calculatedHeight = 350;
      } else if (isSmallHeight) {
        calculatedHeight = window.innerHeight * 0.9;
      } else if (isDesktop) {
        calculatedHeight = window.innerHeight * 0.7;
      }

      setContainerHeight(calculatedHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isDesktop, isSmallHeight, isUltraSmallHeight]);

  // Apply fade-in effect when the page loads
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100); // Add slight delay before showing
  }, []);

  // Update line height dynamically
  useEffect(() => {
    if (isDesktop && isInView) {
      setLineHeight(document.body.scrollHeight);
    }
  }, [isInView, isDesktop]);

  // Prevent rendering until height is set
  if (containerHeight === null) return null;

  return (
    <section
      ref={(el) => {
        if (el instanceof HTMLDivElement) {
          ref.current = el;
          sectionRef.current = el;
        }
      }}
      style={{ height: `${containerHeight + (isDesktop ? 40 : 0)}px` }}
      className="relative w-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 z-0 transition-all duration-1000 ease-out ${
          isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
        }`}
      >
        <Image
          src="/images/IMG_3749.webp?height=920&width=1600"
          alt="Students at school"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
      </div>

      {/* Vertical Divider Line (only for desktop) */}
      {isDesktop && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 z-10 w-px bg-white/80"
          style={{
            height: isInView ? `${lineHeight}px` : "100%",
            transition: "height 1000ms ease-in-out, opacity 500ms ease-in-out",
            opacity: isInView ? 1 : 0.3,
            top: 0,
          }}
        />
      )}

      {/* Content Container */}
      <div
        className={`relative z-10 flex flex-col md:flex-row transition-all duration-1000 ease-out ${
          isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
        } ${
          isDesktop && isSmallHeight ? "" : "h-full justify-end md:justify-center"
        }`}
        style={
          isDesktop && isSmallHeight
            ? { position: "absolute", bottom: "1cm", width: "100%" }
            : {}
        }
      >
        {/* Left Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <h1
            className={`font-bold text-white text-center md:text-left tracking-wider whitespace-normal break-words ${
              isExtraSmallScreen ? "text-xl" : "text-4xl sm:text-4xl md:text-5xl lg:text-6xl"
            }`}
            style={{ lineHeight: 1.2 }}
          >
            MISSION & VISION
          </h1>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="text-white text-center md:text-right">
            <p
              className={`font-semibold ${
                isExtraSmallScreen ? "text-sm" : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
              } mb-2`}
              style={{ lineHeight: 1.3 }}
            >
              Success for Today.
            </p>
            <p
              className={`font-semibold ${
                isExtraSmallScreen ? "text-sm" : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
              } mb-2`}
              style={{ lineHeight: 1.3 }}
            >
              Preparation for Tomorrow.
            </p>
            <p
              className={`font-semibold ${
                isExtraSmallScreen ? "text-sm" : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
              }`}
              style={{ lineHeight: 1.3 }}
            >
              Learning for a Lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
