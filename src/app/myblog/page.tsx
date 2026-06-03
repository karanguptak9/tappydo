'use client';

import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function MyBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('blog_posts') || '[]');
    setPosts(stored);
  }, []);

  function deletePost(id: number) {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem('blog_posts', JSON.stringify(updated));
  }

  function startEdit(post: Post) {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  }

  function saveEdit(id: number) {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, title: editTitle.trim(), content: editContent.trim() } : p
    );
    setPosts(updated);
    localStorage.setItem('blog_posts', JSON.stringify(updated));
    setEditingId(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Blog</h1>
            <p className="text-sm text-gray-400 mt-1">Private — not listed in navigation</p>
          </div>
          <a
            href="/writemyblog"
            className="px-5 py-2 bg-amber-700 text-white rounded-lg text-sm font-semibold hover:bg-amber-800 transition"
          >
            + New Post
          </a>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg">No posts yet.</p>
            <p className="text-sm mt-2">Go to <a href="/writemyblog" className="text-amber-700 underline">/writemyblog</a> to write your first one.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                {editingId === post.id ? (
                  /* Edit mode */
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-y"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => saveEdit(post.id)}
                        className="px-5 py-2 bg-amber-700 text-white rounded-lg text-sm font-semibold hover:bg-amber-800 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-5 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View mode */
                  <>
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
                      <div className="flex gap-3 ml-4 shrink-0">
                        <button
                          onClick={() => startEdit(post)}
                          className="text-xs text-amber-700 hover:text-amber-900 font-medium transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="text-xs text-gray-400 hover:text-red-500 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
