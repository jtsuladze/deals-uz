'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Post, SearchFilters } from '@/types';
import { categories, getCategoryName, getSubcategoryName } from '@/data/categories';
import Link from 'next/link';
import Image from 'next/image';

// Database listing type (matches Prisma schema)
interface DatabaseListing {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  condition: string;
  location: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  images: { id: string; url: string; }[];
  category: { id: string; name_en: string; name_ru: string; name_uz: string; };
  user: { id: string; name: string; };
}

export default function MarketplacePage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    sortBy: 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [searchFilters]);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      // Fetch listings from database API
      const response = await fetch('/api/listings');
      if (!response.ok) throw new Error('Failed to fetch listings');
      
      const dbListings: DatabaseListing[] = await response.json();
      
      // Convert database listings to Post format
      const convertedPosts: Post[] = dbListings.map(listing => ({
        id: listing.id,
        title: listing.title,
        description: listing.description,
        price: listing.price,
        category: listing.categoryId,
        condition: listing.condition as 'new' | 'like_new' | 'good' | 'fair' | 'poor',
        location: listing.location,
        userId: listing.userId,
        userName: listing.user.name,
        userEmail: '', // Not available from current API
        userPhone: '', // Not available from current API
        images: listing.images.map(img => img.url),
        tags: [], // Not in database yet
        createdAt: new Date(listing.createdAt),
        updatedAt: new Date(listing.updatedAt),
        type: 'item' as const, // Default for now
        isFeatured: false, // Can be added to schema later
        views: 0, // Can be added to schema later
        status: listing.status as 'active' | 'pending' | 'rejected' | 'sold' | 'archived',
        favorites: [], // Not loaded in this API call
        contactPreference: 'both' as const // Default
      }));

      // Apply client-side filtering based on searchFilters
      let filtered = convertedPosts;
      
      if (searchFilters.category) {
        filtered = filtered.filter(post => post.category === searchFilters.category);
      }
      
      if (searchFilters.location) {
        filtered = filtered.filter(post => 
          post.location.toLowerCase().includes(searchFilters.location!.toLowerCase())
        );
      }
      
      if (searchFilters.minPrice !== undefined) {
        filtered = filtered.filter(post => post.price >= searchFilters.minPrice!);
      }
      
      if (searchFilters.maxPrice !== undefined) {
        filtered = filtered.filter(post => post.price <= searchFilters.maxPrice!);
      }
      
      if (searchFilters.condition) {
        filtered = filtered.filter(post => post.condition === searchFilters.condition);
      }

      // Apply sorting
      switch (searchFilters.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        case 'price_low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filtered.sort((a, b) => b.price - a.price);
          break;
      }
      
      setPosts(filtered);
      setFeaturedPosts(filtered.slice(0, 4)); // Show first 4 as featured for now
      
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
      setFeaturedPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getPostUrl = (post: Post) => {
    return `/${locale}/post/${post.id}`;
  };

  const handleFavorite = (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // This would typically require user authentication
    // For demo purposes, we'll just show an alert
    alert('Please sign in to add favorites');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading marketplace...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
              <p className="text-gray-600">Discover amazing items and services</p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={searchFilters.query || ''}
                  onChange={(e) => handleFilterChange('query', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={searchFilters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {getCategoryName(cat.id, locale as any)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={searchFilters.type || ''}
                  onChange={(e) => handleFilterChange('type', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="item">Items</option>
                  <option value="service">Services</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={searchFilters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={searchFilters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={searchFilters.sortBy || 'newest'}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">Featured Listings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPosts.map(post => (
                <Link key={post.id} href={getPostUrl(post)}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                    <div className="relative">
                      <div className="h-48 bg-gray-200 relative">
                        {post.images[0] && (
                          <Image
                            src={post.images[0]}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        )}
                        <div className="absolute top-2 left-2">
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleFavorite(post.id, e)}
                          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                        >
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">{post.title}</h3>
                        <p className="text-2xl font-bold text-blue-600 mb-2">{formatPrice(post.price)}</p>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{post.location}</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">All Listings</h2>
            <p className="text-gray-600">{posts.length} items found</p>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse different categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map(post => (
              <Link key={post.id} href={getPostUrl(post)}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gray-200 relative">
                      {post.images[0] && (
                        <Image
                          src={post.images[0]}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      )}
                      {post.isFeatured && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        </div>
                      )}
                      <button
                        onClick={(e) => handleFavorite(post.id, e)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                      >
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {getCategoryName(post.category, locale as any)}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{post.type}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">{post.title}</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-2">{formatPrice(post.price)}</p>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {post.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {post.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
