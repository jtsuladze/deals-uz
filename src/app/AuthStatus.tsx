'use client';

import React, { useState, useEffect } from 'react';
import { userStore, User } from '../userStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  
  // Extract locale from pathname
  const locale = pathname?.split('/')[1] || 'en';

  useEffect(() => {
    // Initialize user state
    const currentUser = userStore.getCurrentUser();
    setUser(currentUser);

    // Subscribe to user changes
    const unsubscribe = userStore.subscribe((updatedUser) => {
      setUser(updatedUser);
    });

    // Add click-away listener for dropdown
    const handleClickAway = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown-container]')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickAway);
    }

    return () => {
      unsubscribe();
      document.removeEventListener('click', handleClickAway);
    };
  }, [showDropdown]);

  const handleSignOut = () => {
    userStore.signOut();
    setShowDropdown(false);
  };

  if (user) {
    return (
      <div style={{ position: 'relative' }} data-dropdown-container>
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '0.9rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(40,167,69,0.3)'
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = '#218838';
            target.style.transform = 'translateY(-1px)';
            target.style.boxShadow = '0 4px 12px rgba(40,167,69,0.4)';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = '#28a745';
            target.style.transform = 'translateY(0)';
            target.style.boxShadow = '0 2px 8px rgba(40,167,69,0.3)';
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 'bold'
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          {user.name.split(' ')[0]}
          <span style={{ fontSize: '0.7rem' }}>▼</span>
        </button>
        
        {showDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            border: '1px solid #e9ecef',
            minWidth: '200px',
            zIndex: 1000
          }}>
            <div style={{
              padding: '1rem',
              borderBottom: '1px solid #e9ecef'
            }}>
              <div style={{
                fontWeight: '600',
                color: '#333',
                marginBottom: '0.25rem'
              }}>
                {user.name}
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: '#666'
              }}>
                {user.email}
              </div>
            </div>
            
            <div style={{ padding: '0.5rem' }}>
              <Link
                href={`/${locale}/profile`}
                style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#333',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#f8f9fa';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = 'transparent';
                }}
                onClick={() => setShowDropdown(false)}
              >
                👤 Profile
              </Link>
              
              <Link
                href={`/${locale}/my-listings`}
                style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#333',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#f8f9fa';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = 'transparent';
                }}
                onClick={() => setShowDropdown(false)}
              >
                📋 My Listings
              </Link>

              {user.role === 'admin' && (
                <Link
                  href={`/${locale}/admin`}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: '#333',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => setShowDropdown(false)}
                >
                  ⚙️ Admin Panel
                </Link>
              )}
              
              <button
                onClick={handleSignOut}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'transparent',
                  color: '#dc3545',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#f8f9fa';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = 'transparent';
                }}
              >
                🚪 Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link 
      href={`/${locale}/auth/signin`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '25px',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0,123,255,0.3)'
      }}
      onMouseEnter={(e) => {
        const target = e.target as HTMLElement;
        target.style.backgroundColor = '#0056b3';
        target.style.transform = 'translateY(-1px)';
        target.style.boxShadow = '0 4px 12px rgba(0,123,255,0.4)';
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLElement;
        target.style.backgroundColor = '#007bff';
        target.style.transform = 'translateY(0)';
        target.style.boxShadow = '0 2px 8px rgba(0,123,255,0.3)';
      }}
    >
      👤 Sign In
    </Link>
  );
}
