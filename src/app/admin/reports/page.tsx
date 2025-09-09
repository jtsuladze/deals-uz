'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userStore, User } from '../../../userStore';
import Link from 'next/link';

interface Analytics {
  totalPosts: number;
  activePosts: number;
  pendingPosts: number;
  rejectedPosts: number;
  soldPosts: number;
  totalRevenue: number;
  avgPostPrice: number;
  postsThisMonth: number;
  usersThisMonth: number;
  topCategories: { name: string; count: number; percentage: number; }[];
  topLocations: { name: string; count: number; percentage: number; }[];
  userActivity: { date: string; signups: number; posts: number; }[];
}

export default function AdminReports() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<'overview' | 'users' | 'posts' | 'revenue'>('overview');
  const router = useRouter();

  // Demo analytics data
  const demoAnalytics: Analytics = {
    totalPosts: 156,
    activePosts: 89,
    pendingPosts: 23,
    rejectedPosts: 12,
    soldPosts: 32,
    totalRevenue: 45600,
    avgPostPrice: 292,
    postsThisMonth: 47,
    usersThisMonth: 18,
    topCategories: [
      { name: 'Electronics', count: 45, percentage: 29 },
      { name: 'Vehicles', count: 32, percentage: 21 },
      { name: 'Home & Garden', count: 28, percentage: 18 },
      { name: 'Services', count: 24, percentage: 15 },
      { name: 'Fashion', count: 18, percentage: 12 },
      { name: 'Other', count: 9, percentage: 6 }
    ],
    topLocations: [
      { name: 'Tashkent', count: 78, percentage: 50 },
      { name: 'Samarkand', count: 31, percentage: 20 },
      { name: 'Bukhara', count: 19, percentage: 12 },
      { name: 'Andijan', count: 15, percentage: 10 },
      { name: 'Namangan', count: 8, percentage: 5 },
      { name: 'Other', count: 5, percentage: 3 }
    ],
    userActivity: [
      { date: '2024-11-01', signups: 3, posts: 8 },
      { date: '2024-11-02', signups: 5, posts: 12 },
      { date: '2024-11-03', signups: 2, posts: 6 },
      { date: '2024-11-04', signups: 4, posts: 15 },
      { date: '2024-11-05', signups: 7, posts: 18 },
      { date: '2024-11-06', signups: 3, posts: 9 },
      { date: '2024-11-07', signups: 6, posts: 14 }
    ]
  };

  useEffect(() => {
    const unsubscribe = userStore.subscribe((user) => {
      setCurrentUser(user);
      if (!user || user.role !== 'admin') {
        router.push('/auth/signin');
        return;
      }
      setAnalytics(demoAnalytics);
      setIsLoading(false);
    });

    // Initialize from storage
    userStore.initializeFromStorage();
    const user = userStore.getCurrentUser();
    
    if (!user || user.role !== 'admin') {
      router.push('/auth/signin');
      return;
    }

    setAnalytics(demoAnalytics);

    return unsubscribe;
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'admin' || !analytics) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/admin" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600">System insights and performance metrics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'users', label: 'User Analytics' },
                { key: 'posts', label: 'Post Analytics' },
                { key: 'revenue', label: 'Revenue' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedReport(tab.key as any)}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    selectedReport === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Report */}
        {selectedReport === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Posts</p>
                    <p className="text-2xl font-semibold text-gray-900">{analytics.totalPosts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Posts</p>
                    <p className="text-2xl font-semibold text-gray-900">{analytics.activePosts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-2xl font-semibold text-gray-900">{analytics.pendingPosts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                    <p className="text-2xl font-semibold text-gray-900">${analytics.avgPostPrice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Categories */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Categories</h3>
                <div className="space-y-3">
                  {analytics.topCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{category.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Locations */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Locations</h3>
                <div className="space-y-3">
                  {analytics.topLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{location.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{location.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Analytics */}
        {selectedReport === 'users' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{analytics.usersThisMonth}</div>
                <div className="text-sm text-gray-600">New Users This Month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">87%</div>
                <div className="text-sm text-gray-600">User Retention Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">2.3</div>
                <div className="text-sm text-gray-600">Avg. Posts per User</div>
              </div>
            </div>
          </div>
        )}

        {/* Post Analytics */}
        {selectedReport === 'posts' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Post Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{analytics.postsThisMonth}</div>
                <div className="text-sm text-gray-600">Posts This Month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{analytics.activePosts}</div>
                <div className="text-sm text-gray-600">Active Posts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{analytics.pendingPosts}</div>
                <div className="text-sm text-gray-600">Pending Review</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{analytics.rejectedPosts}</div>
                <div className="text-sm text-gray-600">Rejected Posts</div>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Analytics */}
        {selectedReport === 'revenue' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">${analytics.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Platform Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">${analytics.avgPostPrice}</div>
                <div className="text-sm text-gray-600">Average Post Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{analytics.soldPosts}</div>
                <div className="text-sm text-gray-600">Items Sold</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
