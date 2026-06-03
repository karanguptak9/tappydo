'use client';

import { useState } from 'react';

export default function WriteBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const existing = JSON.parse(localStorage.getItem('blog_posts') || '[]');
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString(),
    };
    localStorage.setItem('blog_posts', JSON.stringify([newPost, ...existing]));

    setSubmitted(true);
    setTitle('');
    setContent('');
    window.open('/myblog', '_blank');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Write a Blog Post</h1>
        <p className="text-sm text-gray-400 mb-8">Private — not listed in navigation</p>

        {submitted && (
          <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            Post saved! Opening your blog in a new tab.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post..."
              rows={14}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-gray-900 resize-y"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
