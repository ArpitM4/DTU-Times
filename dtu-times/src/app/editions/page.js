"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../utils/api'
import EditionUploadModal from '../../components/EditionUploadModal'

export default function EditionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [editions, setEditions] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const fetchEditions = () => {
    setLoading(true);
    apiFetch('/edition')
      .then(res => setEditions(res.editions))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchEditions();
  }, []);

  const router = require('next/navigation').useRouter();
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/editions/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const filteredEditions = editions.filter(e =>
    searchTerm ? String(e.editionNumber).includes(searchTerm) : true
  );

  // Top 3 for latest, rest for previous
  const latestEditions = filteredEditions.slice(0, 3);
  const previousEditions = filteredEditions.slice(3);

  const nextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  const prevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Search Section */}
      <section className="py-2   px-6 ">
        <div className="max-w-7xl mx-auto flex justify-center">
          <form className="relative w-full max-w-lg" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by #Edition Number"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input w-full py-4 px-6 pr-12 border-2 rounded-full text-base outline-none transition-all duration-300 focus:ring-4"
              style={{ 
                backgroundColor: 'var(--bg-primary)', 
                color: 'var(--text-primary)', 
                borderColor: 'var(--border-color)',
                '--tw-ring-color': 'rgba(37, 99, 235, 0.1)'
              }}
            />
            <button type="submit" className="search-button absolute right-4 top-1/2 transform -translate-y-1/2 text-xl transition-colors duration-300 cursor-pointer" 
                    style={{ color: 'var(--text-secondary)' }}
                    aria-label="Search">
              🔍
            </button>
          </form>
        </div>
      </section>

      {/* Latest Editions Section */}
      <section className="py-12 px-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-left" 
              style={{ color: 'var(--text-primary)' }}>
            Latest Editions:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add a Magazine Card (editors/admins only) */}
            {user && (user.role === 'editor' || user.role === 'admin') && (
              <div className="latest-edition-card transition-transform duration-300 hover:-translate-y-2">
                <div className="edition-placeholder border-2 border-dashed rounded-2xl aspect-[1275/1650] max-h-[650px] w-[85%] mx-auto flex items-center justify-center text-lg font-medium transition-all duration-300 relative overflow-hidden cursor-pointer"
                     style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                     onClick={() => setShowModal(true)}>
                  <div className="text-center">
                    <div className="text-4xl mb-2 transition-transform duration-300 hover:scale-110">+</div>
                    <div className="font-semibold">Add New Edition</div>
                    <div className="text-sm mt-2 opacity-70">Upload a new magazine edition</div>
                  </div>
                </div>
              </div>
            )}
            {showModal && <EditionUploadModal open={showModal} onClose={() => setShowModal(false)} onUploaded={fetchEditions} />}

            {loading ? (
              <div>Loading editions...</div>
            ) : latestEditions.map((edition) => (
              <div key={edition._id} className="latest-edition-card transition-transform duration-300 hover:-translate-y-2 relative">
                {user && (user.role === 'editor' || user.role === 'admin') && (
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button
                      title="Delete"
                      onClick={async (e) => {
                        e.preventDefault();
                        if (window.confirm('Delete this edition?')) {
                          await apiFetch(`/edition/${edition._id}`, {
                            method: 'DELETE',
                            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                          });
                          fetchEditions();
                        }
                      }}
                      className="p-2 rounded-full cursor-pointer bg-red-200 text-xs">🗑️</button>
                  </div>
                )}
                <a href={`/editions/view/${edition.editionNumber}`} className="block">
                  <div className="edition-placeholder border-2 border-dashed rounded-2xl aspect-[1275/1650] max-h-[650px] w-[85%] mx-auto flex items-center justify-center text-lg font-medium transition-all duration-300 relative overflow-hidden cursor-pointer"
                       style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    <div className="absolute inset-0 w-full h-full">
                      {edition.coverPicUrl ? (
                        <Image
                          src={edition.coverPicUrl}
                          alt={`Edition ${edition.editionNumber} Cover`}
                          width={1275}
                          height={1650}
                          className="w-full h-full object-contain rounded-2xl"
                          style={{ zIndex: 0, objectFit: 'contain', aspectRatio: '1275/1650', background: 'white' }}
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
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Editions Section */}
<section className="py-12 px-4 sm:px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
  <div className="max-w-7xl mx-auto">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 text-left"
        style={{ color: 'var(--text-primary)' }}>
      Previous Editions
    </h2>

    {/* Cards grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
      {loading ? (
        <div>Loading editions...</div>
      ) : previousEditions.map((edition) => (
        <div key={edition._id} className="transition-transform duration-300 hover:-translate-y-1 relative">
          {user && (user.role === 'editor' || user.role === 'admin') && (
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <button
                title="Delete"
                onClick={async (e) => {
                  e.preventDefault();
                  if (window.confirm('Delete this edition?')) {
                    await apiFetch(`/edition/${edition._id}`, {
                      method: 'DELETE',
                      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                    fetchEditions();
                  }
                }}
                className="p-1.5 sm:p-2 rounded-full bg-red-200 text-xs cursor-pointer">🗑️</button>
            </div>
          )}
          <a href={`/editions/view/${edition.editionNumber}`} className="block">
            <div className="border rounded-xl overflow-hidden aspect-[3/4] bg-white flex items-center justify-center">
              {edition.coverPicUrl ? (
                <Image
                  src={edition.coverPicUrl}
                  alt={`Edition ${edition.editionNumber} Cover`}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <div className="text-3xl">📰</div>
                  <div className="mt-2 font-medium">Edition #{edition.editionNumber}</div>
                  <div className="text-xs opacity-70 mt-1">Click to view</div>
                </div>
              )}
            </div>
          </a>
        </div>
      ))}
    </div>

    {/* Pagination controls */}
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center text-lg sm:text-xl font-bold transition hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        ‹
      </button>
      <span style={{ color: 'var(--text-secondary)' }}>Page {currentPage}</span>
      <button
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center text-lg sm:text-xl font-bold transition hover:scale-105"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}
        onClick={nextPage}
      >
        ›
      </button>
    </div>
  </div>
</section>

    </div>
  )
}
