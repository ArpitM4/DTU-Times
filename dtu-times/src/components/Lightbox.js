'use client'

import { useEffect } from 'react'

export default function Lightbox({ image, onClose, onNext, onPrev, currentIndex, totalImages }) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    document.body.style.overflow = 'hidden' // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onNext, onPrev])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content Container */}
      <div className="relative max-w-7xl max-h-[90vh] mx-4 flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-16 right-0 w-12 h-12 rounded-full bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-opacity-80 hover:scale-110 cursor-pointer z-20 border border-white border-opacity-20"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Previous Button */}
        {totalImages > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-black bg-opacity-60 backdrop-blur-sm items-center justify-center transition-all duration-300 hover:bg-opacity-80 hover:scale-110 cursor-pointer z-20 hidden md:flex border border-white border-opacity-20"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Button */}
        {totalImages > 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-black bg-opacity-60 backdrop-blur-sm items-center justify-center transition-all duration-300 hover:bg-opacity-80 hover:scale-110 cursor-pointer z-20 hidden md:flex border border-white border-opacity-20"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Main Image */}
        <img
          key={image.id}
          src={image.url}
          alt={image.alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fadeIn"
        />

        {/* Image Info */}
        <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{image.alt}</p>
              {totalImages > 1 && (
                <p className="text-xs opacity-70 mt-1">
                  {currentIndex + 1} of {totalImages}
                </p>
              )}
            </div>
            
            {/* Mobile Navigation */}
            {totalImages > 1 && (
              <div className="flex gap-3 md:hidden">
                <button
                  onClick={onPrev}
                  className="w-10 h-10 rounded-full bg-black bg-opacity-60 flex items-center justify-center transition-all duration-300 hover:bg-opacity-80 cursor-pointer border border-white border-opacity-20"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={onNext}
                  className="w-10 h-10 rounded-full bg-black bg-opacity-60 flex items-center justify-center transition-all duration-300 hover:bg-opacity-80 cursor-pointer border border-white border-opacity-20"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
