"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../../../context/AuthContext'
import { apiFetch } from '../../../utils/api'

export default function EditionSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editions, setEditions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    apiFetch('/edition')
      .then(res => {
        setEditions(res.editions);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }
    setResults(
      editions.filter(e => String(e.editionNumber) === String(searchTerm))
    );
  }, [searchTerm, editions]);

  const handleBack = () => {
    router.push('/editions');
  };

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section className="py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by #Edition Number"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input w-full py-4 px-6 pr-12 border-2 rounded-full text-base outline-none transition-all duration-300 focus:ring-4"
              style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
                '--tw-ring-color': 'rgba(37, 99, 235, 0.1)'
              }}
            />
            <button
              className="search-button absolute right-4 top-1/2 transform -translate-y-1/2 text-xl transition-colors duration-300 cursor-pointer"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Search"
              onClick={() => {}}
              disabled
            >
              🔍
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 px-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-left" style={{ color: 'var(--text-primary)' }}>
              Search Results
            </h2>
            <button
              className="px-4 py-2 rounded cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-colors duration-200"
              onClick={handleBack}
            >
              ← Back to All Editions
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div>Loading editions...</div>
            ) : results.length === 0 ? (
              <div className="col-span-3 text-center text-lg opacity-70" style={{ color: 'var(--text-secondary)' }}>
                No editions found for #{searchTerm}
              </div>
            ) : results.map((edition) => (
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
                          setResults(results.filter(ed => ed._id !== edition._id));
                        }
                      }}
                      className="p-2 rounded-full bg-red-200 text-xs">🗑️</button>
                  </div>
                )}
                <a href={`/editions/view/${edition.editionNumber}`} className="block">
         <div className="edition-placeholder border-2 border-dashed rounded-2xl aspect-[1275/1650] max-h-[90vh] w-full mx-auto flex items-center justify-center text-lg font-medium transition-all duration-300 relative overflow-hidden cursor-pointer"
                       style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    <div className="absolute inset-0 w-full h-full">
                      {edition.coverPicUrl ? (
                        <img
                          src={edition.coverPicUrl}
                          alt={`Edition ${edition.editionNumber} Cover`}
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
    </div>
  );
}
