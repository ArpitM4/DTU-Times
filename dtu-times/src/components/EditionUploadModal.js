import { useState } from 'react';
import { apiFetch } from '../utils/api';

export default function EditionUploadModal({ open, onClose, onUploaded }) {
  const [editionNumber, setEditionNumber] = useState('');
  const [title, setTitle] = useState('');
  const [pdf, setPdf] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('editionNumber', editionNumber);
      formData.append('title', title);
      formData.append('pdf', pdf);
      formData.append('coverPic', coverPic);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api'}/edition`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error(await res.text());
      onUploaded && onUploaded();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-lg shadow-xl p-8"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
          style={{ backgroundColor: 'var(--bg-primary)' }}
          onMouseEnter={e => e.target.style.backgroundColor = 'var(--border-color)'}
          onMouseLeave={e => e.target.style.backgroundColor = 'var(--bg-primary)'}
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            style={{ color: 'var(--text-secondary)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Upload New Edition
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Add a new magazine edition PDF and cover. Only editors/admins can upload.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edition-number" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Edition Number
            </label>
            <input
              type="number"
              id="edition-number"
              placeholder="e.g. 34"
              value={editionNumber}
              onChange={e => setEditionNumber(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-4 outline-none"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                '--tw-ring-color': 'rgba(59, 130, 246, 0.1)'
              }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
          <div>
            <label htmlFor="edition-title" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Title
            </label>
            <input
              type="text"
              id="edition-title"
              placeholder="Edition Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-4 outline-none"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                '--tw-ring-color': 'rgba(59, 130, 246, 0.1)'
              }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
          <div>
            <label htmlFor="edition-pdf" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              PDF File
            </label>
            <input
              type="file"
              id="edition-pdf"
              accept="application/pdf"
              onChange={e => setPdf(e.target.files[0])}
              required
              className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-4 outline-none"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                '--tw-ring-color': 'rgba(59, 130, 246, 0.1)'
              }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
          <div>
            <label htmlFor="edition-cover" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              Cover Image
            </label>
            <input
              type="file"
              id="edition-cover"
              accept="image/*"
              onChange={e => setCoverPic(e.target.files[0])}
              required
              className="w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:ring-4 outline-none"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                '--tw-ring-color': 'rgba(59, 130, 246, 0.1)'
              }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </div>
            ) : (
              'Upload'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
