
'use client'
import { IconBook, IconDocument, IconGraduation, IconLightbulb } from '../../components/Icon';

export default function AboutPage() {
  const teamValues = [
    {
      title: "Quality Journalism",
      description: "We believe in delivering accurate, well-researched content that matters to our community.",
  icon: <IconDocument className="w-8 h-8 mx-auto" style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
    },
    {
      title: "Student Voice",
      description: "Amplifying the voices and stories of DTU students across all disciplines and backgrounds.",
  icon: <IconGraduation className="w-8 h-8 mx-auto" style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
    },
    {
      title: "Innovation",
      description: "Embracing new technologies and creative approaches to storytelling and digital media.",
  icon: <IconLightbulb className="w-8 h-8 mx-auto" style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
    }
  ];

  return (
    <div className="min-h-screen px-6 pt-24 pb-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Main Container */}
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-wide"
              style={{ color: 'var(--text-primary)' }}>
            About DTU Times
          </h1>
          <div className="w-16 h-px mx-auto mb-8"
               style={{ backgroundColor: 'var(--accent)' }}></div>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto opacity-80"
             style={{ color: 'var(--text-secondary)' }}>
            Your trusted source for campus news, student stories, and insights from the heart of Delhi Technological University.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="prose prose-lg max-w-none">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
                  Our Story
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  DTU Times was born from a simple idea: every student has a story worth telling. What started as a small campus newsletter has evolved into a comprehensive digital platform that connects, informs, and inspires the DTU community.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  We're not just reporters; we're students, dreamers, and changemakers who understand the pulse of campus life because we live it every day.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center text-6xl"
                    style={{ borderColor: 'var(--border-color)', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                  <img
                    src="/About.jpg"
                    alt="About DTU Times"
                    className="w-full h-full object-cover rounded-lg"
                    style={{ opacity: 0.9}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-light text-center mb-12" style={{ color: 'var(--text-primary)' }}>
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamValues.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg border"
                   style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--text-secondary)' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center py-12 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <h2 className="text-2xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto opacity-80" style={{ color: 'var(--text-secondary)' }}>
            To bridge the gap between administration and students, celebrate achievements, share knowledge, and foster a sense of community that extends beyond graduation. We're here to document the DTU experience and ensure every voice is heard.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-sm opacity-60 mb-4" style={{ color: 'var(--text-secondary)' }}>
            Have a story to share?
          </p>
          <a href="/contact" 
             className="inline-block px-6 py-3 border font-medium transition-all duration-300 hover:translate-x-1 cursor-pointer"
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
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  )
}
