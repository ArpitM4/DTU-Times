"use client";
import Image from 'next/image';

export default function EditorCard({ name, title, email, imageUrl }) {
  return (
    <div className="editor-card p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-105"
         style={{ 
           backgroundColor: 'var(--bg-secondary)', 
           borderColor: 'var(--border-color)' 
         }}>
      <div className="flex items-center gap-4">
        {/* Editor Image */}
        <div className="flex-shrink-0">
          <Image 
            src={imageUrl} 
            alt={`${name} - ${title}`}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 transition-all duration-300"
            style={{ borderColor: 'var(--accent)' }}
            width={96}
            height={96}
          />
        </div>
        
        {/* Editor Info */}
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold mb-1" 
              style={{ color: 'var(--text-primary)' }}>
            {name}
          </h3>
          <p className="text-sm md:text-base italic mb-2" 
             style={{ color: 'var(--text-secondary)' }}>
            {title}
          </p>
          <a 
            href={`mailto:${email}`}
            className="text-sm md:text-base font-medium transition-colors duration-300 hover:underline cursor-pointer"
            style={{ color: 'var(--accent)' }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent-hover)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--accent)'}
          >
            {email}
          </a>
        </div>
      </div>
    </div>
  )
}
