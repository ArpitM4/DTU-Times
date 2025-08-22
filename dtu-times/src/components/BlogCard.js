"use client";
import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

export default function BlogCard({ post }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-md rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:scale-105 cursor-pointer flex flex-col"
      tabIndex={0}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-teal-500 text-white text-xs font-semibold tracking-wide shadow">
          {post.category}
        </span>
        <h2 className="font-bold text-xl lg:text-2xl mb-2 text-gray-900 dark:text-gray-100">
          {post.title}
        </h2>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">By {post.author}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400" suppressHydrationWarning={true}>• {typeof window !== 'undefined' ? new Date(post.date).toLocaleDateString() : ''}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-200 text-base flex-1">
          {post.excerpt}
        </p>
      </div>
    </motion.div>
  );
}
