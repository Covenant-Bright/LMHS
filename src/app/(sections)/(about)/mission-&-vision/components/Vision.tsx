"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa"; // Fallback icon for broken images

export default function Vision() {
  // Correctly destructure the hook
  const [sectionRef, isInView] = useInView({
    threshold: [0.1, 0.5], // Lower and upper thresholds
  });

  const [isAnimated, setIsAnimated] = useState(false);
  const [isImageBroken, setIsImageBroken] = useState(false); // Track if image fails

  useEffect(() => {
    setIsAnimated(isInView);
  }, [isInView]);

  // Handle broken image
  const handleImageError = () => {
    setIsImageBroken(true);
  };

  return (
    <section ref={sectionRef} className="w-full py-12 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-24 md:mt-[70px]">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 relative">
          {/* Image Section with Broken Image Handling */}
          <div
            className={`w-full md:w-1/2 transition-transform duration-1000 ${
              isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            {isImageBroken ? (
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-md">
                <FaImage className="text-6xl text-gray-400" />
              </div>
            ) : (
              <Image
                src="/images/slide3.webp?height=400&width=400"
                alt="Students in a learning environment"
                width={400}
                height={400}
                className="rounded-md object-cover w-full h-auto"
                onError={handleImageError} // Handle image load failure
              />
            )}
          </div>

          {/* Demarcation Line (Only visible on md screens and above) */}
          <div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-full items-center justify-center"
            aria-hidden="true"
          >
            <div className={`w-[2px] bg-gray-400 transition-all duration-1000 ${isAnimated ? "h-full" : "h-0"}`}></div>
          </div>

          {/* Text Section */}
          <div
            className={`w-full md:w-1/2 transition-transform duration-1000 delay-300 ${
              isAnimated ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <h2 className="inline-block text-4xl font-extrabold tracking-wider uppercase text-[#d4af37] border border-gray-700 rounded px-4 py-1 mb-6">
  Vision
</h2>


            <p className="text-gray-700">
              At Miracle School, our vision is to foster a nurturing environment where every student
              discovers their unique potential, develops critical thinking skills, and becomes a responsible
              global citizen. Through an inclusive and innovative approach to education, we aim to inspire
              lifelong learning, creativity, and resilience. We are committed to providing a world-class
              educational experience that empowers students to thrive in an ever-changing world while
              staying true to our core values of integrity, excellence, and respect.
    
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
