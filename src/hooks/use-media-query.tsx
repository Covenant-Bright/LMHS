"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Handle server-side rendering
    if (typeof window === "undefined") {
      return
    }

    // Set initial value on client-side
    setMatches(window.matchMedia(query).matches)

    // Create media query list
    const media = window.matchMedia(query)

    // Define callback
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Add listener
    media.addEventListener("change", listener)

    // Clean up
    return () => {
      media.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}

