'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { dataStore } from '@/stores/dataStore'
import Header from '../../../components/Header'
import { Locale } from '../../../i18n'
import { 
  User, 
  Edit, 
  Settings, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  ShoppingBag,
  Heart,
  MessageCircle,
  Eye,
  Shield,
  Award
} from 'lucide-react'

export default function ProfilePage() {
  const params = useParams()
  const locale = params.locale as string
  
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'reviews' | 'settings'>('overview')

  // Mock user data - in a real app this would come from authentication
  const user = {
    id: 'current_user',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+998 90 123 45 67',
    location: 'Tashkent, Uzbekistan',
    joinedDate: new Date('2023-06-15'),
    avatar: null,
    rating: 4.8,
    reviewCount: 127,
    isVerified: true,
    bio: 'Experienced seller with a passion for technology and gadgets. I offer quality products with reliable service.'
  }

  const userPosts = dataStore.getPostsByUser(user.id)
  const userFavorites = dataStore.getFavoritePostsByUser(user.id)
  const totalViews = userPosts.reduce((sum, post) => sum + post.views, 0)

  const stats = [
    { label: 'Active Listings', value: userPosts.length, icon: ShoppingBag },
    { label: 'Total Views', value: totalViews, icon: Eye },
    { label: 'Favorites', value: userFavorites.length, icon: Heart },
    { label: 'Rating', value: user.rating, icon: Star },
  ]

  const achievements = [
    { title: 'Verified Seller', description: 'Identity verified', icon: Shield, color: 'text-green-600' },
    { title: 'Top Rated', description: '4.8+ rating', icon: Award, color: 'text-yellow-600' },
    { title: 'Quick Responder', description: 'Responds within 1 hour', icon: MessageCircle, color: 'text-blue-600' },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'listings', label: 'My Listings', icon: ShoppingBag },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale as Locale} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-16 w-16 text-gray-600" />
              </div>
              {user.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full">
                  <Shield className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                {user.isVerified && (
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {user.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Joined {user.joinedDate.toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                  {user.rating} ({user.reviewCount} reviews)
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
              </div>

              <p className="text-gray-700 mb-6">{user.bio}</p>

              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                <Icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Icon className={`h-6 w-6 ${achievement.color}`} />
                  <div>
                    <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <ShoppingBag className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Listed a new item: iPhone 15 Pro Max</span>
                      <span className="text-sm text-gray-500 ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <span className="text-gray-700">Received a 5-star review</span>
                      <span className="text-sm text-gray-500 ml-auto">1 day ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">Responded to 3 messages</span>
                      <span className="text-sm text-gray-500 ml-auto">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'listings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">My Listings ({userPosts.length})</h3>
                  <Link
                    href={`/${locale}/post/create`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add New Listing
                  </Link>
                </div>
                
                {userPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                    <p className="text-gray-600 mb-6">Start selling by creating your first listing.</p>
                    <Link
                      href={`/${locale}/post/create`}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Listing
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/${locale}/post/${post.id}`}
                        className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        <div className="aspect-video bg-gray-200 relative">
                          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-medium">
                            {post.status}
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900 mb-2 line-clamp-1">{post.title}</h4>
                          <p className="text-lg font-bold text-green-600 mb-2">${post.price}</p>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{post.views} views</span>
                            <span>{post.createdAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {/* Mock reviews */}
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">Anonymous User</h4>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">
                            Great seller! Item was exactly as described and shipped quickly. 
                            Would definitely buy from again.
                          </p>
                          <p className="text-sm text-gray-500">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive updates about your listings and messages</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded toggle">Enabled</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                        <p className="text-sm text-gray-600">Get text messages for important updates</p>
                      </div>
                      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded toggle">Disabled</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Public Profile</h4>
                        <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded toggle">Public</button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      Change Password
                    </button>
                    <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      Two-Factor Authentication
                    </button>
                    <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      Download My Data
                    </button>
                    <button className="w-full text-left p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
