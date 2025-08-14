"use client"

import type React from "react"

interface LoaderProps {
  fadeOut: boolean
}

export const Loader: React.FC<LoaderProps> = ({ fadeOut }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#e0e0e0] z-50 transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          animation: rotate 1s linear infinite;
          height: 50px;
          width: 50px;
          position: relative;
        }
        .loader:before,
        .loader:after {
          border-radius: 50%;
          content: "";
          display: block;
          height: 20px;
          width: 20px;
          position: absolute;
        }
        .loader:before {
          background-color: #fff;
          box-shadow: 30px 0 0 #ff3d00;
          top: 0;
          left: 0;
          animation: ball1 1s ease-in-out infinite;
        }
        .loader:after {
          background-color: #ff3d00;
          box-shadow: 30px 0 0 #fff;
          bottom: 0;
          left: 0;
          animation: ball2 1s ease-in-out infinite;
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes ball1 {
          0%, 100% {
            box-shadow: 30px 0 0 #ff3d00;
          }
          50% {
            box-shadow: 0 0 0 #ff3d00;
            transform: translate(15px, 15px);
          }
        }
        @keyframes ball2 {
          0%, 100% {
            box-shadow: 30px 0 0 #fff;
          }
          50% {
            box-shadow: 0 0 0 #fff;
            transform: translate(15px, -15px);
          }
        }
      `}</style>
    </div>
  )
}
