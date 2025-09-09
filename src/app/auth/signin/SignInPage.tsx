'use client';

import React, { useState, useEffect } from 'react';
import { userStore, UserCredentials } from '../../../userStore';
import { t, Locale } from '../../../i18n';
import LanguageSwitcher from '../../LanguageSwitcher';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SignInPageProps {
  locale: Locale;
}

export default function SignInPage({ locale }: SignInPageProps) {
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is already signed in
    const currentUser = userStore.getCurrentUser();
    if (currentUser) {
      router.push(`/${locale}`);
    }
  }, [locale, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await userStore.signIn(credentials);
    
    if (result.success) {
      setSuccess(t(locale, 'signInSuccess'));
      setTimeout(() => {
        router.push(`/${locale}`);
      }, 1000);
    } else {
      setError(result.error || t(locale, 'invalidCredentials'));
    }
    
    setLoading(false);
  };

  const handleChange = (field: keyof UserCredentials) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    setError('');
  };

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
          <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
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
          </Link>
          
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </header>

      {/* Sign In Form */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#333',
              margin: '0 0 0.5rem 0'
            }}>
              {t(locale, 'welcomeBack')}
            </h1>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              margin: 0
            }}>
              {t(locale, 'signInToPost')}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                {t(locale, 'email')}
              </label>
              <input
                type="email"
                value={credentials.email}
                onChange={handleChange('email')}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                {t(locale, 'password')}
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={handleChange('password')}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                padding: '0.75rem',
                backgroundColor: '#f8d7da',
                color: '#721c24',
                borderRadius: '8px',
                fontSize: '0.9rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div style={{
                padding: '0.75rem',
                backgroundColor: '#d4edda',
                color: '#155724',
                borderRadius: '8px',
                fontSize: '0.9rem',
                textAlign: 'center'
              }}>
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: loading ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#0056b3';
                  target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#007bff';
                  target.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? t(locale, 'loading') : t(locale, 'signIn')}
            </button>

            {/* Demo Credentials */}
            <div style={{
              padding: '1rem',
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: '#1976d2',
              textAlign: 'center'
            }}>
              <strong>Demo:</strong> demo@dealsuz.com / any password (6+ chars)
            </div>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>
                {t(locale, 'dontHaveAccount')}{' '}
              </span>
              <Link 
                href={`/${locale}/auth/signup`}
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                {t(locale, 'signUp')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
