"use client"

import { useState, useEffect } from "react"

export function useOnlineStatus() {
  // Initialize isOffline to false. The actual status will be determined on the client-side.
  const [isOffline, setOffline] = useState(false)

  useEffect(() => {
    // This code only runs on the client-side after the component mounts.
    setOffline(!navigator.onLine)

    const updateOnlineStatus = () => setOffline(!navigator.onLine)

    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  return isOffline
}
