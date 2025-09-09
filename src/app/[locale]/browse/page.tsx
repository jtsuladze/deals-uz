'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { t, type Locale } from '../../../i18n';
import Header from '../../../components/Header';
import { dataStore } from '../../../stores/dataStore';
import { Post, SearchFilters } from '../../../types';
import { categories, getCategoryName } from '../../../data/categories';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import Image from 'next/image';

export default function LocaleBrowsePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    condition: '',
    location: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    // Initial load with a small delay to ensure dataStore is ready
    const timer = setTimeout(() => {
      loadPosts();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [filters]);

  const loadPosts = () => {
    setLoading(true);
    try {
      const allPosts = dataStore.searchPosts(filters);
      setPosts(allPosts || []);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };



  const getMainImage = (post: Post) => {
    if (post.images && post.images.length > 0) {
      return post.images[0];
    }
    // Return a data URI for a simple placeholder SVG
    return "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f3f4f6'/%3e%3ctext x='50' y='50' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle' dy='.3em'%3eNo Image%3c/text%3e%3c/svg%3e";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const getCategoryDisplayName = (category: string) => {
    try {
      return getCategoryName(category, locale as Locale);
    } catch (error) {
      console.warn('Error getting category name for:', category, error);
      return category;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale as Locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🛍️ {t(locale as Locale, 'browseItems')}
          </h1>
          <p className="text-lg text-gray-600">
            {t(locale as Locale, 'findGreatDeals')}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {getCategoryDisplayName(category.id)}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter - Service vs Item */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value as 'item' | 'service' | '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="item">Items for Sale</option>
                <option value="service">Services</option>
              </select>
            </div>

            {/* Price Min */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
              <input
                type="number"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Max */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="Any"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <select
                value={filters.condition || ''}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Condition</option>
                <option value="new">New</option>
                <option value="like_new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={filters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                placeholder="Enter city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value as SearchFilters['sortBy'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${posts.length} items found`}
          </p>

        </div>

        {/* Items Grid - 4 Columns */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/${locale}/post/${post.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-200">
                  {post.images && post.images.length > 0 ? (
                    <Image
                      src={getMainImage(post)}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs">No Image</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {post.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      ⭐ Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 overflow-hidden">
                    {post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 overflow-hidden">
                    {post.description.length > 80 ? post.description.substring(0, 80) + '...' : post.description}
                  </p>
                  
                  <div className="text-lg font-bold text-green-600 mb-2">
                    ${formatPrice(post.price)}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>📍 {post.location}</span>
                    <span>{getCategoryDisplayName(post.category)}</span>
                  </div>
                  
                  <div className="mt-2 flex gap-2">
                    {/* Type Badge */}
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      post.type === 'service' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {post.type === 'service' ? '🔧 Service' : '📦 Item'}
                    </span>
                    
                    {/* Condition Badge */}
                    {post.condition && (
                      <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs capitalize">
                        {post.condition.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search filters or browse all categories.</p>
          </div>
        )}
      </div>
      
      <Footer locale={locale} />
    </div>
  );
}
