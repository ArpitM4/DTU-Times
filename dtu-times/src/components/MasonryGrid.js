'use client'

import { motion } from 'framer-motion'
import GalleryImage from './GalleryImage'

export default function MasonryGrid({ images, onImageClick }) {
  // Animation variants for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          variants={itemVariants}
          className="break-inside-avoid mb-4"
        >
          <GalleryImage 
            image={image} 
            onClick={() => onImageClick(image)}
            index={index}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
