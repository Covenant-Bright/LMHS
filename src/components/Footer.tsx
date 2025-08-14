"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { Instagram, Facebook, Youtube } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const [isTranslateVisible, setIsTranslateVisible] = useState(false)
  const [currentLogo, setCurrentLogo] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [logosPreloaded, setLogosPreloaded] = useState(false)
  const logoDataUrls = useRef<string[]>([])
  const whatsappNumber = process.env.NEXT_PUBLIC_FOOTER_WHATSAPP_NUMBER || "";

  // Logo sources (ensure these paths are correct)
  const logos = useMemo(() => ["/images/logo.png", "/images/logo2.png"], [])

  // Preload logos and convert them to data URLs for offline support
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = logos.map((src, index) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image()
            img.crossOrigin = "anonymous"
            img.onload = () => {
              const canvas = document.createElement("canvas")
              canvas.width = img.width
              canvas.height = img.height
              const ctx = canvas.getContext("2d")
              if (ctx) {
                ctx.drawImage(img, 0, 0)
                logoDataUrls.current[index] = canvas.toDataURL()
              }
              resolve()
            }
            img.onerror = () => {
              console.error(`Failed to load image: ${src}`)
              resolve() // Continue even if one fails
            }
            img.src = src
          })
        })
        await Promise.all(imagePromises)
        setLogosPreloaded(true)
      } catch (error) {
        console.error("Error preloading images:", error)
        setLogosPreloaded(true)
      }
    }
    preloadImages()
  }, [logos])

  // Rotate logos after preloading with a simple spin animation
  useEffect(() => {
    if (logosPreloaded) {
      const logoInterval = setInterval(() => {
        setIsSpinning(true)
        // Change logo halfway through the animation
        setTimeout(() => {
          setCurrentLogo((prev) => (prev === 0 ? 1 : 0))
        }, 500)
        // Reset spinning state after full rotation
        setTimeout(() => {
          setIsSpinning(false)
        }, 1000)
      }, 10000)
      return () => clearInterval(logoInterval)
    }
  }, [logosPreloaded])

  // Utility function to remove previously injected Google Translate elements & scripts
  const cleanupTranslateElements = () => {
    const element = document.getElementById("google_translate_element")
    if (element) {
      element.innerHTML = ""
    }
    // Remove any duplicate script tags
    const translateScripts = document.querySelectorAll("script[src*='translate.google.com/translate_a/element.js']")
    translateScripts.forEach((script) => script.remove())
  }

  // Function to load and initialize the Google Translate widget
  const loadTranslateWidget = useCallback(() => {
    cleanupTranslateElements()
    // Define the callback for Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            // Languages: English, Hausa, Yoruba, Igbo, French, Spanish, Arabic
            includedLanguages: "en,ha,yo,ig,fr,es,ar",
            layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
            autoDisplay: false,
          },
          "google_translate_element",
        )
      }
    }
    // Create a new script element to load the Google Translate script
    const script = document.createElement("script")
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true
    document.body.appendChild(script)
  }, [])

  // Toggle function that conditionally renders the widget
  const toggleTranslate = useCallback(() => {
    if (!isTranslateVisible) {
      // If opening the widget, load it and then show the container
      loadTranslateWidget()
      setIsTranslateVisible(true)
    } else {
      // Otherwise, hide and clean up the container so that spacing is removed
      cleanupTranslateElements()
      setIsTranslateVisible(false)
    }
  }, [isTranslateVisible, loadTranslateWidget])

  // Use the preloaded logo if available; otherwise, fallback
  const getCurrentLogo = () => {
    if (logosPreloaded && logoDataUrls.current[currentLogo]) {
      return logoDataUrls.current[currentLogo]
    }
    return logos[currentLogo] || "/placeholder.svg"
  }

  return (
    <>
      <footer id="footer" className="bg-black text-white relative text-center pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-[17px] text-center md:text-left">
          <div className="mx-auto">
            <h3 className="font-bold mb-4 uppercase tracking-wide">Our Schools</h3>
            <ul className="space-y-2">
              <li>
                <a href="./miracle-international-school-ososami" className="link-underline">
                  Miracle International School (Ososami)
                </a>
              </li>
              <li>
                <a href="./miracle-international-school-molete" className="link-underline">
                  Miracle International School (Molete)
                </a>
              </li>
              <li>
                <a href="./miracle-international-school-osoba" className="link-underline">
                  Miracle International School (Osoba)
                </a>
              </li>
              <li>
                <a href="./living-miracle-school-agbeja" className="link-underline">
                  Living Miracle School (Agbeja)
                </a>
              </li>
            </ul>
          </div>

          <div className="mx-auto">
            <h3 className="font-bold mb-4 uppercase tracking-wide">Academics</h3>
            <ul className="space-y-2">
              <li>
                <a href="/preparatory" className="link-underline">
                  Preparatory Classes
                </a>
              </li>
              <li>
                <a href="/nursery" className="link-underline">
                  Nursery Classes
                </a>
              </li>
              <li>
                <a href="/primary" className="link-underline">
                  Primary Classes
                </a>
              </li>
              <li>
                <a href="/secondary" className="link-underline">
                  Secondary Classes
                </a>
              </li>
            </ul>
          </div>

          <div className="mx-auto">
            <h3 className="font-bold mb-4 uppercase tracking-wide">Portals</h3>
            <ul className="space-y-2">
              <li>
                <a href="/students-portal" className="link-underline">
                  Student Portal
                </a>
              </li>
              <li>
                <a href="teachers-portal" className="link-underline">
                  Teachers Portal
                </a>
              </li>
            </ul>
          </div>

          <div className="mx-auto">
            <h3 className="font-bold mb-4 uppercase tracking-wide">Contact Us</h3>
            <p className="font-semibold">LIVING MIRACLE HIGH SCHOOL</p>
            <p className="text-gray-400 hover:underline">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Living+Miracle+High+School+Agbeja+Ibadan"
                target="_blank"
                rel="noreferrer"
              >
                Agbeja street, Ososami Rd, Ibadan 200252
              </a>
            </p>
            <p className="mt-2">Phone: +234 803 391 6011 </p>
        

            <div className="flex justify-center md:justify-start space-x-4 mt-4">
               <a href="https://www.facebook.com/share/g/16qH6WLT8s/?mibextid=wwXIfr" aria-label="Facebook">
                <Facebook className="text-white hover:text-gray-400" />
              </a>
              <a href="https://www.instagram.com/livingmiracleschool?igsh=MWZndWx2NDc4Z3czZw==" aria-label="Instagram">
                <Instagram className="text-white hover:text-gray-400" />
              </a>
                       
            </div>

            <div className="relative mt-4">
              <button
                onClick={toggleTranslate}
                className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition cursor-pointer"
              >
                Translate
              </button>
              {/* Only render the translate dropdown container if visible */}
              {isTranslateVisible && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
                  <div
                    id="google_translate_element"
                    className="custom-translate-dropdown"
                  />
                  <div className="flex items-center justify-center mt-1 text-gray-400 text-xs">
                    <span className="mr-1">Powered by</span>
                    <span className="text-white font-medium">Google</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`relative z-20 flex justify-center transition-all duration-300 ${
            isTranslateVisible ? "mt-10" : "mt-0"
          }`}
        >
          <div className={`logo-container ${isSpinning ? "spinning" : ""}`}>
            <Image
              src={getCurrentLogo() || "/placeholder.svg"}
              alt="Footer Logo"
              width={160}
              height={160}
              priority
              className="h-40 w-auto"
            />
          </div>
        </div>

        <div className="border-t border-gray-700 py-4">
          <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center space-y-4">
            <p className="text-sm text-gray-400">&copy; 2025 by Living Miracle High School. All rights reserved.</p>
            
            {/* Subtle WhatsApp Contact */}
            {whatsappNumber && (
              <div className="flex items-center text-sm text-gray-500 hover:text-emerald-400 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a 
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Designed by C.Bright
                </a>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          /* Underline style for links */
          .link-underline {
            position: relative;
            color: white;
          }
          .link-underline::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background-color: currentColor;
            transition: width 0.3s ease;
          }
          .link-underline:hover::after {
            width: 100%;
          }
          /* Logo rotation styles */
          .logo-container {
            display: inline-block;
            transition: transform 1s ease-in-out;
          }
          .spinning {
            animation: spin360 1s ease-in-out;
          }
          @keyframes spin360 {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(-360deg);
            }
          }
          /* Custom Google Translate dropdown styling */
          .custom-translate-dropdown {
            background: #222;
            border: 1px solid #444;
            border-radius: 5px;
            padding: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
            z-index: 20;
          }
          /* Override default styling for the select element inserted by Google */
          .custom-translate-dropdown select {
            background: #222;
            color: #fff;
            padding: 6px 10px;
            border-radius: 5px;
            border: 1px solid #444;
            outline: none;
          }
          .custom-translate-dropdown a {
            color: #fff;
          }
        `}</style>
      </footer>

      {/* Hidden div to preload logo images */}
      <div className="hidden" aria-hidden="true">
        {logos.map((logo, index) => (
          <Image key={index} src={logo || "/placeholder.svg"} width={100} height={100} alt="" />
        ))}
      </div>
    </>
  )
}