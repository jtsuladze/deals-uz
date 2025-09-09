'use client';

import { useState, useEffect } from 'react';

interface Listing {
  id: string;
  title_en: string;
  title_ru?: string;
  title_uz?: string;
  description_en: string;
  price: number;
  currency: string;
  condition: string;
  location: string;
  views: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: {
    id: string;
    name_en: string;
    name_ru?: string;
    name_uz?: string;
    slug: string;
    icon?: string;
  };
  images: {
    id: string;
    url: string;
    alt?: string;
    order: number;
  }[];
  _count: {
    favorites: number;
    reviews: number;
  };
}

interface Category {
  id: string;
  name_en: string;
  name_ru?: string;
  name_uz?: string;
  slug: string;
  icon?: string;
  _count: {
    listings: number;
  };
}

export default function DatabaseTestPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingsRes, categoriesRes] = await Promise.all([
          fetch('/api/listings'),
          fetch('/api/categories')
        ]);

        if (!listingsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const listingsData = await listingsRes.json();
        const categoriesData = await categoriesRes.json();

        setListings(listingsData.listings);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Loading database data...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <h1>Error: {error}</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>
        🗄️ Database Test - Real Data from SQLite
      </h1>

      {/* Categories Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#555' }}>
          📂 Categories ({categories.length})
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem' 
        }}>
          {categories.map((category) => (
            <div
              key={category.id}
              style={{
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {category.icon} {category.name_en}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                {category._count.listings} listings
              </div>
              <div style={{ fontSize: '0.8rem', color: '#888' }}>
                Slug: {category.slug}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Listings Section */}
      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#555' }}>
          📋 Listings ({listings.length})
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {listings.map((listing) => (
            <div
              key={listing.id}
              style={{
                padding: '1.5rem',
                border: '1px solid #ddd',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#333' }}>
                {listing.title_en}
              </h3>
              
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ 
                  backgroundColor: listing.category.icon ? '#e7f3ff' : '#f0f0f0',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  {listing.category.icon} {listing.category.name_en}
                </span>
              </div>

              <p style={{ 
                fontSize: '0.9rem', 
                color: '#666', 
                marginBottom: '1rem',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {listing.description_en}
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2563eb' }}>
                  {listing.price.toLocaleString()} {listing.currency}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  Condition: {listing.condition}
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem' }}>
                📍 {listing.location}
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #eee'
              }}>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  By {listing.user.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  👀 {listing.views} • ❤️ {listing._count.favorites}
                </div>
              </div>

              {listing.images.length > 0 && (
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                  📸 {listing.images.length} image(s)
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {listings.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          No listings found. The database might be empty.
        </div>
      )}
    </div>
  );
}
