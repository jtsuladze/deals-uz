'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { userStore, User } from '../../../../userStore';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  type: 'item' | 'service';
  location: string;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: Date;
  status: 'active' | 'pending' | 'rejected' | 'sold';
  images?: string[];
}

export default function AdminPosts() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'item' | 'service'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'rejected' | 'sold'>('all');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string || 'en';

  // Demo posts data
  const demoPosts: Post[] = [
    {
      id: '1',
      title: 'iPhone 14 Pro Max',
      description: 'Excellent condition, barely used. Comes with original box and charger.',
      price: 1200,
      category: 'Electronics',
      type: 'item',
      location: 'Tashkent',
      userId: '1',
      userName: 'Demo User',
      userEmail: 'demo@dealsuz.com',
      createdAt: new Date('2024-12-01'),
      status: 'active'
    },
    {
      id: '2',
      title: 'Web Development Services',
      description: 'Professional web development using React, Next.js, and modern technologies.',
      price: 500,
      category: 'Technology',
      type: 'service',
      location: 'Samarkand',
      userId: '2',
      userName: 'Aziz Karimov',
      userEmail: 'user@example.com',
      createdAt: new Date('2024-11-28'),
      status: 'active'
    },
    {
      id: '3',
      title: 'MacBook Air M2',
      description: 'Brand new MacBook Air with M2 chip, 8GB RAM, 256GB SSD.',
      price: 1000,
      category: 'Electronics',
      type: 'item',
      location: 'Bukhara',
      userId: '1',
      userName: 'Demo User',
      userEmail: 'demo@dealsuz.com',
      createdAt: new Date('2024-11-25'),
      status: 'pending'
    },
    {
      id: '4',
      title: 'Photography Services',
      description: 'Professional event and portrait photography. Wedding packages available.',
      price: 200,
      category: 'Services',
      type: 'service',
      location: 'Tashkent',
      userId: '2',
      userName: 'Aziz Karimov',
      userEmail: 'user@example.com',
      createdAt: new Date('2024-11-20'),
      status: 'rejected'
    }
  ];

  useEffect(() => {
    const unsubscribe = userStore.subscribe((user) => {
      setCurrentUser(user);
      if (!user || user.role !== 'admin') {
        router.push(`/${locale}/auth/signin`);
        return;
      }
      setPosts(demoPosts);
      setIsLoading(false);
    });

    // Initialize from storage
    userStore.initializeFromStorage();
    const user = userStore.getCurrentUser();
    
    if (!user || user.role !== 'admin') {
      router.push(`/${locale}/auth/signin`);
      return;
    }

    setPosts(demoPosts);

    return unsubscribe;
  }, [router, locale]);

  const handleUpdateStatus = (postId: string, status: 'active' | 'pending' | 'rejected' | 'sold') => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, status } : post
      )
    );
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || post.type === filterType;
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href={`/${locale}/admin`} className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
              <p className="text-gray-600">Review and moderate user posts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Posts</label>
              <input
                type="text"
                placeholder="Search by title, description, or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'item' | 'service')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="item">Items</option>
                <option value="service">Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'pending' | 'rejected' | 'sold')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600">by {post.userName}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">{post.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div>
                    <span className="font-medium">Price:</span> ${post.price}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {post.type}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span> {post.category}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {post.location}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Posted:</span> {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Update Status</label>
                      <select
                        value={post.status}
                        onChange={(e) => handleUpdateStatus(post.id, e.target.value as any)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="rejected">Rejected</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">No posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
