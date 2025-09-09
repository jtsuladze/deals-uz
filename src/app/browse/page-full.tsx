'use client';

import { t } from '../../i18n';
import React, { useState, useEffect } from 'react';
import type { Locale } from '../../i18n';
import { getItems, getFeaturedItems, type Item } from '../../itemsStore';

export default function BrowseItems({ locale }: { locale: Locale }) {
  const [items, setItems] = useState<Item[]>([]);
  const [featuredItems, setFeaturedItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Electronics', 'Vehicles', 'Real Estate', 'Fashion', 'Home & Garden', 'Services'];

  useEffect(() => {
    console.log('Loading items from store...');
    try {
      const itemList = getItems();
      const featured = getFeaturedItems();
      console.log('Items loaded:', itemList.length, 'Featured:', featured.length);
      if (itemList.length > 0) {
        console.log('First item:', itemList[0]);
      }
      setItems(itemList);
      setFeaturedItems(featured);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  console.log('Render - loading:', loading, 'items:', items.length, 'filtered:', filteredItems.length);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '15px',
        marginBottom: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          margin: '0 0 1rem 0',
          fontWeight: '700'
        }}>
          Browse Items
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          margin: 0,
          opacity: 0.9
        }}>
          Find great deals in your area
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>Filter by Category:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '20px',
                backgroundColor: selectedCategory === category ? '#007bff' : '#e9ecef',
                color: selectedCategory === category ? 'white' : '#333',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '1.5rem',
            color: '#333'
          }}>
            Featured Items
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {featuredItems.map((item) => (
              <div key={item.id} style={{ 
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.25rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                border: '2px solid #ffd700'
              }}>
                <div style={{
                  backgroundColor: '#ffd700',
                  color: '#333',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}>
                  FEATURED
                </div>
                
                {item.imageUrl && (
                  <div style={{ 
                    height: '200px',
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}></div>
                )}
                
                <h3 style={{ 
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  {item.title}
                </h3>
                
                <p style={{ 
                  margin: '0.5rem 0',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  {item.description}
                </p>
                
                <div style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 'bold', 
                  color: '#007bff',
                  margin: '1rem 0'
                }}>
                  {item.price.toLocaleString()} UZS
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  <span>📍 {item.location}</span>
                  <span style={{ 
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '10px',
                    fontSize: '0.8rem'
                  }}>
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Items */}
      <section>
        <h2 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '1.5rem',
          color: '#333'
        }}>
          All Items ({filteredItems.length})
        </h2>
        
        {filteredItems.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              No items found in this category. Be the first to post!
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredItems.map((item) => (
              <div key={item.id} style={{ 
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '1.25rem',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}>
                {item.imageUrl && (
                  <div style={{ 
                    height: '180px',
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}></div>
                )}
                
                <h3 style={{ 
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  {item.title}
                </h3>
                
                <p style={{ 
                  margin: '0.5rem 0',
                  color: '#666',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}>
                  {item.description.length > 100 
                    ? item.description.substring(0, 100) + '...' 
                    : item.description}
                </p>
                
                <div style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#007bff',
                  margin: '0.75rem 0'
                }}>
                  {item.price.toLocaleString()} UZS
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#888'
                }}>
                  <span>📍 {item.location}</span>
                  <span>{item.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
