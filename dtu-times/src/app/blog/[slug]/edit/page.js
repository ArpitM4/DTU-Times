"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/api";
import Image from 'next/image';

export default function BlogEditPage() {
  // Utility to generate slug from title (same as in new blog page)
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^a-z0-9\-]/g, '')    // Remove all non-alphanumeric except -
      .replace(/-+/g, '-')             // Replace multiple - with single -
      .replace(/^-+|-+$/g, '');        // Trim - from start/end
  }
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    if (!params?.slug) return;
    setLoading(true);
    apiFetch(`/blog/${params.slug}`)
      .then(res => {
        setTitle(res.blog.title);
        setContent(res.blog.content);
        setImages(res.blog.images || []);
        setBlogId(res.blog._id);
      })
      .catch(() => setError("Blog not found."))
      .finally(() => setLoading(false));
  }, [params?.slug]);

  if (!user || (user.role !== "editor" && user.role !== "admin")) {
    return <div className="p-8 text-center">You do not have permission to edit this blog.</div>;
  }
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 pt-28 text-center text-red-500">{error}</div>;

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    setError("");
    try {
      const uploaded = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}/image/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) uploaded.push(data.secure_url);
      }
      setImages((prev) => {
        const newImages = [...prev, ...uploaded];
        console.log('Images after upload:', newImages);
        return newImages;
      });
    } catch (err) {
      setError("Image upload failed.");
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (uploading) {
      setError("Please wait for image upload to finish before submitting.");
      return;
    }
    setUploading(true);
    try {
      const newSlug = slugify(title);
      await apiFetch(`/blog/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({
          title,
          content,
          images,
          slug: newSlug,
        }),
      });
      router.push(`/blog/${newSlug}`);
    } catch (err) {
      setError("Failed to update blog.");
    }
    setUploading(false);
  };

  return (
    <div
      className="min-h-screen px-4 pt-32 pb-10"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-2xl md:text-3xl font-light mb-3 tracking-wide"
            style={{ color: "var(--text-primary)" }}
          >
            Edit Blog
          </h1>
          <div
            className="w-12 h-px mx-auto"
            style={{ backgroundColor: "var(--accent)" }}
          ></div>
        </div>

        {/* Blog Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Title
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 bg-transparent text-sm"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content */}
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Content
              </label>
              <textarea
                className="w-full border rounded-md px-3 py-2 min-h-[120px] bg-transparent text-sm"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              />
            </div>

            {/* Images */}
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block text-sm"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {images.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt="blog-img"
                    className="w-16 h-16 object-cover rounded-md border"
                    style={{ borderColor: "var(--border-color)" }}
                    width={64}
                    height={64}
                  />
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-500 text-center font-medium text-sm">{typeof error === 'object' ? (error.message || JSON.stringify(error)) : error}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2 rounded-md transition-all duration-300"
              disabled={uploading}
            >
              {uploading ? "Uploading images..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
