"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { GeistSans, GeistMono } from "geist/font"
import { usePathname } from "next/navigation"
import "../styles/globals.css"
import { Loader } from "../components/Loader"
import { Banner } from "../components/Banner"
import { useOnlineStatus } from "../hooks/useOnlineStatus"
import { useServerStatus } from "../hooks/useServerStatus"


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // Loader states for initial load and route changes.
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)

  // Connection-related states
  const [disconnectStart, setDisconnectStart] = useState<number | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [connectionRestored, setConnectionRestored] = useState(false)

  // Get the current pathname from Next.js.
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  // Custom hooks for online and server status.
  const offline = useOnlineStatus()
  const { serverStatus, pingServer } = useServerStatus()

  // --------------------------------
  // SAVE SCROLL POSITION BEFORE RELOAD
  // --------------------------------
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem("scrollPosition", JSON.stringify({ x: window.scrollX, y: window.scrollY }))
    }
    window.addEventListener("beforeunload", saveScrollPosition)
    return () => window.removeEventListener("beforeunload", saveScrollPosition)
  }, [])

  // --------------------------------
  // RESTORE SCROLL POSITION AFTER RELOAD
  // --------------------------------
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition")
    if (savedScrollPosition) {
      const { x, y } = JSON.parse(savedScrollPosition)
      setTimeout(() => window.scrollTo(x, y), 50)
    }
  }, [])

  // --------------------------------
  // RECONNECT FUNCTION
  // --------------------------------
  const reconnect = useCallback(async () => {
    await pingServer()
    if (!offline && serverStatus === "ok") {
      window.dispatchEvent(new CustomEvent("app:reconnected"))
      setRefreshKey((prev) => prev + 1)
    }
  }, [pingServer, offline, serverStatus])

  // --------------------------------
  // DETECT CONNECTION RESTORATION
  // --------------------------------
  const prevConnection = useRef({ offline, serverStatus })

  useEffect(() => {
    if (
      (prevConnection.current.offline || prevConnection.current.serverStatus !== "ok") &&
      !offline &&
      serverStatus === "ok"
    ) {
      setConnectionRestored(true)
      setTimeout(() => {
        setConnectionRestored(false)
        reconnect()
      }, 1000)
    }
    prevConnection.current = { offline, serverStatus }
  }, [offline, serverStatus, reconnect])

  // --------------------------------
  // DETERMINE ERROR MESSAGE
  // --------------------------------
  const errorMessage = connectionRestored
    ? "Internet Connection restored. Reconnecting..."
    : offline && serverStatus === "disconnected"
      ? "No internet connection. Some features may not work."
      : serverStatus === "unstable"
        ? "Unstable connection to server. You might experience delays."
        : serverStatus === "disconnected"
          ? "Disconnected from server. Some features may not work."
          : ""

  // --------------------------------
  // PRELOAD LOGO IMAGES
  // --------------------------------
  useEffect(() => {
    const preloadLogos = async () => {
      try {
        const logoUrls = ["/images/logo.png", "/images/logo2.png"]
        const imagePromises = logoUrls.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image()
            img.crossOrigin = "anonymous"
            img.onload = () => resolve()
            img.onerror = () => {
              console.error(`Failed to load image: ${src}`)
              resolve()
            }
            img.src = src
          })
        })

        await Promise.all(imagePromises)
      } catch (error) {
        console.error("Error preloading logos:", error)
      }
    }

    preloadLogos()
  }, [])

  // --------------------------------
  // INITIAL PAGE LOAD HANDLING
  // --------------------------------
  useEffect(() => {
    setLoading(true)
    const handleLoad = () => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 700)
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
      handleLoad()
    } else {
      document.addEventListener("DOMContentLoaded", handleLoad)
    }
    return () => document.removeEventListener("DOMContentLoaded", handleLoad)
  }, [])

  // --------------------------------
  // ROUTE CHANGE HANDLING
  // --------------------------------
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      setPageLoading(true)
      prevPathname.current = pathname
      const timer = setTimeout(() => setPageLoading(false), 500)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  // --------------------------------
  // MANAGE DISCONNECTION TIMER FOR AUTO-RECONNECT
  // --------------------------------
  useEffect(() => {
    const currentlyDisconnected = offline || serverStatus !== "ok"

    if (currentlyDisconnected && disconnectStart === null) {
      setDisconnectStart(Date.now())
    }
    if (!currentlyDisconnected && disconnectStart !== null) {
      setDisconnectStart(null)
    }
  }, [offline, serverStatus, disconnectStart])

  // --------------------------------
  // AUTO-RECONNECT AFTER 90 SECONDS
  // --------------------------------
  useEffect(() => {
    if (disconnectStart !== null) {
      const timer = setTimeout(() => {
        if (offline || serverStatus !== "ok") {
          reconnect()
        }
      }, 90000)
      return () => clearTimeout(timer)
    }
  }, [disconnectStart, offline, serverStatus, reconnect])

  // --------------------------------
  // RENDER LAYOUT
  // --------------------------------
  return (
    <html lang="en" suppressHydrationWarning>
     
      <body  className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {(loading || pageLoading) && <Loader fadeOut={fadeOut || pageLoading} />}
        {errorMessage && <Banner errorMessage={errorMessage} onReconnect={reconnect} />}
        <div key={refreshKey} className={loading || pageLoading ? "invisible" : "visible"}>
          {children}
        </div>

       </body>
    </html>
  )
}
