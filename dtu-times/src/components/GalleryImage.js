'use client'

import { useState } from 'react'
import Image from 'next/image';

export default function GalleryImage({ image, onClick, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  return (
    <div 
      className="relative group cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-1"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading state */}
      {isLoading && (
        <div 
          className="w-full h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm opacity-50" style={{ color: 'var(--text-secondary)' }}>Loading...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div 
          className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" style={{ color: 'var(--text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm opacity-50" style={{ color: 'var(--text-secondary)' }}>{image.alt}</p>
          </div>
        </div>
      )}
      
      {/* Image */}
      {!hasError && (
  <Image
          src={image.url}
          alt={image.alt}
          className={`w-full h-auto object-cover rounded-lg transition-all duration-500 ${
            isLoading ? 'opacity-0 absolute' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            filter: isHovered && !isLoading ? 'brightness(0.8)' : 'brightness(1)',
          }}
        />
      )}
      
      {/* Hover overlay - only show when image is loaded and not in error state */}
      {!isLoading && !hasError && (
        <div
          className={`absolute inset-0 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'bg-black bg-opacity-40' : 'bg-transparent'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
              />
            </svg>
          </div>
        </div>
      )}
      
      {/* Subtle border on hover - only show when image is loaded */}
      {!isLoading && !hasError && (
        <div
          className={`absolute inset-0 rounded-lg border-2 pointer-events-none transition-all duration-300 ${
            isHovered ? 'border-teal-500 opacity-80' : 'border-transparent opacity-0'
          }`}
        />
      )}
    </div>
  )
}
