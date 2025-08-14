"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa"; // Fallback icon for broken images

export default function LearningEnvironment() {
  const [imageRef, imageInView, imageHasLeft] = useInView({ threshold: 0.1 });
  const [textRef, textInView, textHasLeft] = useInView({ threshold: 0.1 });

  const [imageAnimated, setImageAnimated] = useState(false);
  const [textAnimated, setTextAnimated] = useState(false);
  const [lineAnimated, setLineAnimated] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isImageBroken, setIsImageBroken] = useState(false); // Track if image fails

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsResizing(false), 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (isResizing) return;

    setImageAnimated(imageInView || (!imageInView && !imageHasLeft));
    setTextAnimated(textInView || (!textInView && !textHasLeft));
    setLineAnimated(textInView || imageInView); // Line animates when either section is in view
  }, [imageInView, imageHasLeft, textInView, textHasLeft, isResizing]);

  // Handle broken image
  const handleImageError = () => {
    setIsImageBroken(true);
  };

  return (
    <section className="w-full py-12 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-24">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 relative">
          {/* Image Section with Broken Image Handling */}
          <div
            ref={imageRef}
            className={`w-full md:w-1/2 transition-transform duration-1000 ${
              imageAnimated ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"
            }`}
          >
            {isImageBroken ? (
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-md">
                <FaImage className="text-6xl text-gray-400" />
              </div>
            ) : (
              <Image
                src="/images/IMG_3736.webp?height=400&width=400"
                alt="Learning environment"
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
            <div
              className={`w-[2px] bg-gray-400 transition-all duration-1000 ${
                lineAnimated ? "h-full" : "h-0"
              }`}
            ></div>
          </div>

          {/* Text Section */}
          <div
            ref={textRef}
            className={`w-full md:w-1/2 transition-transform duration-1000 delay-300 ${
              textAnimated ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            <h2 className="inline-block text-4xl font-extrabold tracking-wider uppercase text-[#d4af37] border border-gray-700 rounded px-4 py-1 mb-6">
            Learning Environment
</h2>

            <p className="text-gray-700">
            We provide a supportive, engaging, and safe learning environment that promotes
            collaboration, creativity, and curiosity. Our classrooms are designed to encourage active
            participation, critical thinking, and exploration. By fostering respect, inclusivity, and openness,
            we create an atmosphere where students feel empowered to take risks and reach their full
            potential. With a strong focus on individualized learning, we ensure that each student’s needs
            are met, allowing them to grow into confident, well-rounded individuals ready for future challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
