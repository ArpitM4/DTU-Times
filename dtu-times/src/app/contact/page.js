'use client'

import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  const contactMethods = [
    {
      title: "Email",
      value: "editorial@dtutimes.com",
      icon: "✉",
      link: "mailto:editorial@dtutimes.com"
    },
    {
      title: "Phone", 
      value: "+91 98765 43210",
      icon: "☎",
      link: "tel:+919876543210"
    },
    {
      title: "Address",
      value: "DTU, Shahbad Daulatpur",
      icon: "⌖",
      link: null
    }
  ]

  const socialLinks = [
    { 
      name: "Instagram", 
      url: "https://instagram.com/dtutimes", 
      icon: "📷",
      color: "#E4405F"
    },
    { 
      name: "Twitter", 
      url: "https://twitter.com/dtutimes", 
      icon: "🐦",
      color: "#1DA1F2"
    },
    { 
      name: "LinkedIn", 
      url: "https://linkedin.com/company/dtutimes", 
      icon: "💼",
      color: "#0077B5"
    },
    { 
      name: "Facebook", 
      url: "https://facebook.com/dtutimes", 
      icon: "📘",
      color: "#1877F2"
    },
    { 
      name: "YouTube", 
      url: "https://youtube.com/@dtutimes", 
      icon: "📺",
      color: "#FF0000"
    }
  ]

  return (
  <div className="min-h-screen px-6 pt-24 pb-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Main Container */}
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-wide"
              style={{ color: 'var(--text-primary)' }}>
            Get In Touch
          </h1>
          <div className="w-16 h-px mx-auto"
               style={{ backgroundColor: 'var(--accent)' }}></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Contact Info */}
          <div className="space-y-12">
            
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="group">
                  {method.link ? (
                    <a href={method.link} 
                       className="flex items-center gap-4 p-4 -m-4 rounded-lg transition-all duration-300 hover:bg-opacity-50 cursor-pointer"
                       style={{ '--hover-bg': 'var(--bg-secondary)' }}
                       onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-secondary)'}
                       onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                      <span className="text-xl opacity-60">{method.icon}</span>
                      <div>
                        <p className="text-sm opacity-60 mb-1" style={{ color: 'var(--text-secondary)' }}>
                          {method.title}
                        </p>
                        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          {method.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <span className="text-xl opacity-60">{method.icon}</span>
                      <div>
                        <p className="text-sm opacity-60 mb-1" style={{ color: 'var(--text-secondary)' }}>
                          {method.title}
                        </p>
                        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          {method.value}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <p className="text-sm opacity-60 mb-4" style={{ color: 'var(--text-secondary)' }}>
                Follow us
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="w-12 h-12 rounded-full border flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 cursor-pointer group"
                    style={{ 
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--bg-secondary)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = social.color
                      e.target.style.backgroundColor = social.color
                      e.target.style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'var(--border-color)'
                      e.target.style.backgroundColor = 'var(--bg-secondary)'
                      e.target.style.transform = 'scale(1)'
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Editorial Note */}
            <div className="pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <p className="text-sm leading-relaxed opacity-70" style={{ color: 'var(--text-secondary)' }}>
                We welcome story submissions, feedback, and collaboration opportunities. 
                Our editorial team typically responds within 24-48 hours.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:pl-8">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Editors Section */}
      <div className="max-w-2xl mx-auto mt-20 flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Editor 1 */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
          <img src="https://via.placeholder.com/80x80/6366f1/ffffff?text=AS" alt="Arpit Sharma" className="w-20 h-20 rounded-full mb-3 border" style={{ borderColor: 'var(--accent)' }} />
          <div className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Arpit Sharma</div>
          <div className="text-xs opacity-70 mb-1" style={{ color: 'var(--text-secondary)' }}>Editor-in-Chief</div>
          <a href="mailto:arpit@dtutimes.com" className="text-xs underline opacity-80 hover:opacity-100 cursor-pointer" style={{ color: 'var(--accent)' }}>arpit@dtutimes.com</a>
        </div>
        {/* Editor 2 */}
        <div className="flex flex-col items-center text-center p-6 rounded-xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
          <img src="https://via.placeholder.com/80x80/8b5cf6/ffffff?text=PS" alt="Priya Singh" className="w-20 h-20 rounded-full mb-3 border" style={{ borderColor: 'var(--accent)' }} />
          <div className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Priya Singh</div>
          <div className="text-xs opacity-70 mb-1" style={{ color: 'var(--text-secondary)' }}>Managing Editor</div>
          <a href="mailto:priya@dtutimes.com" className="text-xs underline opacity-80 hover:opacity-100 cursor-pointer" style={{ color: 'var(--accent)' }}>priya@dtutimes.com</a>
        </div>
      </div>
    </div>
  )
}
