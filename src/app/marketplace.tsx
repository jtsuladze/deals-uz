'use client';

import { t, Locale } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';
import AuthStatus from './AuthStatus';
import { dataStore } from '../stores/dataStore';
import { useState, useEffect } from 'react';
import { Post } from '../types';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import { getCategoryName } from '../data/categories';

// Utility functions to match browse page
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

const getCategoryDisplayName = (category: string, locale: Locale) => {
  try {
    return getCategoryName(category, locale);
  } catch (error) {
    console.warn('Error getting category name for:', category, error);
    return category;
  }
};

export default function Marketplace({ locale }: { locale: Locale }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Load posts from dataStore
    const allPosts = dataStore.getAllPosts();
    // Show maximum 20 posts (4 columns × 5 rows)
    setPosts(allPosts.slice(0, 20));
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🏪 DealsUZ
            </div>
            <span style={{ 
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '500'
            }}>
              Beta
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageSwitcher currentLocale={locale} />
            <AuthStatus />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            margin: '0 0 1rem 0',
            fontWeight: '700',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            lineHeight: '1.2'
          }}>
            {t(locale, 'title')}
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            margin: '0 0 2rem 0',
            opacity: '0.9',
            lineHeight: '1.5'
          }}>
            {t(locale, 'trustedMarketplace')}
          </p>
          
          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a 
              href={`/${locale}/post`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
              }}
            >
              📝 {t(locale, 'postItem')}
            </a>
            
            <Link 
              href={`/${locale}/browse`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = 'rgba(255,255,255,0.3)';
                target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                target.style.transform = 'translateY(0)';
              }}
            >
              🔍 Browse Items
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Listings Section */}
      <section style={{
        padding: '4rem 2rem',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            color: '#333',
            fontWeight: '700'
          }}>
            Latest Listings
          </h2>
          
          {/* Listings Grid - Identical to Browse Page */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" style={{ marginBottom: '3rem' }}>
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
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 h-10 flex items-start overflow-hidden" title={post.title}>
                      {post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden" title={post.description}>
                      {post.description.length > 100 ? post.description.substring(0, 100) + '...' : post.description}
                    </p>
                    
                    <div className="text-lg font-bold text-green-600 mb-2">
                      ${formatPrice(post.price)}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="truncate max-w-24" title={post.location}>📍 {post.location.length > 12 ? post.location.substring(0, 12) + '...' : post.location}</span>
                      <span className="truncate max-w-20" title={getCategoryDisplayName(post.category, locale)}>{getCategoryDisplayName(post.category, locale)}</span>
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
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No listings yet</h3>
              <p>Be the first to post an item!</p>
            </div>
          )}
          
          {/* See More Button */}
          {posts.length > 0 && (
            <div style={{ textAlign: 'center' }}>
              <Link
                href={`/${locale}/browse`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(0, 112, 243, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = 'rgb(0,81,204)';
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 6px 20px rgba(0, 112, 243, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#0070f3';
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 4px 15px rgba(0, 112, 243, 0.3)';
                }}
              >
                🔍 See More
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{
        padding: '4rem 2rem',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            color: '#333',
            fontWeight: '700'
          }}>
            {t(locale, 'whyChoose')}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              borderRadius: '20px',
              backgroundColor: 'white',
              border: '1px solid #e9ecef',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                marginBottom: '1rem',
                color: '#333',
                fontWeight: '600'
              }}>
                {t(locale, 'multilingualSupport')}
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                {t(locale, 'multilingualDesc')}
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              borderRadius: '20px',
              backgroundColor: 'white',
              border: '1px solid #e9ecef',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                marginBottom: '1rem',
                color: '#333',
                fontWeight: '600'
              }}>
                {t(locale, 'safeSecure')}
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                {t(locale, 'safeSecureDesc')}
              </p>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              borderRadius: '20px',
              backgroundColor: 'white',
              border: '1px solid #e9ecef',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                marginBottom: '1rem',
                color: '#333',
                fontWeight: '600'
              }}>
                {t(locale, 'fastEasy')}
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                {t(locale, 'fastEasyDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            margin: '0 0 1rem 0',
            fontWeight: '700'
          }}>
            {t(locale, 'readyToStart')}
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            margin: '0 0 2rem 0',
            opacity: '0.9'
          }}>
            {t(locale, 'joinThousands')}
          </p>
          
          <Link 
            href={`/${locale}/browse`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              backgroundColor: 'white',
              color: '#28a745',
              textDecoration: 'none',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 6px 20px rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 4px 15px rgba(255,255,255,0.3)';
            }}
          >
            🚀 Browse Items
          </Link>
        </div>
      </section>
      
      <Footer locale={locale} />
    </div>
  );
}
