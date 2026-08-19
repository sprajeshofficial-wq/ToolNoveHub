'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, Search, X } from 'lucide-react';
import { blogPosts } from './data/posts';
import BlogCard from './components/BlogCard';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories with counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    blogPosts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return Object.keys(counts).sort();
  }, []);

  // Filter posts based on category and search
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const getCategoryCount = (category: string) => {
    return blogPosts.filter(p => p.category === category).length;
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 shadow-lg shadow-indigo-500/25">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">ToolNoveHub Blog</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Tips, tutorials, and guides on using free online tools for developers, students, and professionals.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {filteredPosts.length} of {blogPosts.length} articles
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blog posts..."
              className="w-full rounded-full border border-slate-200 bg-white/80 py-3 pl-12 pr-12 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200/50'
            }`}
          >
            All ({blogPosts.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white/80 backdrop-blur-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200/50'
              }`}
            >
              {category} ({getCategoryCount(category)})
            </button>
          ))}
        </div>

        {/* Active Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-sm text-slate-500">Filtering by:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
                {selectedCategory}
                <button onClick={() => setSelectedCategory(null)} className="hover:text-indigo-900">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-slate-900">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Blog Grid - Filtered Results */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center rounded-2xl bg-slate-100 p-4 mb-4">
              <Search className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No posts found</h3>
            <p className="mt-2 text-slate-600">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-indigo-600 hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">📬 Stay Updated</h3>
          <p className="mt-2 text-slate-600">
            Subscribe to get notified when we publish new blog posts.
          </p>
          <form className="mt-4 flex flex-wrap justify-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none min-w-[200px]"
            />
            <button className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105">
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}