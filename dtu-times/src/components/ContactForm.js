
'use client'

import { useState } from 'react'
import { apiFetch } from '../utils/api'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError("");
    try {
      await apiFetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    }
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
  {success && <div className="text-green-600">Message sent! We&apos;ll get back to you soon.</div>}
      {error && <div className="text-red-500">{error}</div>}
      {/* Name Input */}
      <div className="group">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full py-3 px-0 border-0 border-b-2 bg-transparent outline-none transition-all duration-300 placeholder-opacity-50 focus:placeholder-opacity-30"
          style={{
            borderBottomColor: 'var(--border-color)',
            color: 'var(--text-primary)',
            '--placeholder-color': 'var(--text-secondary)'
          }}
          onFocus={(e) => {
            e.target.style.borderBottomColor = 'var(--accent)'
          }}
          onBlur={(e) => {
            e.target.style.borderBottomColor = 'var(--border-color)'
          }}
        />
      </div>

      {/* Email Input */}
      <div className="group">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
          className="w-full py-3 px-0 border-0 border-b-2 bg-transparent outline-none transition-all duration-300 placeholder-opacity-50 focus:placeholder-opacity-30"
          style={{
            borderBottomColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }}
          onFocus={(e) => {
            e.target.style.borderBottomColor = 'var(--accent)'
          }}
          onBlur={(e) => {
            e.target.style.borderBottomColor = 'var(--border-color)'
          }}
        />
      </div>

      {/* Message Textarea */}
      <div className="group">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Your message..."
          className="w-full py-3 px-0 border-0 border-b-2 bg-transparent outline-none transition-all duration-300 resize-none placeholder-opacity-50 focus:placeholder-opacity-30"
          style={{
            borderBottomColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }}
          onFocus={(e) => {
            e.target.style.borderBottomColor = 'var(--accent)'
          }}
          onBlur={(e) => {
            e.target.style.borderBottomColor = 'var(--border-color)'
          }}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative px-8 py-3 text-sm font-medium border transition-all duration-300 hover:translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
          style={{ 
            borderColor: 'var(--accent)',
            color: 'var(--accent)',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            if (!e.target.disabled) {
              e.target.style.backgroundColor = 'var(--accent)'
              e.target.style.color = 'white'
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.disabled) {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = 'var(--accent)'
            }
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </form>
  )
}
