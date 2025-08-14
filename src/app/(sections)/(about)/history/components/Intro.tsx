"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaImage } from "react-icons/fa"; // Fallback icon

const pages = [
  {
    id: "founding-vision",
    title: "Founding & Vision",
    image: "/images/_MG_1751.webp",
    content: (
      <div className="grid gap-4">
        <h2 className="text-4xl font-bold">
          Founding <span className="text-orange-600">& Vision</span>
        </h2>
        <p className="text-gray-100 mt-2">
          Established in 1994, Miracle School was founded with a clear vision to provide quality education that emphasizes academic excellence, character development, and holistic growth. The founders aimed to create an institution that offers a strong academic foundation while nurturing each student’s unique talents, values, and creativity. Since its inception, the school has evolved with innovative approaches, consistently adapting to educational trends while upholding principles of integrity, inclusivity, and empowerment. Its enduring commitment has transformed countless lives and shaped future leaders.
        </p>
      </div>
    ),
  },
  {
    id: "growth-expansion",
    title: "Growth & Expansion",
    image: "/images/IMG_3746.webp",
    content: (
      <div className="grid gap-4">
        <h2 className="text-4xl font-bold">
          Growth <span className="text-orange-600">& Expansion</span>
        </h2>
        <p className="text-gray-100 mt-2">
          Since its inception in 1994, Miracle School has experienced remarkable growth and expansion. What began as a modest educational institution has blossomed into a vibrant school offering diverse academic programs and extracurricular activities. The school continuously invests in state-of-the-art facilities and innovative teaching methods to enhance student learning. With increasing enrollment and community recognition, Miracle School has broadened its reach, ensuring that more students benefit from a nurturing and dynamic environment that fosters academic excellence, creativity, and personal development effectively.
        </p>
      </div>
    ),
  },
  {
    id: "achievements-milestones",
    title: "Achievements & Milestones",
    image: "/images/_MG_1873.webp",
    content: (
      <div className="grid gap-4">
        <h2 className="text-4xl font-bold">
          Achievements <span className="text-orange-600">& Milestones</span>
        </h2>
        <p className="text-gray-100 mt-2">
          Throughout its history since 1994, Miracle School has achieved numerous milestones and accolades. Consistently delivering outstanding academic results and producing successful graduates, the institution is renowned for its unwavering commitment to excellence. Recognized for leadership in innovation and community engagement, the school has earned awards and honors that celebrate both academic and extracurricular accomplishments. Its strong reputation is built on decades of dedication to student success, inspiring educators, and impactful community service, making Miracle School a beacon of educational achievement.
        </p>
      </div>
    ),
  },
];


export default function Intro() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [brokenImages, setBrokenImages] = useState<boolean[]>(new Array(pages.length).fill(false));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % pages.length);
      }, 300);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 15000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleNavClick = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setActiveIndex(index);
    }, 300);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    resetTimer();
  };

  // Handle broken image
  const handleImageError = (index: number) => {
    setBrokenImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

 return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/_MG_2168.webp"
          alt="Background"
          fill
          priority
          className="object-cover w-full h-full blur-sm brightness-75 transition-all duration-500"
        />
        {/* Dark Overlay if needed */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-30 md:py-45 transition-all duration-300",
          loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
        )}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
          Get started with <span className="text-orange-400">Miracle</span> School
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4 lg:gap-0 text-white">
          <div className="relative">
            <div className="absolute left-0 top-0 w-[2px] bg-gray-300 h-full md:h-[110px]"></div>
            <nav className="flex flex-col space-y-4 pl-6">
              {pages.map((page, index) => (
                <button
                  key={page.id}
                  onClick={() => handleNavClick(index)}
                  className={cn(
                    "text-left transition-all duration-300 ease-in-out",
                    index === activeIndex ? "text-orange-400 font-semibold" : "text-gray-300"
                  )}
                >
                  {page.title}
                </button>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 md:mt-6 lg:mt-0">
            <div className="relative overflow-hidden rounded-lg h-[400px]">
              {brokenImages[activeIndex] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <FaImage className="text-6xl text-gray-400" />
                </div>
              ) : (
                <Image
                  src={pages[activeIndex].image}
                  alt="Slide"
                  width={800}
                  height={600}
                  priority
                  className={cn(
                    "w-full h-full object-cover transition-all duration-300 ease-in-out rounded-lg",
                    isTransitioning || !loaded ? "opacity-0 blur-md" : "opacity-100 blur-0"
                  )}
                  onError={() => handleImageError(activeIndex)}
                />
              )}
            </div>

            <div
              className={cn(
                "transition-all duration-300 ease-in-out text-white",
                isTransitioning || !loaded ? "opacity-0 blur-md" : "opacity-100 blur-0"
              )}
            >
              {pages[activeIndex].content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
