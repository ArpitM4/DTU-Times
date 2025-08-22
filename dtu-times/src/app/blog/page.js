
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { apiFetch } from '../../utils/api';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [featuredPost, setFeaturedPost] = useState(null)
    const { user } = useAuth();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter();

  // Example: role from auth context (can replace with your auth)
  const [role] = useState("editor") // "viewer" | "editor" | "admin"

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      setLoading(true)
      // Use the backend API endpoint and apiFetch utility
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/blog', {
        headers: { 'Content-Type': 'application/json' }
      })
      if (!res.ok) throw new Error("Failed to fetch blogs")
      const data = await res.json()
      // If backend returns { blogs: [...] }
      const blogs = Array.isArray(data.blogs) ? data.blogs : data
      setPosts(blogs)
      setFeaturedPost(blogs.find((post) => post.featured) || blogs[0] || null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this blog?")) return
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + `/blog/${id}` , { method: "DELETE", headers: { 'Content-Type': 'application/json' } })
      if (!res.ok) throw new Error("Failed to delete blog")
      setPosts(posts.filter((post) => post._id !== id))
      if (featuredPost?._id === id) setFeaturedPost(null)
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen"
           style={{ color: 'var(--text-primary)' }}>
        Loading blogs...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    )
  }

  const regularPosts = posts.filter((post) => post._id !== featuredPost?._id)

  return (
    <div className="min-h-screen px-6 pt-24 pb-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-wide"
              style={{ color: 'var(--text-primary)' }}>
            Our Blogs
          </h1>
          <div className="w-16 h-px mx-auto mb-8"
               style={{ backgroundColor: 'var(--accent)' }}></div>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto opacity-80"
             style={{ color: 'var(--text-secondary)' }}>
            Insights, tutorials, and stories from the DTU community.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center p-8 rounded-lg border"
                 style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
              <div>
                <div className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4"
                     style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                  {featuredPost.category || 'General'}
                </div>
                <h2 className="text-2xl md:text-3xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>
                  {featuredPost.title}
                </h2>
                <div className="flex items-center gap-2 mb-4 text-sm opacity-70"
                     style={{ color: 'var(--text-secondary)' }}>
                  <span>{featuredPost.authorName || featuredPost.author || 'Unknown'}</span>
                  <span>•</span>
                  <span>{featuredPost.uploadDateTime ? new Date(featuredPost.uploadDateTime).toLocaleDateString() : ''}</span>
                </div>
                <p className="text-base leading-relaxed mb-6 opacity-80"
                   style={{ color: 'var(--text-secondary)' }}>
                  {featuredPost.content?.slice(0, 180) || featuredPost.excerpt || ''}
                </p>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    className="px-6 py-2 border font-medium transition-all duration-300 hover:translate-x-1 cursor-pointer"
                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--accent)'
                      e.target.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = 'var(--accent)'
                    }}
                    onClick={() => router.push(`/blog/${featuredPost.slug}`)}
                  >
                    Read More
                  </button>

                  {user && (user.role === 'editor' || user.role === 'admin') && (
                    <>
                      <button
                        onClick={() => router.push(`/blog/${featuredPost.slug}/edit`)}
                        className="px-4 py-2 text-sm border rounded cursor-pointer"
                      >
                        Edit
                      </button>
                      {user.role === "admin" && (
                        <button onClick={() => handleDelete(featuredPost._id)}
                                className="px-4 py-2 text-sm border rounded text-red-500 border-red-500 cursor-pointer">
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="aspect-video rounded-lg border-2 flex items-center justify-center text-4xl opacity-100 overflow-hidden"
                   style={{ borderColor: 'var(--border-color)' }}>
                <Image
                  src="/SS.png"
                  alt="featured-blog-img"
                  className="w-full h-full object-cover rounded-lg"
                  width={640}
                  height={360}
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {/* Blog Admin Controls (add blog) */}
      {user && (user.role === 'editor' || user.role === 'admin') && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
            <div className="latest-edition-card transition-transform duration-300 hover:-translate-y-2">
              <div className="edition-placeholder border-2 border-dashed rounded-2xl h-72 flex items-center justify-center text-lg font-medium transition-all duration-300 relative overflow-hidden cursor-pointer"
                   style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                   onClick={() => router.push('/blog/new')}>
                <div className="text-center">
                  <div className="text-4xl mb-2 transition-transform duration-300 hover:scale-110">+</div>
                  <div className="font-semibold">Add Blog</div>
                  <div className="text-sm mt-2 opacity-70">Write a new blog post</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
          {regularPosts.map((post) => (
            <article
              key={post._id}
              className="group border-b-2 border-transparent hover:border-current transition-all duration-300 cursor-pointer"
              onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}
              onClick={e => {
                // Prevent navigation if cli  cking on Edit/Delete buttons
                if (
                  e.target.closest('button')
                ) return;
                router.push(`/blog/${post.slug}`)
              }}
            >
              <div className="p-6">
                {/* Blog Card Image */}
                {post.images && post.images.length > 0 && (
                  <Image
                    src={post.images[0]}
                    alt="blog-img"
                    className="w-full h-40 object-cover rounded-md mb-4 border"
                    style={{ borderColor: 'var(--border-color)' }}
                    width={320}
                    height={160}
                  />
                )}
                <div className="inline-block px-2 py-1 text-xs font-medium rounded mb-3"
                     style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                  {post.category || 'General'}
                </div>
                <h3 className="text-lg font-medium mb-3 group-hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--text-primary)' }}>
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mb-3 text-xs opacity-60"
                     style={{ color: 'var(--text-secondary)' }}>
                  <span>{post.authorName || post.author || 'Unknown'}</span>
                  <span>•</span>
                  <span>{post.uploadDateTime ? new Date(post.uploadDateTime).toLocaleDateString() : ''}</span>
                </div>
                <p className="text-sm leading-relaxed opacity-70 mb-4"
                   style={{ color: 'var(--text-secondary)' }}>
                  {post.content?.slice(0, 120) || post.excerpt || ''}
                </p>

                {/* Actions */}
                {user && (user.role === 'editor' || user.role === 'admin') && (
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        router.push(`/blog/${post.slug}/edit`)
                      }}
                      className="px-3 py-1 border rounded cursor-pointer"
                    >
                      Edit
                    </button>
                    {user.role === "admin" && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(post._id)
                        }}
                        className="px-3 py-1 border rounded text-red-500 border-red-500 cursor-pointer"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16 pt-12 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-sm opacity-60 mb-4" style={{ color: 'var(--text-secondary)' }}>
            More stories coming soon
          </p>
          <button className="px-6 py-3 border font-medium transition-all duration-300 hover:translate-x-1 cursor-pointer"
                  style={{ borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--accent)'
                    e.target.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = 'var(--accent)'
                  }}>
            Subscribe for Updates
          </button>
        </div>
      </div>
    </div>
  )
}
