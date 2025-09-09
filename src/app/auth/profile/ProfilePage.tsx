'use client';

import React, { useState, useEffect } from 'react';
import { userStore, User } from '../../../userStore';
import { t, Locale } from '../../../i18n';
import LanguageSwitcher from '../../LanguageSwitcher';
import LocationPicker from '../../components/LocationPicker';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProfilePageProps {
  locale: Locale;
}

export default function ProfilePage({ locale }: ProfilePageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = userStore.getCurrentUser();
    if (!currentUser) {
      router.push(`/${locale}/auth/signin`);
      return;
    }
    
    setUser(currentUser);
    setFormData({
      name: currentUser.name,
      phone: currentUser.phone,
      location: currentUser.location,
      bio: currentUser.bio || '',
      preferredLanguage: currentUser.preferredLanguage
    });

    const unsubscribe = userStore.subscribe((updatedUser) => {
      setUser(updatedUser);
      if (updatedUser) {
        setFormData({
          name: updatedUser.name,
          phone: updatedUser.phone,
          location: updatedUser.location,
          bio: updatedUser.bio || '',
          preferredLanguage: updatedUser.preferredLanguage
        });
      }
    });

    return unsubscribe;
  }, [locale, router]);

  const handleSignOut = () => {
    userStore.signOut();
    router.push(`/${locale}`);
  };

  const handleEdit = () => {
    setEditing(true);
    setSuccess('');
    setError('');
  };

  const handleCancel = () => {
    setEditing(false);
    if (user) {
      setFormData({
        name: user.name,
        phone: user.phone,
        location: user.location,
        bio: user.bio || '',
        preferredLanguage: user.preferredLanguage
      });
    }
    setError('');
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await userStore.updateProfile(formData);
    
    if (result.success) {
      setSuccess(t(locale, 'profileUpdated'));
      setEditing(false);
    } else {
      setError(result.error || 'Failed to update profile');
    }
    
    setLoading(false);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.2rem'
      }}>
        {t(locale, 'loading')}
      </div>
    );
  }

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
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={handleSignOut}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = '#c82333';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = '#dc3545';
              }}
            >
              {t(locale, 'signOut')}
            </button>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          {/* Profile Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            paddingBottom: '2rem',
            borderBottom: '2px solid #e9ecef'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#007bff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#333',
                  margin: '0 0 0.5rem 0'
                }}>
                  {user.name}
                </h1>
                <p style={{
                  color: '#666',
                  fontSize: '1rem',
                  margin: 0
                }}>
                  {t(locale, 'memberSince')} {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {!editing && (
              <button
                onClick={handleEdit}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#0056b3';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#007bff';
                }}
              >
                {t(locale, 'editProfile')}
              </button>
            )}
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: '8px',
              fontSize: '0.9rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              {success}
            </div>
          )}

          {error && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              borderRadius: '8px',
              fontSize: '0.9rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              {error}
            </div>
          )}

          {/* Profile Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Name */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                {t(locale, 'name')}
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={handleChange('name')}
                disabled={!editing}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                  fontFamily: 'inherit',
                  backgroundColor: editing ? 'white' : '#f8f9fa',
                  cursor: editing ? 'text' : 'not-allowed'
                }}
                onFocus={(e) => editing && (e.target.style.borderColor = '#007bff')}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>

            {/* Email (readonly) */}
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
                value={user.email}
                disabled
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  backgroundColor: '#f8f9fa',
                  cursor: 'not-allowed',
                  color: '#666'
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                {t(locale, 'phone')}
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={handleChange('phone')}
                disabled={!editing}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                  fontFamily: 'inherit',
                  backgroundColor: editing ? 'white' : '#f8f9fa',
                  cursor: editing ? 'text' : 'not-allowed'
                }}
                onFocus={(e) => editing && (e.target.style.borderColor = '#007bff')}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>

            {/* Location */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                {t(locale, 'location')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={formData.location || ''}
                  onClick={() => editing && setShowLocationPicker(true)}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    outline: 'none',
                    fontFamily: 'inherit',
                    backgroundColor: editing ? 'white' : '#f8f9fa',
                    cursor: editing ? 'pointer' : 'not-allowed'
                  }}
                  onFocus={(e) => editing && (e.target.style.borderColor = '#007bff')}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  placeholder={editing ? "Click to choose location" : ""}
                />
                {editing && (
                  <div style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    fontSize: '0.8rem',
                    color: '#666'
                  }}>
                    📍
                  </div>
                )}
              </div>
            </div>

            {/* Preferred Language */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                {t(locale, 'preferredLanguage')}
              </label>
              <select
                value={formData.preferredLanguage || 'en'}
                onChange={handleChange('preferredLanguage')}
                disabled={!editing}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                  fontFamily: 'inherit',
                  backgroundColor: editing ? 'white' : '#f8f9fa',
                  cursor: editing ? 'pointer' : 'not-allowed'
                }}
                onFocus={(e) => editing && (e.target.style.borderColor = '#007bff')}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              >
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>

            {/* Bio */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                {t(locale, 'bio')}
              </label>
              <textarea
                value={formData.bio || ''}
                onChange={handleChange('bio')}
                disabled={!editing}
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e9ecef',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                  fontFamily: 'inherit',
                  backgroundColor: editing ? 'white' : '#f8f9fa',
                  cursor: editing ? 'text' : 'not-allowed',
                  resize: 'vertical'
                }}
                onFocus={(e) => editing && (e.target.style.borderColor = '#007bff')}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                placeholder={editing ? "Tell others about yourself..." : ""}
              />
            </div>

            {/* Edit Buttons */}
            {editing && (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = '#5a6268';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = '#6c757d';
                  }}
                >
                  {t(locale, 'cancel')}
                </button>
                
                <button
                  onClick={handleSave}
                  disabled={loading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: loading ? '#6c757d' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      const target = e.target as HTMLElement;
                      target.style.backgroundColor = '#218838';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      const target = e.target as HTMLElement;
                      target.style.backgroundColor = '#28a745';
                    }
                  }}
                >
                  {loading ? t(locale, 'loading') : t(locale, 'saveChanges')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Picker */}
      <LocationPicker
        isOpen={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onSelect={(location) => {
          setFormData(prev => ({ ...prev, location }));
        }}
        selectedLocation={formData.location || ''}
      />
    </div>
  );
}
