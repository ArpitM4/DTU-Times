'use client'

import { useState, useEffect } from 'react'

export default function NewsletterFAB({ onClick }) {
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    console.log('NewsletterFAB mounted') // Debug log
    const interval = setInterval(() => {
      setIsShaking(true)
      // Reset shake animation after it completes (800ms duration)
      setTimeout(() => {
        setIsShaking(false)
      }, 800)
    }, 5000) // Trigger every 5 seconds for testing (was 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <button
      onClick={onClick}
  className={`fixed bottom-8 right-8 w-14 h-14 bg-teal-500 hover:bg-teal-600 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 group cursor-pointer ${
        isShaking ? 'animate-shake-attention' : 'animate-pulse-subtle'
      }`}
      style={{
        animation: isShaking ? 'shake-attention 0.8s ease-in-out' : 'pulse-subtle 2s infinite ease-in-out',
        border: '2px solid #fff' // Added for visibility testing
      }}
      aria-label="Join our newsletter"
      title="Join our newsletter"
    >
      {/* Envelope Icon */}
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Join our newsletter
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </button>
  )
}
