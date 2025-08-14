"use client"

import { useEffect } from "react"

/**
 * A hook that listens for reconnection events and triggers a callback
 * Use this in components that need to refresh their data when the app reconnects
 *
 * @param callback Function to call when reconnection happens
 */
export function useReconnectListener(callback: () => void) {
  useEffect(() => {
    const handleReconnect = () => {
      callback()
    }

    window.addEventListener("app:reconnected", handleReconnect)

    return () => {
      window.removeEventListener("app:reconnected", handleReconnect)
    }
  }, [callback])
}

