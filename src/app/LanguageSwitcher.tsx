'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

// Define locales directly to avoid importing middleware on client
const locales = ['en', 'ru'] as const;

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();

  const languageNames = {
    en: '🇺🇸 EN',
    ru: '🇷🇺 RU'
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const currentPath = window.location.pathname;
    
    // Extract the path without the current locale
    const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}/, '') || '/';
    
    // Create new path with the selected locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    console.log('Language switch:', { currentPath, pathWithoutLocale, newPath, newLocale });
    
    // Use window.location for immediate navigation
    window.location.href = newPath;
  };

  return (
    <div style={{ position: 'relative' }}>
      <select 
        value={currentLocale} 
        onChange={handleChange}
        style={{
          appearance: 'none',
          backgroundColor: 'white',
          border: '2px solid #e9ecef',
          borderRadius: '25px',
          padding: '0.5rem 2.5rem 0.5rem 1rem',
          fontSize: '0.9rem',
          fontWeight: '500',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#007bff';
          e.target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.2)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e9ecef';
          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {languageNames[locale as keyof typeof languageNames]}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div style={{
        position: 'absolute',
        right: '0.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: '#666',
        fontSize: '0.8rem'
      }}>
        ▼
      </div>
    </div>
  );
}
