"use client";

import React, { useState, useEffect } from "react";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  // State to control the bounce animation
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Function to trigger the bounce animation
    const triggerBounce = () => {
      setAnimate(true);
      // Remove animation class after 2 seconds (the duration of the bounce)
      setTimeout(() => {
        setAnimate(false);
      }, 2000);
    };

    // Trigger the bounce immediately on mount
    triggerBounce();

    // Then every 14 seconds (2s bounce + 12s pause)
    const interval = setInterval(triggerBounce, 14000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  if (!phoneNumber) {
    console.error("WhatsApp number is missing in .env.local");
    return null;
  }

  return (
    <>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={animate ? "bounce" : ""}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          backgroundColor: "#25D366",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          zIndex: 10
        }}
      >
        {/* Inline SVG for WhatsApp logo */}
        <svg
          width="35"
          height="35"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="24" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 4C13.523 4 5 12.523 5 23c0 4.197 1.34 8.084 3.635 11.298L5 43l9.035-3.666A18.942 18.942 0 0024 42c10.477 0 19-8.523 19-19S34.477 4 24 4zm0 34c-4.156 0-8.034-1.63-10.982-4.578A15.412 15.412 0 018 23c0-8.284 6.716-15 15-15s15 6.716 15 15-6.716 15-15 15zm-3.317-22.36a1.525 1.525 0 00-.515-.832c-.226-.175-.545-.307-.865-.273-.745.09-1.515.758-2.01 1.34-1.176 1.382-2.202 3.052-1.774 4.56.217.78 1.38 2.494 1.95 3.186.57.692 3.57 5.15 9.102 7.02 4.515 1.548 5.447 1.23 6.43 1.157.983-.073 3.146-1.282 3.597-2.521.45-1.239.45-2.233.315-2.482-.136-.25-.495-.398-1.04-.673-.545-.275-3.245-1.597-3.746-1.798-.5-.2-.865-.275-1.23.273-.364.548-1.414 1.797-1.73 2.173-.317.377-.635.41-1.18.136-.545-.273-2.31-.85-4.39-2.678-1.63-1.418-2.73-3.168-3.047-3.716-.317-.548-.034-.853.24-1.127.274-.273.545-.545.787-.85.242-.306.316-.41.47-.683.154-.273.08-.515.08-.693z"
            fill="#25D366"
          />
        </svg>
      </a>

      {/* CSS-in-JSX for bounce animation */}
      <style jsx>{`
        @keyframes bounceAnimation {
          0% {
            transform: translateY(0);
          }
          12.5% {
            transform: translateY(-10px);
          }
          25% {
            transform: translateY(0);
          }
          37.5% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(0);
          }
          62.5% {
            transform: translateY(-10px);
          }
          75% {
            transform: translateY(0);
          }
          87.5% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .bounce {
          animation: bounceAnimation 2s ease;
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;
