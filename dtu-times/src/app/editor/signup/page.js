"use client"

import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'

export default function EditorSignupPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setIsValidEmail(validateEmail(newEmail))
  }

  const handleNext = async (e) => {
    e.preventDefault();
    if (!isValidEmail || !name || !password) return;
    setIsLoading(true);
    setMessage('');
    try {
      await signup(name, email, password);
      setMessage('Signup successful! Await admin verification.');
    } catch (err) {
      setMessage('Signup failed: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const goToLogin = () => {
    window.location.href = '/editor'
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6" 
         style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Create Editor Account
          </h1>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Join the DTU Times editorial team
          </p>
        </div>

        {/* Signup Form */}
        <div className="rounded-2xl shadow-lg p-8 mb-6" 
             style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <form onSubmit={handleNext} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-4 outline-none"
                style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                placeholder="Your Name"
              />
            </div>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-4 outline-none"
                style={{ backgroundColor: 'var(--bg-primary)', borderColor: isValidEmail && email ? 'var(--success)' : 'var(--border-color)', color: 'var(--text-primary)', '--tw-ring-color': 'rgba(37, 99, 235, 0.1)' }}
                placeholder="your.email@example.com"
                onFocus={e => e.target.style.borderColor = isValidEmail && email ? 'var(--success)' : 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = isValidEmail && email ? 'var(--success)' : 'var(--border-color)'}
              />
              {email && (
                <div className="mt-2 flex items-center gap-2">
                  {isValidEmail ? (
                    <>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--success)' }}>
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--success)' }}>
                        Valid email address
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--error)' }}>
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--error)' }}>
                        Please enter a valid email
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-4 outline-none pr-12"
                  style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                  placeholder="Password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                  style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.832-.64 1.624-1.09 2.354M15.362 17.362A9.953 9.953 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M9.88 9.88a3 3 0 014.24 4.24" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.62 6.62A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7-.274.832-.64 1.624-1.09 2.354M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Information Text */}
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Only the verified users can SignUp. You can try to signup once our Team have verified your email id.
                It usually takes 24hrs to get verified.
               </p>
            </div>

            {/* Next Button */}
            <button
              type="submit"
              disabled={!isValidEmail || !name || !password || isLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
              style={{ backgroundColor: 'var(--accent)' }}
              onMouseEnter={e => !e.target.disabled && (e.target.style.backgroundColor = 'var(--accent-hover)')}
              onMouseLeave={e => !e.target.disabled && (e.target.style.backgroundColor = 'var(--accent)')}>
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Sign Up
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </button>
            {message && <div className="mt-4 text-center text-sm text-green-600">{message}</div>}
          </form>
        </div>

        {/* Login Option */}
        <div className="text-center p-6 rounded-2xl" 
             style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Already have an editor account?
          </p>
          <button
            onClick={goToLogin}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ 
              backgroundColor: 'transparent',
              border: '2px solid var(--accent)',
              color: 'var(--accent)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--accent)'
              e.target.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = 'var(--accent)'
            }}>
            Sign In Instead
          </button>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a href="/" className="text-sm font-medium transition-colors duration-300 hover:underline"
             style={{ color: 'var(--text-secondary)' }}
             onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
             onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
            ← Back to DTU Times
          </a>
        </div>
      </div>
    </div>
  )
}
