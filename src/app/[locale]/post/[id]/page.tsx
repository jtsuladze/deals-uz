'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { dataStore } from '@/stores/dataStore'
import { Post, Message } from '@/types'
import { 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  User, 
  Star, 
  Phone, 
  MessageCircle, 
  ChevronLeft,
  Camera,
  Shield,
  Tag,
  Calendar
} from 'lucide-react'

export default function PostDetail() {
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string
  const postId = params.id as string
  
  const [post, setPost] = useState<Post | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const foundPost = dataStore.getPostById(postId)
    
    if (foundPost) {
      setPost(foundPost)
      setIsFavorite(dataStore.isFavorite(postId))
    }
    setIsLoading(false)
  }, [postId])

  const handleFavoriteToggle = () => {
    if (!post) return
    
    if (isFavorite) {
      dataStore.removeFavorite(post.id)
    } else {
      dataStore.addFavorite(post.id)
    }
    setIsFavorite(!isFavorite)
  }

  const handleContactSeller = () => {
    setShowContactForm(true)
  }

  const handleSendMessage = () => {
    if (!post || !message.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId: `conv_${Date.now()}`,
      senderId: 'current_user',
      receiverId: post.userId,
      content: message.trim(),
      createdAt: new Date(),
      isRead: false,
      type: 'text'
    }
    
    dataStore.sendMessage(newMessage)
    setMessage('')
    setShowContactForm(false)
    
    // Show success notification
    alert('Message sent successfully!')
  }

  const handleShare = async () => {
    if (!post) return
    
    const shareData = {
      title: post.title,
      text: post.description,
      url: window.location.href
    }
    
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link href={`/${locale}/marketplace`} className="text-blue-600 hover:text-blue-700">
            Back to marketplace
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                    : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative aspect-video bg-gray-200">
                <Image
                  src={post.images[currentImageIndex]}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                
                {post.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === 0 ? post.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === post.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                    >
                      <ChevronLeft className="h-5 w-5 transform rotate-180" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {post.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm flex items-center">
                    <Camera className="h-4 w-4 mr-1" />
                    {currentImageIndex + 1} / {post.images.length}
                  </span>
                </div>
              </div>
              
              {/* Thumbnail Navigation */}
              {post.images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {post.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${post.title} ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {post.description}
              </p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Title */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
                  <p className="text-3xl font-bold text-green-600">{formatPrice(post.price)}</p>
                </div>
                {post.isFeatured && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </span>
                )}
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {post.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Posted {formatDate(post.createdAt)}
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Post ID: #{post.id}
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Seller Information
              </h3>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.userName}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8 (127 reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleContactSeller}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send Message
                </button>
                
                <button
                  onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {showPhoneNumber ? '+1 (555) 123-4567' : 'Show Phone Number'}
                </button>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Safety Tips
              </h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Meet in a public place</li>
                <li>• Inspect the item before payment</li>
                <li>• Don't share personal information</li>
                <li>• Trust your instincts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Message to Seller</h3>
            
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi, I'm interested in your item..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => setShowContactForm(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
