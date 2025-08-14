"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaBaby, FaSchool, FaPaintBrush, FaBookOpen, FaGraduationCap, FaImage } from "react-icons/fa";

export default function Academic() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [brokenImages, setBrokenImages] = useState<number[]>([]);

  // Use useMemo to optimize the schools array
  const schools = useMemo(
    () => [
      {
        name: "Bright Beginnings ",
        grades: "Daycare",
        image: "/images/daycare.webp",
        link: "./daycare",
        icon: <FaBaby className="text-3xl text-pink-500" />,
      },
      {
        name: "Future Scholars ",
        grades: "Preparatory",
        image: "/images/preparatory.webp",
        link: "./preparatory",
        icon: <FaSchool className="text-3xl text-blue-500" />,
      },
      {
        name: "Little Learners ",
        grades: "Nursery",
        image: "/images/nursery.webp",
        link: "./nursery",
        icon: <FaPaintBrush className="text-3xl text-yellow-500" />,
      },
      {
        name: "Foundation Builders ",
        grades: "Primary",
        image: "/images/primary.webp",
        link: "./primary",
        icon: <FaBookOpen className="text-3xl text-green-500" />,
      },
      {
        name: "Academic Excellence ",
        grades: "Secondary",
        image: "/images/secondary.webp",
        link: "./secondary",
        icon: <FaGraduationCap className="text-3xl text-purple-500" />,
      },
    ],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          } else {
            setVisibleCards((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".school-card");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-12 px-6 md:px-12 lg:px-24 bg-gray-100 mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-900 mt-10 mb-10">Academic</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto max-w-7xl mb-12">
        {schools.map((school, index) => (
         <Link key={index} href={school.link} passHref>
         <motion.div
           data-index={index}
           className="school-card bg-white shadow-lg rounded-lg overflow-hidden block"
           aria-label={`Learn more about ${school.name}`}
           initial={{ opacity: 0, y: 50 }}
           animate={
             visibleCards.includes(index)
               ? { opacity: 1, y: 0, scale: 1.05 }
               : { opacity: 0, y: 0, scale: 0.95 }
           }
           whileHover={{ scale: 1.05 }}
           exit={{ opacity: 0, scale: 1 }}
           transition={{ type: "spring", stiffness: 70, damping: 15 }}
         >
           {brokenImages.includes(index) ? (
             <div className="w-full h-[300px] flex items-center justify-center bg-gray-200">
               <FaImage className="text-6xl text-gray-400" />
             </div>
           ) : (
            <div className="relative w-full h-[300px]">
            <Image
              src={school.image}
              alt={`Image of ${school.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => {
                setBrokenImages((prev) => [...new Set([...prev, index])]);
              }}
            />
          </div>
          
           )}
           <div className="p-6">
             <div className="flex items-center mb-4">
               {school.icon}
               <h3 className="text-xl font-bold text-gray-900 ml-4">{school.name}</h3>
             </div>
             <p className="text-gray-800 text-2xl font-semibold">{school.grades}</p>
           </div>
         </motion.div>
       </Link>
       
        ))}
      </div>
    </section>
  );
}
