"use client";
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="mt-auto border-t" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="no-underline flex items-center mb-4" style={{ color: 'inherit' }}>
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
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Digital magazine platform showcasing the latest editions from DTU Times society.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/about" className="footer-link transition-colors duration-300" 
                   style={{ color: 'var(--text-secondary)' }}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/editions" className="footer-link transition-colors duration-300" 
                   style={{ color: 'var(--text-secondary)' }}>
                  Editions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="footer-link transition-colors duration-300" 
                   style={{ color: 'var(--text-secondary)' }}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link transition-colors duration-300" 
                   style={{ color: 'var(--text-secondary)' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Connect</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="https://instagram.com" className="footer-link transition-colors duration-300" 
                   style={{ color: 'var(--text-secondary)' }} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="footer-link transition-colors duration-300" 
                   style={{ color: 'var(--text-secondary)' }} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="footer-link transition-colors duration-300" 
                   style={{ color: 'var(--text-secondary)' }} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <Link href="/editor/signup" className="footer-link transition-colors duration-300 font-medium" 
                   style={{ color: 'var(--accent)' }}>
                  Join as Editor
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6 text-center" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
          <p>&copy; 2025 DTU Times. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
