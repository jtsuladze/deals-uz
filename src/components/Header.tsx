'use client';

import { Locale } from '../i18n';
import LanguageSwitcher from '../app/LanguageSwitcher';
import AuthStatus from '../app/AuthStatus';
import Link from 'next/link';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  return (
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
          <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer'
            }}>
              🏪 DealsUZ
            </div>
          </Link>
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
  );
}
