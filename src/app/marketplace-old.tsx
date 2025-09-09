'use client';

import { t, Locale } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';
import AuthStatus from './AuthStatus';

export default function Marketplace({ locale }: { locale: Locale }) {
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
            
            <a 
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
              🔍 {t(locale, 'browse')}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef'
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
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef'
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
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef'
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
          
          <a 
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
            🚀 {t(locale, 'exploreMarketplace')}
          </a>
        </div>
      </section>
    </div>
  );
}
