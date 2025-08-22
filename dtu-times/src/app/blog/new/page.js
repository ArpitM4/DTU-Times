"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/api";
import Image from 'next/image';

export default function BlogCreatePage() {
  // Utility to generate slug from title
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
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  if (!user || (user.role !== "editor" && user.role !== "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-36 pb-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="bg-white dark:bg-gray-900/80 rounded-2xl shadow-lg p-10 w-full max-w-lg text-center border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">You do not have permission to add a blog.</h2>
        </div>
      </div>
    );
  }

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
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    console.log('Submitting blog with images:', images);
    setUploading(true);
    try {
      const slug = slugify(title);
      const res = await apiFetch("/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({
          title,
          content,
          images,
          authorName: user.name,
          slug,
        }),
      });
      // Handle both { error: ... } and { message: ... } error shapes
      if (res && (res.error || (typeof res.message === 'string' && res.message.toLowerCase().includes('required')))) {
        setError(res.error || res.message || "Failed to create blog.");
        console.error("Blog creation error:", res.error || res.message);
      } else {
        router.push("/blog");
      }
    } catch (err) {
      console.error("Blog creation error:", err);
      setError(err?.message || "Failed to create blog.");
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
        Add New Blog
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setContent(e.target.value)}
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
          {uploading ? "Uploading images..." : "Publish Blog"}
        </button>
      </form>
    </div>
  </div>
</div>

  )}