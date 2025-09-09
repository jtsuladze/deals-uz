'use client';

import { t } from '../../i18n';
import React, { useState, useEffect } from 'react';
import type { Locale } from '../../i18n';

// Simple hardcoded items for testing
const testItems = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    price: 15000000,
    location: 'Tashkent',
    category: 'Electronics'
  },
  {
    id: '2',
    title: 'Toyota Camry 2020',
    price: 280000000,
    location: 'Samarkand',
    category: 'Vehicles'
  }
];

export default function BrowseTest({ locale }: { locale: Locale }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Test component loading...');
    setTimeout(() => {
      console.log('Setting test items...');
      setItems(testItems);
      setLoading(false);
      console.log('Loading completed');
    }, 1000);
  }, []);

  console.log('Render state - loading:', loading, 'items count:', items.length);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Browse Items - Test Version</h1>
      <p>Items found: {items.length}</p>
      
      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        {items.map((item) => (
          <div key={item.id} style={{ 
            border: '1px solid #ccc', 
            padding: '1rem', 
            borderRadius: '8px',
            backgroundColor: 'white'
          }}>
            <h3>{item.title}</h3>
            <p>Price: {item.price.toLocaleString()} UZS</p>
            <p>Location: {item.location}</p>
            <p>Category: {item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
