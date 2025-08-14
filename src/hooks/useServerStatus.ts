"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export function useServerStatus() {
  const [serverStatus, setServerStatus] = useState<"ok" | "unstable" | "disconnected">("ok")
  const failureCountRef = useRef(0)
  const maxFailures = 2 // Require 2 consecutive failures before marking as disconnected

  const pingServer = useCallback(async () => {
    const startTime = performance.now()
    try {
      // Replace "/api/ping" with your health-check endpoint.
      await fetch("/api/ping")
      const latency = performance.now() - startTime
      // Reset failure count on a successful ping.
      failureCountRef.current = 0
      if (latency > 2000) {
        setServerStatus("unstable")
      } else {
        setServerStatus("ok")
      }
    } catch {
      // Increase the failure count on ping failure.
      failureCountRef.current += 1
      if (failureCountRef.current >= maxFailures) {
        setServerStatus("disconnected")
      }
    }
  }, [])

  useEffect(() => {
    pingServer()
    const interval = setInterval(pingServer, 5000)
    return () => clearInterval(interval)
  }, [pingServer])

  return { serverStatus, pingServer }
}
