'use client'

import { useState } from 'react'
import GalleryImage from '../../components/GalleryImage'
import Lightbox from '../../components/Lightbox'

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [allImages, setAllImages] = useState([])

  // Gallery data organized by categories
  const galleryData = {
  "Campus Life": [
    { id: 1, url: "https://picsum.photos/id/1011/800/600", alt: "Students studying in library", width: 800, height: 600 },
    { id: 2, url: "https://picsum.photos/id/1012/800/600", alt: "Campus building", width: 800, height: 600 },
    { id: 3, url: "https://picsum.photos/id/1015/800/600", alt: "Student activities", width: 800, height: 600 },
    { id: 4, url: "https://picsum.photos/id/1016/800/600", alt: "Campus garden", width: 800, height: 600 },
    { id: 5, url: "https://picsum.photos/id/1021/800/600", alt: "Study group", width: 800, height: 600 },
    { id: 6, url: "https://picsum.photos/id/1025/800/600", alt: "Campus courtyard", width: 800, height: 600 }
  ],
  "Events": [
    { id: 7, url: "https://picsum.photos/id/1031/800/600", alt: "Tech fest", width: 800, height: 600 },
    { id: 8, url: "https://picsum.photos/id/1035/800/600", alt: "Cultural event", width: 800, height: 600 },
    { id: 9, url: "https://picsum.photos/id/1038/800/600", alt: "Sports event", width: 800, height: 600 },
    { id: 10, url: "https://picsum.photos/id/1041/800/600", alt: "Graduation ceremony", width: 800, height: 600 },
    { id: 11, url: "https://picsum.photos/id/1042/800/600", alt: "Workshop", width: 800, height: 600 }
  ],
  "Achievements": [
    { id: 12, url: "https://picsum.photos/id/1044/800/600", alt: "Award ceremony", width: 800, height: 600 },
    { id: 13, url: "https://picsum.photos/id/1050/800/600", alt: "Competition winners", width: 800, height: 600 },
    { id: 14, url: "https://picsum.photos/id/1052/800/600", alt: "Research project", width: 800, height: 600 },
    { id: 15, url: "https://picsum.photos/id/1060/800/600", alt: "Student presentation", width: 800, height: 600 }
  ],
  "Faculty": [
    { id: 16, url: "https://picsum.photos/id/1062/800/600", alt: "Professor teaching", width: 800, height: 600 },
    { id: 17, url: "https://picsum.photos/id/1067/800/600", alt: "Faculty meeting", width: 800, height: 600 },
    { id: 18, url: "https://picsum.photos/id/1070/800/600", alt: "Research lab", width: 800, height: 600 },
    { id: 19, url: "https://picsum.photos/id/1074/800/600", alt: "Lecture hall", width: 800, height: 600 }
  ]
}


  const openLightbox = (image, category) => {
    const categoryImages = galleryData[category]
    const imageIndex = categoryImages.findIndex(img => img.id === image.id)
    setSelectedImage(image)
    setCurrentImageIndex(imageIndex)
    setAllImages(categoryImages)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    setCurrentImageIndex(0)
    setAllImages([])
  }

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % allImages.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(allImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(prevIndex)
    setSelectedImage(allImages[prevIndex])
  }

  return (
    <div className="min-h-screen py-28" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-wide" style={{ color: 'var(--text-primary)' }}>
            Gallery
          </h1>
          <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: 'var(--accent)' }}></div>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto opacity-80" style={{ color: 'var(--text-secondary)' }}>
            Capturing moments that define our journey - from everyday campus life to extraordinary achievements
          </p>
        </div>

        {/* Gallery Sections */}
        {Object.entries(galleryData).map(([category, images], index) => (
          <section key={category} className="mb-24 last:mb-0">
            {/* Section Title */}
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-light mb-4 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                {category}
              </h2>
              <div className="w-16 h-px mx-auto mb-2" style={{ backgroundColor: 'var(--accent)' }}></div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <div key={image.id} className="break-inside-avoid">
                  <GalleryImage 
                    image={image} 
                    onClick={() => openLightbox(image, category)}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Load More Section */}
        <div className="text-center mt-20 pt-12 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-sm opacity-60 mb-4" style={{ color: 'var(--text-secondary)' }}>
            More memories coming soon
          </p>
          <button className="px-6 py-3 border font-medium transition-all duration-300 hover:translate-x-1 cursor-pointer"
                  style={{ 
                    borderColor: 'var(--accent)',
                    color: 'var(--accent)',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--accent)'
                    e.target.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = 'var(--accent)'
                  }}>
            View Archive
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox 
          image={selectedImage}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          currentIndex={currentImageIndex}
          totalImages={allImages.length}
        />
      )}
    </div>
  )
}
