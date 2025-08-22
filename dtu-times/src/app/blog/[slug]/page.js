"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/api";
import Image from 'next/image';

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.slug) return;
    setLoading(true);
    apiFetch(`/blog/${params.slug}`)
      .then(res => setBlog(res.blog))
      .catch(() => setError("Blog not found."))
      .finally(() => setLoading(false));
  }, [params?.slug]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!blog) return null;

  const canEdit = user && (user.role === "editor" || user.role === "admin");

  return (
    <div className="max-w-3xl mx-auto pt-28 py-16 px-4">
      <div className="mb-6 flex items-center gap-4">
        <h1 className="text-3xl font-bold flex-1">{blog.title}</h1>
        {canEdit && (
          <>
            <button className="p-2 text-blue-600 cursor-pointer" title="Edit" onClick={() => router.push(`/blog/${blog.slug}/edit`)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L5.232 12.232a2 2 0 010-2.828L9 13z" />
              </svg>
            </button>
            <button className="p-2 text-red-600 cursor-pointer" title="Delete" onClick={async () => {
              if (window.confirm("Delete this blog?")) {
                await apiFetch(`/blog/${blog._id}`, {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                router.push("/blog");
              }
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="mb-2 text-gray-500">By {blog.authorName} • {new Date(blog.uploadDateTime).toLocaleDateString()}</div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {blog.images?.map((img, i) => (
          <Image key={i} src={img} alt="blog-img" className="w-32 h-32 object-cover rounded" width={128} height={128} />
        ))}
      </div>
      <div className="prose dark:prose-invert max-w-none" style={{ color: 'var(--text-primary)' }}>
        {blog.content}
      </div>
    </div>
  );
}
