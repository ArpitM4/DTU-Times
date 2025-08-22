'use client'

import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { IconMoon, IconSun, IconClose } from './Icon';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {

  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    }`} style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link href="/" className="no-underline flex items-center" style={{ color: 'inherit' }}>
            <Image
              src="/TimesLogo.png"
              alt="DTU Times Logo"
              className="h-10 w-auto"
              style={{
                display: 'block',
                maxHeight: 40,
                filter: theme === 'light' ? 'invert(1) hue-rotate(180deg)' : 'none',
                transition: 'filter 0.3s'
              }}
              width={40}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
  <div className="hidden md:flex items-center gap-8">
          {/* Navigation links */}
          <Link href="/about" className={`nav-link px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${pathname === '/about' ? 'text-teal-500' : ''}`}
             style={{ color: pathname === '/about' ? '#14b8a6' : 'var(--text-secondary)' }}>
            About
            {pathname === '/about' && (
              <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-teal-500 rounded-full animate-fadeIn" />
            )}
          </Link>
          <Link href="/editions" className={`nav-link px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${pathname === '/editions' ? 'text-teal-500' : ''}`}
             style={{ color: pathname === '/editions' ? '#14b8a6' : 'var(--text-secondary)' }}>
            Editions
            {pathname === '/editions' && (
              <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-teal-500 rounded-full animate-fadeIn" />
            )}
          </Link>
          <Link href="/blog" className={`nav-link px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${pathname === '/blog' ? 'text-teal-500' : ''}`}
             style={{ color: pathname === '/blog' ? '#14b8a6' : 'var(--text-secondary)' }}>
            Blogs
            {pathname === '/blog' && (
              <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-teal-500 rounded-full animate-fadeIn" />
            )}
          </Link>
          <Link href="/gallery" className={`nav-link px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${pathname === '/gallery' ? 'text-teal-500' : ''}`}
             style={{ color: pathname === '/gallery' ? '#14b8a6' : 'var(--text-secondary)' }}>
            Gallery
            {pathname === '/gallery' && (
              <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-teal-500 rounded-full animate-fadeIn" />
            )}
          </Link>
          <Link href="/contact" className={`nav-link px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${pathname === '/contact' ? 'text-teal-500' : ''}`}
             style={{ color: pathname === '/contact' ? '#14b8a6' : 'var(--text-secondary)' }}>
            Contact Us
            {pathname === '/contact' && (
              <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-teal-500 rounded-full animate-fadeIn" />
            )}
          </Link>
          {/* Profile button at right end */}
          {user && (
            <Link
              href="/profile"
              className="ml-6 px-5 py-2 rounded-lg border transition font-semibold"
              style={{
                backgroundColor: theme === 'light' ? '#f3f4f6' : '#1f2937', // gray-100 or dark gray-800
                borderColor: theme === 'light' ? '#d1d5db' : '#374151', // gray-300 or dark gray-700
                color: theme === 'light' ? '#111827' : 'var(--text-primary)', // gray-900 or default
                boxShadow: theme === 'light' ? '0 1px 2px 0 rgba(0,0,0,0.03)' : undefined
              }}
              onMouseEnter={e => {
                if (theme === 'light') e.target.style.backgroundColor = '#e5e7eb'; // gray-200
                else e.target.style.backgroundColor = '#374151'; // dark:hover:bg-gray-700
              }}
              onMouseLeave={e => {
                if (theme === 'light') e.target.style.backgroundColor = '#f3f4f6';
                else e.target.style.backgroundColor = '#1f2937';
              }}
            >
              Profile
            </Link>
          )}
          {/* Theme Toggle */}
          <button onClick={toggleTheme} 
                  className="theme-toggle w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl transition-all duration-300 hover:scale-105 cursor-pointer" 
                  style={{ borderColor: 'var(--border-color)' }}
                  aria-label="Toggle theme">
                  {theme === 'light' ? <IconMoon /> : <IconSun />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleTheme} 
                  className="theme-toggle w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl transition-all duration-300 hover:scale-105 mr-4 cursor-pointer" 
                  style={{ borderColor: 'var(--border-color)' }}
                  aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button onClick={toggleMenu} className="p-2 flex flex-col gap-1 cursor-pointer" aria-label="Toggle menu">
            <span className={`w-6 h-0.5 transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} 
                  style={{ backgroundColor: 'var(--text-primary)' }}></span>
            <span className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} 
                  style={{ backgroundColor: 'var(--text-primary)' }}></span>
            <span className={`w-6 h-0.5 transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} 
                  style={{ backgroundColor: 'var(--text-primary)' }}></span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 w-80 h-screen z-70 transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-color)' }}>
        <div className="flex justify-end p-4 pb-0">
          <button onClick={closeMenu} 
                  className="sidebar-close p-2 rounded-full text-2xl transition-all duration-300 hover:scale-110 cursor-pointer" 
                  style={{ color: 'var(--text-primary)' }}
                  aria-label="Close menu">
              <IconClose />
          </button>
        </div>
        <div className="flex flex-col p-8 gap-4">
          <Link href="/gallery" className={`mobile-nav-link p-4 rounded-lg font-medium transition-all duration-300 relative group ${pathname === '/gallery' ? 'text-teal-500' : ''}`}
             style={{ color: pathname === '/gallery' ? '#14b8a6' : 'var(--text-secondary)' }}
             onClick={closeMenu}>
            Gallery
            {pathname === '/gallery' && (
              <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-teal-500 rounded-full animate-fadeIn" />
            )}
          </Link>
          <Link href="/about" className={`mobile-nav-link p-4 rounded-lg font-medium transition-all duration-300 relative group ${pathname === '/about' ? 'text-teal-500' : ''}`}
             style={{ color: pathname === '/about' ? '#14b8a6' : 'var(--text-secondary)' }}
             onClick={closeMenu}>
            About
            {pathname === '/about' && (
              <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-teal-500 rounded-full animate-fadeIn" />
            )}
          </Link>
          <Link href="/editions" className={`mobile-nav-link p-4 rounded-lg font-medium transition-all duration-300 relative group ${pathname === '/editions' ? 'text-teal-500' : ''}`}
             style={{ color: pathname === '/editions' ? '#14b8a6' : 'var(--text-secondary)' }}
             onClick={closeMenu}>
            Editions
            {pathname === '/editions' && (
              <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-teal-500 rounded-full animate-fadeIn" />
            )}
          </Link>
          <Link href="/blog" className={`mobile-nav-link p-4 rounded-lg font-medium transition-all duration-300 relative group ${pathname === '/blog' ? 'text-teal-500' : ''}`}
             style={{ color: pathname === '/blog' ? '#14b8a6' : 'var(--text-secondary)' }}
             onClick={closeMenu}>
            Blogs
            {pathname === '/blog' && (
              <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-teal-500 rounded-full animate-fadeIn" />
            )}
          </Link>
          <Link href="/contact" className={`mobile-nav-link p-4 rounded-lg font-medium transition-all duration-300 relative group ${pathname === '/contact' ? 'text-teal-500' : ''}`}
             style={{ color: pathname === '/contact' ? '#14b8a6' : 'var(--text-secondary)' }}
             onClick={closeMenu}>
            Contact Us
            {pathname === '/contact' && (
              <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-teal-500 rounded-full animate-fadeIn" />
            )}
          </Link>
          {/* Profile link for mobile */}
          {user && (
            <Link
              href="/profile"
              className={`mobile-nav-link p-4 rounded-lg font-medium transition-all duration-300 relative group`}
              style={{
                backgroundColor: theme === 'light' ? '#f3f4f6' : '#1f2937',
                color: theme === 'light' ? '#111827' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: theme === 'light' ? '#d1d5db' : '#374151',
                marginTop: 8
              }}
              onClick={closeMenu}
              onMouseEnter={e => {
                if (theme === 'light') e.target.style.backgroundColor = '#e5e7eb';
                else e.target.style.backgroundColor = '#374151';
              }}
              onMouseLeave={e => {
                if (theme === 'light') e.target.style.backgroundColor = '#f3f4f6';
                else e.target.style.backgroundColor = '#1f2937';
              }}
            >
              <span className="flex items-center gap-2">
                {user.profilePic && <Image src={user.profilePic} alt="Profile" width={24} height={24} className="w-6 h-6 rounded-full object-cover" />}
                Profile
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-65" 
             onClick={closeMenu}></div>
      )}
    </nav>
  );
}

