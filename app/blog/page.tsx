'use client';

import { useMemo, useState } from 'react';
import { BookOpen, Search, X } from 'lucide-react';
import { blogPosts } from './data/posts';
import BlogCard from './components/BlogCard';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};

    blogPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });

    return Object.keys(counts)
      .sort()
      .map((category) => ({
        name: category,
        count: counts[category],
      }));
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    if (selectedCategory) {
      filtered = filtered.filter(
        (post) => post.category === selectedCategory
      );
    }

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      filtered = filtered.filter((post) => {
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const hasFilters = Boolean(selectedCategory || searchQuery.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 shadow-lg shadow-indigo-500/25">
            <BookOpen
              className="h-8 w-8 text-white"
              aria-hidden="true"
            />
          </div>

          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            ToolNoveHub Blog
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Tips, tutorials, and guides on using free online tools for
            developers, students, and professionals.
          </p>

          <p className="mt-2 text-sm text-slate-400">
            {filteredPosts.length} of {blogPosts.length} articles
          </p>
        </header>

        {/* Search */}
        <div className="mx-auto mb-6 max-w-md">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search blog posts..."
              aria-label="Search blog posts"
              className="w-full rounded-full border border-slate-200 bg-white/80 py-3 pl-12 pr-12 text-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            aria-pressed={selectedCategory === null}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'border border-slate-200/50 bg-white/80 text-slate-600 backdrop-blur-sm hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            All ({blogPosts.length})
          </button>

          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => setSelectedCategory(category.name)}
              aria-pressed={selectedCategory === category.name}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                selectedCategory === category.name
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'border border-slate-200/50 bg-white/80 text-slate-600 backdrop-blur-sm hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Active Filters */}
        {hasFilters && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-slate-500">
              Filtering by:
            </span>

            {selectedCategory && (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
                {selectedCategory}

                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  aria-label={`Remove ${selectedCategory} filter`}
                  className="transition-colors hover:text-indigo-900"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            )}

            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                &quot;{searchQuery}&quot;

                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Remove search filter"
                  className="transition-colors hover:text-slate-900"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-slate-100 p-4">
              <Search
                className="h-12 w-12 text-slate-400"
                aria-hidden="true"
              />
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No posts found
            </h2>

            <p className="mt-2 text-slate-600">
              Try adjusting your filters or search terms.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 font-medium text-indigo-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Newsletter */}
        <section className="mt-16 rounded-2xl border border-indigo-200/50 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            📬 Stay Updated
          </h2>

          <p className="mt-2 text-slate-600">
            Subscribe to get notified when we publish new blog posts.
          </p>

          <form
            className="mt-4 flex flex-wrap justify-center gap-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="min-w-[200px] rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
            />

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-2 text-xs text-slate-400">
            No spam. Unsubscribe anytime.
          </p>
        </section>
      </div>
    </div>
  );
}