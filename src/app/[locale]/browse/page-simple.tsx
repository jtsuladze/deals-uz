'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { type Locale } from '../../../i18n';
import Header from '../../../components/Header';

export default function LocaleBrowsePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale as Locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Browse Items - Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p>This is a simplified browse page to test for errors.</p>
          <p>Current locale: {locale}</p>
        </div>
      </div>
    </div>
  );
}
