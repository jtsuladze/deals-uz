'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { dataStore } from '@/stores/dataStore'
import { Post } from '@/types'
import { Heart, MapPin, Clock, Search, Filter, SortAsc } from 'lucide-react'

export default function FavoritesPage() {
  const params = useParams()
  const locale = params.locale as string
  
  const [favorites, setFavorites] = useState<Post[]>([])
  const [filteredFavorites, setFilteredFavorites] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'title'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const userFavorites = dataStore.getFavoritePostsByUser('current_user')
    setFavorites(userFavorites)
    setFilteredFavorites(userFavorites)
  }, [])

  useEffect(() => {
    let filtered = favorites.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case 'date':
          aValue = a.createdAt.getTime()
          bValue = b.createdAt.getTime()
          break
        case 'price':
          aValue = a.price
          bValue = b.price
          break
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        default:
          return 0
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredFavorites(filtered)
  }, [favorites, searchQuery, selectedCategory, sortBy, sortOrder])

  const handleRemoveFromFavorites = (postId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    dataStore.removeFavorite(postId)
    const updatedFavorites = favorites.filter(post => post.id !== postId)
    setFavorites(updatedFavorites)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    )
  }

  const categories = Array.from(new Set(favorites.map(post => post.category)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Heart className="h-8 w-8 text-red-500 mr-3 fill-current" />
                  My Favorites
                </h1>
                <p className="text-gray-600 mt-1">
                  {favorites.length} saved {favorites.length === 1 ? 'item' : 'items'}
                </p>
              </div>
              
              <Link
                href={`/${locale}/marketplace`}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No favorites yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start browsing the marketplace and save items you're interested in by clicking the heart icon.
            </p>
            <Link
              href={`/${locale}/marketplace`}
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Marketplace
            </Link>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search favorites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div className="relative">
                  <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'title')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="price">Sort by Price</option>
                    <option value="title">Sort by Title</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredFavorites.length} of {favorites.length} favorites
              </p>
            </div>

            {/* Favorites Grid */}
            {filteredFavorites.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No favorites match your current filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFavorites.map((post) => (
                  <Link
                    key={post.id}
                    href={`/${locale}/post/${post.id}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="relative aspect-video bg-gray-200">
                      <Image
                        src={post.images[0]}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      <button
                        onClick={(e) => handleRemoveFromFavorites(post.id, e)}
                        className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 text-red-500 rounded-full hover:bg-red-50 transition-colors"
                        title="Remove from favorites"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </button>
                      
                      {post.isFeatured && (
                        <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-2xl font-bold text-green-600 mb-3">
                        {formatPrice(post.price)}
                      </p>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{post.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
