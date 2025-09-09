'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Post } from '../../../types';
import { dataStore } from '../../../stores/dataStore';
import { userStore, User } from '../../../userStore';
import Header from '../../../components/Header';
import { Locale } from '../../../i18n';
import Link from 'next/link';
import Footer from '../../../components/Footer';

// Utility function to truncate text to a specific character limit
const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  return text.substring(0, limit).trim() + '...';
};

export default function MyListings() {
  const [user, setUser] = useState(userStore.getCurrentUser());
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'item' | 'service'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-high' | 'price-low'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const params = useParams();
  const locale = (params?.locale as Locale) || 'en';

  useEffect(() => {
    const unsubscribe = userStore.subscribe((newUser: User | null) => {
      setUser(newUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadUserPosts = () => {
      if (user) {
        const userPosts = dataStore.getPostsByUser(user.id);
        setPosts(userPosts);
      } else {
        setPosts([]);
      }
      setLoading(false);
    };

    loadUserPosts();
  }, [user]);

  // Filter and sort posts whenever posts, filters, or search query changes
  useEffect(() => {
    let filtered = [...posts];

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(post => post.type === filterType);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.location.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, filterType, sortBy, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header locale={locale} />
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header locale={locale} />
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Sign In</h1>
              <p className="text-gray-600 mb-8">You need to be signed in to view your listings.</p>
              <Link 
                href={`/${locale}/auth/signin`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header locale={locale} />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
                <p className="mt-2 text-gray-600">
                  Manage your posted items ({posts.length} {posts.length === 1 ? 'listing' : 'listings'})
                  {filteredPosts.length !== posts.length && (
                    <span className="text-indigo-600"> • Showing {filteredPosts.length} filtered</span>
                  )}
                </p>
              </div>
              <Link
                href={`/${locale}/post`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: '#0070f3' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(0,81,204)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0070f3'}
              >
                + Add New Listing
              </Link>
            </div>
          </div>

          {/* Filters Section */}
          {posts.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Bar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <input
                    type="text"
                    placeholder="Search your listings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as 'all' | 'item' | 'service')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="item">Items</option>
                    <option value="service">Services</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'price-high' | 'price-low')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="price-low">Price: Low to High</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilterType('all');
                      setSortBy('newest');
                    }}
                    className="w-full px-3 py-2 text-white rounded-md transition-colors text-sm"
                    style={{ backgroundColor: '#0070f3' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgb(0,81,204)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0070f3'}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Total: {posts.length}</span>
                  <span>Items: {posts.filter(p => p.type === 'item').length}</span>
                  <span>Services: {posts.filter(p => p.type === 'service').length}</span>
                  {filteredPosts.length !== posts.length && (
                    <span className="text-indigo-600 font-medium">Filtered: {filteredPosts.length}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                {posts.length === 0 ? (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No listings yet</h3>
                    <p className="mt-2 text-gray-500">
                      Get started by creating your first listing.
                    </p>
                    <div className="mt-6">
                      <Link
                        href={`/${locale}/post`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Create Your First Listing
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No matching listings</h3>
                    <p className="mt-2 text-gray-500">
                      Try adjusting your filters or search terms.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setFilterType('all');
                          setSortBy('newest');
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 overflow-hidden">
                  <div className="p-4">
                    <div className="mb-2">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        post.type === 'item' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {post.type === 'item' ? 'Item' : 'Service'}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 h-12 flex items-start" title={post.title}>
                      {truncateText(post.title, 60)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 h-16 overflow-hidden" title={post.description}>
                      {truncateText(post.description, 120)}
                    </p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-bold text-green-600">${post.price}</span>
                      <span className="text-xs text-gray-500 truncate max-w-20" title={post.location}>
                        {truncateText(post.location, 15)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{post.views || 0} views</span>
                      <span>{post.createdAt.toLocaleDateString()}</span>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <Link
                        href={`/${locale}/browse/${post.id}`}
                        className="flex-1 text-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200 transition-colors"
                      >
                        View
                      </Link>
                      <button className="flex-1 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer locale={locale} />
    </div>
  );
}