
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { apiFetch } from '../utils/api';
import Link from 'next/link';
import Image from 'next/image';

/* -----------------------------
   Home Page
------------------------------ */
export default function Home() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };



  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiFetch('/edition')
      .then(res => {
        setEditions(res.editions || []);
        setLoading(false);
      });
  }, []);

  // Sort editions by upload date descending (latest first)
  const sortedEditions = [...editions].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  const latestEditions = sortedEditions.slice(0, 3);


  
  // Use theme from ThemeContext for consistent image filterr
  const { theme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen h-auto md:h-screen flex items-center justify-center px-2 py-4 pt-20 md:p-8 relative"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {/* Witch image at bottom left, only on md+ screens */}
        <Image
          src="/witch.png"
          alt="Witch"
          className="hidden md:block absolute left-0 bottom-0 mb-4 ml-4 z-20 animate-witch-rotate"
          style={{ height: '250px', width: 'auto' }}
          width={250}
          height={250}
          priority
        />
        <div className="max-w-7xl w-full flex items-center gap-8 md:gap-16 lg:flex-row flex-col py-8 md:py-0 relative">
          {/* Left Text (now on left for all breakpoints) */}
          <div className="flex-1 flex flex-col justify-center text-center lg:text-left order-1">
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 mb-2">
              <Image
                src="/DTU.png"
                alt="DTU"
                className="h-16 md:h-28 lg:h-32 w-auto transition-all"
                style={{
                  maxWidth: '100%',
                  filter: theme === 'light' ? 'invert(1) brightness(0)' : 'none',
                  transition: 'filter 0.3s'
                }}
                width={128}
                height={128}
                priority
              />
              <Image
                src="/Times.png"
                alt="Times"
                className="h-12 md:h-20 lg:h-24 w-auto transition-all"
                style={{
                  maxWidth: '100%',
                  filter: theme === 'light' ? 'invert(1) brightness(0)' : 'none',
                  transition: 'filter 0.3s'
                }}
                width={96}
                height={96}
                priority
              />
            </div>
            <div className="w-1/2 h-px mb-10"
               style={{ backgroundColor: 'var(--accent)' }}></div>
            <div className="mb-8 md:mb-12">
              <TypingSubtitle />
            </div>
            {/* Animated Down Arrow below description */}
            <button
              className="scroll-arrow mt-6 md:mt-10 w-8 h-8 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 z-10 cursor-pointer mx-auto"
              onClick={() => scrollToSection('editions')}
              aria-label="Scroll to next section"
            >
              <span
                // style={{ color: 'var(---accenthover)' }}
                className="arrow-icon text-base font-light animate-bounce transition-all duration-300 hover:scale-125"
              >
                <IconArrowDown className="w-6 h-6" />
              </span>
            </button>
          </div>

          {/* Right Image (Rubik's cube) */}
          <div className="flex-1 flex justify-center items-center order-2">
            <div className="mb-8 md:mb-0">
              <ParallaxImage />
            </div>
          </div>
        </div>

      
      </section>

      {/* Editions Section */}
      <section
        id="editions"
        className="min-h-screen h-auto md:h-screen flex items-center justify-center p-4 md:p-8 relative"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="max-w-7xl w-full flex flex-col justify-center h-full py-8 md:py-0">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 md:mb-12 text-center"
            style={{ color: 'var(--text-primary)' }}
          >
            Our Latest Editions :
          </h2>

          {/* Editions Grid - show real editions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 flex-1 items-center">
            {loading ? (
              <div className="col-span-3 text-center text-lg opacity-70" style={{ color: 'var(--text-secondary)' }}>
                Loading editions...
              </div>
            ) : latestEditions.length === 0 ? (
              <div className="col-span-3 text-center text-lg opacity-70" style={{ color: 'var(--text-secondary)' }}>
                No editions found.
              </div>
            ) : latestEditions.map((edition) => (
              <Link key={edition._id} href={`/editions/view/${edition.editionNumber}`} className="block">
                <div className="edition-placeholder border-2 border-dashed rounded-2xl aspect-[1275/1650] max-h-[650px] w-[85%] mx-auto flex items-center justify-center text-lg font-medium transition-all duration-300 hover:-translate-y-1 relative overflow-hidden cursor-pointer bg-white"
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  <div className="absolute inset-0 w-full h-full">
                    {edition.coverPicUrl ? (
                      <Image
                        src={edition.coverPicUrl}
                        alt={`Edition ${edition.editionNumber} Cover`}
                        className="w-full h-full object-contain rounded-2xl"
                        style={{ zIndex: 0, objectFit: 'contain', aspectRatio: '1275/1650', background: 'white' }}
                        width={255}
                        height={330}
                        priority={false}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full w-full z-10 relative">
                        <div className="text-4xl mb-2">📖</div>
                        <div>Edition #{edition.editionNumber}</div>
                        <div className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Click to view</div>
                      </div>
                    )}
                    {edition.coverPicUrl && (
                      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 text-white text-center py-2 z-20 rounded-b-2xl">
                        Edition #{edition.editionNumber}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Explore + Scroll Button */}
          <div className="text-center flex flex-col items-center gap-2">
            <Link
              href="/editions"
              className="font-semibold text-base md:text-lg text-teal-600 dark:text-teal-400 transition-colors duration-200 hover:text-glow flex items-center gap-1"
            >
              Explore Editions
            </Link>

            <button
              className="scroll-arrow mt-2 md:mt-3 w-8 h-8 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 z-10 cursor-pointer"
              onClick={() => scrollToSection('team')}
              aria-label="Scroll to next section"
            >
              <span
                className="arrow-icon text-base font-light animate-bounce transition-all duration-300 hover:scale-125"
                style={{ color: 'var(--text-secondary)' }}
              >
                <IconArrowDown className="w-6 h-6" />
              </span>
            </button>
          </div>
        </div>
      </section>

        {/* Team Section */}
        <section
          id="team"
          className="min-h-screen h-auto md:h-screen flex items-center justify-center p-4 md:p-8 relative"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <TeamSection />
          {/* Scroll Up */}
          <button
            className="scroll-arrow scroll-up absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 items-center justify-center transition-all duration-300 hover:-translate-y-1 z-10 cursor-pointer hidden md:flex"
            onClick={() => scrollToSection('hero')}
            aria-label="Scroll to top"
          >
            <span
              className="arrow-icon text-base font-light animate-bounce transition-all duration-300 hover:scale-125"
              style={{ color: 'var(--text-secondary)' }}
            >
              ^
            </span>
          </button>
        </section>


      {/* Glow Effect Styles and Witch Animation */}
      <style jsx global>{`
        .hover\:text-glow:hover {
          text-shadow: 0 0 6px #14b8a6, 0 0 12px #14b8a6, 0 0 24px #14b8a6,
            0 0 48px #14b8a6;
          color: #1de9b6 !important;
        }
        @keyframes witch-rotate {
          0% { transform: rotate(5deg); }
          50% { transform: rotate(-5deg); }
          100% { transform: rotate(5deg); }
        }
        .animate-witch-rotate {
          animation: witch-rotate 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* --------------------------------
   Supporting Components (same file)
---------------------------------- */

// Team Section with horizontal role bar and simple cards

// TeamSection must be outside the Home component
import teamDataRaw from '../data/team.json';

const TEAM_ROLES = [
  'Columnists',
  'Designers',
  'Photographers',
  'Illustrators',
  'Developers',
];

const teamData = Array.isArray(teamDataRaw) ? teamDataRaw : [];

function TeamSection() {
  const [selectedRole, setSelectedRole] = React.useState(TEAM_ROLES[0]);
  const filtered = teamData.filter(member => member.role === selectedRole);
  return (
    <div className="max-w-7xl w-full flex flex-col items-center justify-center h-full py-8 md:py-0 px-2 md:px-8 mx-auto" style={{ background: 'var(--bg-primary)' }}>
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 md:mb-12 text-center"
        style={{ color: 'var(--text-primary)' }}
      >
        Team
      </h2>
      {/* Horizontal role selector bar */}
      <div className="flex flex-wrap gap-0 mb-8 justify-center border-b" style={{ borderColor: 'var(--accent)' }}>
        {TEAM_ROLES.map(role => (
          <button
            key={role}
            className={`px-12 cursor-pointer py-3 font-semibold text-base md:text-lg -t -x transition-colors duration-200 ${selectedRole === role ? 'bg-[var(--accent)] text-white' : 'text-[var(--accent)] hover:bg-[var(--accent)/20]'}`}
            style={{
              borderColor: 'var(--accent)',
              borderBottom: selectedRole === role ? 'none' : '1px solid var(--accent)',
              borderRadius: '0.5rem 0.5rem 0 0',
              background: selectedRole === role ? 'var(--accent)' : 'transparent',
              color: selectedRole === role ? 'white' : 'var(--accent)',
              marginBottom: '-1px',
            }}
            onClick={() => setSelectedRole(role)}
          >
            {role}
          </button>
        ))}
      </div>
      {/* Team member cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-lg opacity-70" style={{ color: 'var(--text-secondary)' }}>
            No team members found for this role.
          </div>
        ) : filtered.map(member => (
          <div key={member.name} className="flex flex-col items-center bg-[var(--bg-secondary)] rounded-2xl p-6 shadow-md w-full max-w-xs border border-[var(--border-color)]" style={{ minHeight: 320 }}>
            {member.profilePic && member.profilePic.includes('randomuser.me') ? (
              <img
                src={member.profilePic}
                alt={member.name}
                className="w-28 h-28 object-cover rounded-full mb-4 border-4"
                style={{ borderColor: 'var(--accent)', background: 'white' }}
                width={112}
                height={112}
                loading="lazy"
              />
            ) : (
              <Image
                src={member.profilePic}
                alt={member.name}
                className="w-28 h-28 object-cover rounded-full mb-4 border-4"
                style={{ borderColor: 'var(--accent)', background: 'white' }}
                width={112}
                height={112}
              />
            )}
            <div className="font-semibold text-lg mb-1 text-center" style={{ color: 'var(--text-primary)' }}>{member.name}</div>
            <div className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>{member.bio}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple typewriter subtitle
function TypingSubtitle() {
  const fullText =
    "Beyond the headlines. DTU Times is the pulse of student life, capturing the vibrant culture, creative voices, and defining moments of our university. Dive in.";
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    let tId;
    const type = () => {
      if (i <= fullText.length) {
        setDisplayed(fullText.slice(0, i));
        i += 1;
  tId = setTimeout(type, 25);
      }
    };
    type();
    return () => clearTimeout(tId);
  }, []);

  return (
  <p
    className="text-sm md:text-base lg:text-base leading-relaxed min-h-[4.5rem] font-handwritten"
    style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}
  >
    {displayed}
    <span className="animate-pulse">|</span>
  </p>
);

}

// Parallax tilt image component
function ParallaxImage() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({ x, y });
  }
  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  const maxTilt = 18;
  const tiltStyle = {
    transform: `
      perspective(700px) 
      rotateY(${-tilt.x * maxTilt}deg) 
      rotateX(${tilt.y * maxTilt}deg) 
      scale3d(1.04,1.04,1.04) 
      var(--bounce-translate, translateY(0))
    `,
    transition: 'transform 0.18s cubic-bezier(.23,1.01,.32,1)',
  };

 return (
  <div
    ref={ref}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    style={tiltStyle}
    className="cursor-pointer select-none inline-block"
  >
    {/* Only ONE bounce applied here */}
    <div className="animate-hero-bounce">
      <Image
        src="/Box.png"
        alt="DTU Times Box"
        className="max-w-[420px] rounded-xl animate-glow"
        width={420}
        height={420}
        priority
      />
    </div>
  </div>
 );

}




// Inline SVG icons (no external deps)
function IconArrowRight({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconArrowDown({ className = 'w-6 h-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 3a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4.001 4a1 1 0 01-1.414 0l-4-4.001A1 1 0 116.293 10.293L8.586 12.586V4a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
