"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { FaImage } from "react-icons/fa"; // Import fallback icon

export default function WhyMiracleSchool() {
  const [text, setText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isImageBroken, setIsImageBroken] = useState(false); // Track broken image

const fullText =
  "At Miracle School, we pride ourselves on providing a transformative educational experience that nurtures both academic excellence and character development. From the moment your child steps through our doors, they become part of a vibrant community dedicated to unlocking their full potential. Our experienced educators employ innovative teaching methods that inspire curiosity, critical thinking, and a lifelong love of learning. We believe every student deserves personalized attention in a safe, supportive environment where they can thrive academically, socially, and emotionally. " +
  "Admission for the 2025/2026 session is currently ongoing — please proceed by clicking the Admission button below.";

const { ref, inView } = useInView({
  triggerOnce: false,
  threshold: 0.1,
});


  useEffect(() => {
    if (inView) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <section ref={ref} className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content for desktop (md and above) */}
          <div className="hidden md:block">
            <div
              className={cn(
                "space-y-6 transition-all duration-1000",
                inView ? "opacity-100 blur-none" : "opacity-0 blur-md"
              )}
            >
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-shadow-lg"
                style={{
                  WebkitTextStroke: "2px gray",
                  WebkitTextFillColor: "white",
                }}
              >
                Why Miracle School
              </h2>
              <div className="min-h-[240px]">
                <p className="text-lg text-gray-700">
                  {text}
                  {!isComplete && <span className="animate-pulse">|</span>}
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="./admission-process"
                  className="inline-flex items-center px-6 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl group"
                >
                  Admission
                  <span className="relative ml-2 transition-transform group-hover:translate-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 animate-arrow-move"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Image section with broken image handling */}
          <div
            className={cn(
              "relative h-[400px] rounded-lg overflow-hidden transition-all duration-1000 delay-300",
              inView ? "opacity-100 blur-none" : "opacity-0 blur-md"
            )}
          >
            {isImageBroken ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <FaImage className="text-6xl text-gray-400" />
              </div>
            ) : (
              <Image
                src="/images/admission.webp"
                alt="Students engaged in learning at Miracle School"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                onError={() => setIsImageBroken(true)} // Handle broken image
              />
            )}
          </div>

          {/* Content for mobile (below md) - appears after the image */}
          <div className="block md:hidden">
            <div
              className={cn(
                "space-y-6 transition-all duration-1000",
                inView ? "opacity-100 blur-none" : "opacity-0 blur-md"
              )}
            >
              <h2
                className="text-4xl font-bold tracking-tighter text-gray-800 drop-shadow-lg"
                style={{
                  WebkitTextStroke: "1.8px gray",
                  WebkitTextFillColor: "white",
                }}
              >
                Why Miracle School
              </h2>
              <div className="min-h-[240px]">
                <p className="text-lg text-gray-700">
                  {text}
                  {!isComplete && <span className="animate-pulse">|</span>}
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="./admission-process"
                  className="inline-flex items-center px-6 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl group"
                >
                  Admission
                  <span className="relative ml-2 transition-transform group-hover:translate-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 animate-arrow-move"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes arrowMove {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(4px);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-arrow-move {
          animation: arrowMove 1.5s infinite ease-in-out;
        }

        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
}
