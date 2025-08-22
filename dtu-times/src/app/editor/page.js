"use client"


import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link';

export default function EditorLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      // Optionally redirect or show success
    } catch (err) {
      let msg = err.message;
      // If the message is a JSON string, parse and extract the message property
      try {
        const parsed = JSON.parse(msg);
        if (parsed && parsed.message) msg = parsed.message;
      } catch {}
      setError('Login failed: ' + msg);
    } finally {
      setIsLoading(false);
    }
  }

  const goToSignup = () => {
    window.location.href = '/editor/signup'
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6" 
         style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Editor Login
          </h1>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Access the DTU Times editorial dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded-2xl shadow-lg p-8 mb-6" 
             style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" 
                     style={{ color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-4 outline-none"
                style={{ 
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  '--tw-ring-color': 'rgba(37, 99, 235, 0.1)'
                }}
                placeholder="editor@dtutimes.com"
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" 
                     style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-4 outline-none pr-12"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                    '--tw-ring-color': 'rgba(37, 99, 235, 0.1)'
                  }}
                  placeholder="Enter your password"
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: 'var(--accent)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--accent-hover)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--accent)'}>
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
            {error && <div className="text-red-600 text-center mb-2">{error}</div>}
          </form>
        </div>

        {/* Signup Option */}
        <div className="text-center p-6 rounded-2xl" 
             style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            Don&apos;t have an editor account?
          </p>
          <button
            onClick={goToSignup}
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
            Create Editor Account
          </button>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm font-medium transition-colors duration-300 hover:underline"
             style={{ color: 'var(--text-secondary)' }}
             onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
             onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
              Back to DTU Times
          </Link>
        </div>
      </div>
    </div>
  )
}

