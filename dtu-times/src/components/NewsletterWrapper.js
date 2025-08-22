'use client'

import { useState } from 'react'
import NewsletterFAB from './NewsletterFAB'
import NewsletterModal from './NewsletterModal'

export default function NewsletterWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <NewsletterFAB onClick={openModal} />
      <NewsletterModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}
