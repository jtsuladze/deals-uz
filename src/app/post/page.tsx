'use client';

import { t } from '../../i18n';
import React, { useState, useEffect } from 'react';
import type { Locale } from '../../i18n';
import { userStore, User } from '../../userStore';
import { categories, getCategoryName } from '../../data/categories';
import LocationPicker from '../components/LocationPicker';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { useRouter } from 'next/navigation';

export default function PostItem({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [type, setType] = useState<'item' | 'service'>('item');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState<'fixed' | 'range'>('fixed');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('electronics');
  const [condition, setCondition] = useState<'new' | 'like_new' | 'good' | 'fair' | 'poor'>('new');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });

  useEffect(() => {
    // Check authentication status
    const currentUser = userStore.getCurrentUser();
    setUser(currentUser);

    // Subscribe to user changes
    const unsubscribe = userStore.subscribe((updatedUser) => {
      setUser(updatedUser);
    });

    return unsubscribe;
  }, []);

  // If user is not authenticated, show sign-in prompt
  if (!user) {
    return (
      <>
        <Header locale={locale} />
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#333', 
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            {t(locale, 'signInRequired')}
          </h2>
          <p style={{ 
            color: '#666', 
            marginBottom: '2rem',
            lineHeight: '1.5'
          }}>
            {t(locale, 'signInToPost')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link
              href={`/${locale}/auth/signin`}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              {t(locale, 'signIn')}
            </Link>
            <Link
              href={`/${locale}/auth/signup`}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              {t(locale, 'signUp')}
            </Link>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Filter categories based on type
  const availableCategories = categories;

  // Update category when type changes
  const handleTypeChange = (newType: 'item' | 'service') => {
    setType(newType);
    // Reset category to first available category
    setCategory(availableCategories[0]?.id || 'electronics');
  };

  // Handle file upload (multiple files)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Check if total files exceed limit (max 5 photos)
    if (imageFiles.length + files.length > 5) {
      setNotification({ message: 'You can upload maximum 5 photos', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
      return;
    }
    
    const validFiles: File[] = [];
    const newPreviews: string[] = [];
    
    files.forEach(file => {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setNotification({ message: `File ${file.name} is too large. Max size is 5MB`, type: 'error' });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        setNotification({ message: `File ${file.name} is not an image`, type: 'error' });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        return;
      }
      
      validFiles.push(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        newPreviews.push(result);
        
        // Update state when all files are processed
        if (newPreviews.length === validFiles.length) {
          setImageFiles(prev => [...prev, ...validFiles]);
          setImagePreviews(prev => [...prev, ...newPreviews]);
          
          // If first image, set as imageUrl for backward compatibility
          if (imageFiles.length === 0 && newPreviews.length > 0) {
            setImageUrl(newPreviews[0]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove specific image
  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
    
    // Update imageUrl to first image or empty
    setImageUrl(newPreviews.length > 0 ? newPreviews[0] : '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form data:', { title, description, price, category, type, location });
    console.log('User:', user);
    console.log('IsSubmitting before:', isSubmitting);
    
    if (!user) {
      console.log('❌ No user - cannot submit');
      setNotification({ message: 'Please sign in to post items', type: 'error' });
      return;
    }
    
    if (!title || !description || !price) {
      console.log('❌ Missing required fields');
      setNotification({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Calculate final price based on type
      let finalPrice = 0;
      if (priceType === 'fixed') {
        finalPrice = parseFloat(price);
      } else {
        // For range, use the minimum price as the base price
        finalPrice = parseFloat(priceMin);
      }
      
      console.log('Submitting post with data:', {
        title,
        description,
        price: finalPrice,
        category,
        type,
        condition,
        location,
        userId: user?.id || user?.email,
        userName: user?.name,
        userEmail: user?.email
      });
      
      // Submit to database API
      const listingData = {
        title,
        description,
        price: finalPrice,
        categoryId: category,
        condition: condition,
        location,
        userId: user.id || user.email,
        status: 'ACTIVE',
        images: imagePreviews.length > 0 ? imagePreviews.map(url => ({ url })) : []
      };

      console.log('Submitting to API:', listingData);

      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create listing: ${response.statusText}`);
      }

      const newPost = await response.json();
      console.log('✅ Post created successfully in database:', newPost);
      console.log('✅ Post ID:', newPost.id);
      
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setPriceType('fixed');
      setPriceMin('');
      setPriceMax('');
      setLocation('');
      setCategory(availableCategories[0]?.id || 'electronics');
      setCondition('new');
      setImageUrl('');
      setImageFiles([]);
      setImagePreviews([]);
      
      const successMessage = type === 'item' 
        ? '🎉 Item posted successfully! Redirecting to My Listings...'
        : '🎉 Service posted successfully! Redirecting to My Listings...';
      setNotification({ message: successMessage, type: 'success' });
      
      // Redirect to My Listings after 2 seconds
      setTimeout(() => {
        router.push('/en/my-listings');
      }, 2000);
    } catch (error) {
      console.error('Failed to post:', error);
      const errorMessage = type === 'item'
        ? '❌ Failed to post item. Please try again.'
        : '❌ Failed to post service. Please try again.';
      setNotification({ message: errorMessage, type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header locale={locale} />
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          margin: '0 0 1rem 0',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          {type === 'item' ? t(locale, 'postItemTitle') : 'Post a Service'}
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          opacity: '0.9',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          {type === 'item' 
            ? 'Share your items with the community and start selling today!'
            : 'Offer your services to the community and find new clients!'
          }
        </p>
      </div>

      {/* Notification */}
      {notification.message && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: notification.type === 'success' ? '#d4edda' : '#f8d7da',
          color: notification.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${notification.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '8px',
          padding: '15px 20px',
          maxWidth: '400px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          fontSize: '14px',
          lineHeight: '1.4'
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Type Selection Toggle */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1.1rem'
              }}>
                🎯 What are you posting?
              </label>
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                backgroundColor: '#f8f9fa',
                padding: '0.5rem',
                borderRadius: '12px',
                border: '2px solid #e9ecef'
              }}>
                <button
                  type="button"
                  onClick={() => handleTypeChange('item')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: type === 'item' ? '#007bff' : 'transparent',
                    color: type === 'item' ? 'white' : '#666',
                    boxShadow: type === 'item' ? '0 2px 8px rgba(0, 123, 255, 0.3)' : 'none'
                  }}
                >
                  📦 Physical Item
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('service')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: type === 'service' ? '#007bff' : 'transparent',
                    color: type === 'service' ? 'white' : '#666',
                    boxShadow: type === 'service' ? '0 2px 8px rgba(0, 123, 255, 0.3)' : 'none'
                  }}
                >
                  🛠️ Service/Skill
                </button>
              </div>
            </div>
            
            {/* Title Field */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                📝 {type === 'item' ? t(locale, 'itemTitle') : 'Service Title'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder={type === 'item' 
                  ? "Enter a catchy title for your item..."
                  : "Enter a clear title for your service..."
                }
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
            
            {/* Description Field */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                📄 {t(locale, 'description')}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder={type === 'item'
                  ? "Describe your item in detail..."
                  : "Describe your service, what you offer, and your experience..."
                }
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  minHeight: '120px',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>

            {/* Price Section */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                💰 {type === 'item' ? t(locale, 'price') : 'Price (UZS)'}
              </label>
              
              {/* Price Type Toggle */}
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                marginBottom: '1rem',
                backgroundColor: '#f8f9fa',
                padding: '0.25rem',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <button
                  type="button"
                  onClick={() => setPriceType('fixed')}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: priceType === 'fixed' ? '#007bff' : 'transparent',
                    color: priceType === 'fixed' ? 'white' : '#666'
                  }}
                >
                  Fixed Price
                </button>
                <button
                  type="button"
                  onClick={() => setPriceType('range')}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: priceType === 'range' ? '#007bff' : 'transparent',
                    color: priceType === 'range' ? 'white' : '#666'
                  }}
                >
                  Price Range
                </button>
              </div>

              {/* Price Input Fields */}
              {priceType === 'fixed' ? (
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder={type === 'item' ? "0" : "Starting from..."}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: '2px solid #e9ecef',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#007bff'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    required
                    placeholder="Min price"
                    style={{ 
                      flex: 1,
                      padding: '1rem', 
                      border: '2px solid #e9ecef',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                  <span style={{ color: '#666', fontWeight: '500' }}>to</span>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    required
                    placeholder="Max price"
                    style={{ 
                      flex: 1,
                      padding: '1rem', 
                      border: '2px solid #e9ecef',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </div>
              )}
            </div>

            {/* Category Field */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                🏷️ Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              >
                {availableCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {getCategoryName(cat.id, locale)}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Field - Only for items */}
            {type === 'item' && (
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '1rem'
                }}>
                  ⭐ Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as 'new' | 'like_new' | 'good' | 'fair' | 'poor')}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: '2px solid #e9ecef',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    transition: 'border-color 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#007bff'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                >
                  <option value="new">New</option>
                  <option value="like_new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            )}
            
            {/* Location Field */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                📍 {t(locale, 'location')}
              </label>
              
              {/* Location Input with Picker */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={location}
                  onClick={() => setShowLocationPicker(true)}
                  required
                  placeholder="Click to choose location"
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    border: '2px solid #e9ecef',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                    outline: 'none',
                    cursor: 'pointer',
                    backgroundColor: 'white'
                  }}
                  readOnly
                  onFocus={(e) => e.target.style.borderColor = '#007bff'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
                <div style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  📍
                </div>
              </div>
            </div>

            {/* Photo Upload Field */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                📸 {type === 'item' ? 'Product Photos' : 'Service Photos'} (Optional - Max 5)
              </label>
              
              {imagePreviews.length === 0 ? (
                <div style={{
                  border: '2px dashed #e9ecef',
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundColor: '#f8f9fa',
                  transition: 'border-color 0.3s ease',
                  cursor: 'pointer'
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = '#007bff';
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = '#e9ecef';
                  const files = e.dataTransfer.files;
                  if (files.length > 0) {
                    const fakeEvent = { target: { files: Array.from(files) } } as any;
                    handleFileUpload(fakeEvent);
                  }
                }}
                onClick={() => document.getElementById('imageInput')?.click()}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '600', color: '#333' }}>
                    Click to upload or drag and drop
                  </p>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
                    PNG, JPG, GIF up to 5MB each (Max 5 photos)
                  </p>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                <div>
                  {/* Image Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} style={{
                        position: 'relative',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}>
                        <img 
                          src={preview} 
                          alt={`Preview ${index + 1}`} 
                          style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            backgroundColor: 'rgba(220, 53, 69, 0.9)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    
                    {/* Add More Button */}
                    {imagePreviews.length < 5 && (
                      <div 
                        onClick={() => document.getElementById('imageInputAdd')?.click()}
                        style={{
                          height: '120px',
                          border: '2px dashed #007bff',
                          borderRadius: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backgroundColor: 'rgba(0, 123, 255, 0.05)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', color: '#007bff', marginBottom: '0.25rem' }}>+</div>
                        <div style={{ fontSize: '0.75rem', color: '#007bff', textAlign: 'center' }}>Add More</div>
                        <input
                          id="imageInputAdd"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileUpload}
                          style={{ display: 'none' }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* File Info */}
                  <div style={{ 
                    fontSize: '0.85rem',
                    color: '#666',
                    marginBottom: '1rem'
                  }}>
                    {imageFiles.length} of 5 photos uploaded
                  </div>
                </div>
              )}
              
              {/* Alternative: Image URL input */}
              <div style={{ marginTop: '1rem' }}>
                <label style={{ 
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  Or paste an image URL:
                </label>
                <input
                  type="url"
                  value={imageFiles.length > 0 ? '' : imageUrl}
                  onChange={(e) => {
                    if (imageFiles.length === 0) {
                      setImageUrl(e.target.value);
                    }
                  }}
                  disabled={imageFiles.length > 0}
                  placeholder="https://example.com/image.jpg"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    backgroundColor: imageFiles.length > 0 ? '#f8f9fa' : 'white',
                    color: imageFiles.length > 0 ? '#999' : '#333',
                    transition: 'border-color 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => imageFiles.length === 0 && (e.target.style.borderColor = '#007bff')}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ 
                padding: '1.2rem 2rem', 
                backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
                color: 'white', 
                border: 'none', 
                borderRadius: '15px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
                transform: isSubmitting ? 'none' : 'translateY(0)',
                marginTop: '1rem'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                if (!isSubmitting) {
                  target.style.backgroundColor = '#218838';
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                if (!isSubmitting) {
                  target.style.backgroundColor = '#28a745';
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
                }
              }}
            >
              {isSubmitting 
                ? (type === 'item' ? '⏳ Posting Item...' : '⏳ Posting Service...') 
                : (type === 'item' ? `🚀 ${t(locale, 'postItem')}` : '🚀 Post Service')
              }
            </button>
          </form>
        </div>

        {/* Tips Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '1.5rem',
          marginTop: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ 
            margin: '0 0 1rem 0',
            color: '#333',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            💡 Tips for a Great {type === 'item' ? 'Item' : 'Service'} Listing
          </h3>
          <ul style={{ 
            margin: '0',
            paddingLeft: '1.5rem',
            color: '#666',
            lineHeight: '1.6'
          }}>
            {type === 'item' ? (
              <>
                <li>Use a clear, descriptive title</li>
                <li>Include detailed descriptions and specifications</li>
                <li>Upload high-quality photos showing the item clearly</li>
                <li>Set a fair and competitive price</li>
                <li>Be honest about the item's condition</li>
              </>
            ) : (
              <>
                <li>Clearly describe what service you provide</li>
                <li>Mention your experience and qualifications</li>
                <li>Upload photos of your previous work or certifications</li>
                <li>Set competitive pricing for your skill level</li>
                <li>Be specific about availability and location</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Location Picker */}
      <LocationPicker
        isOpen={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onSelect={(selectedLocation) => setLocation(selectedLocation)}
        selectedLocation={location}
      />
      
      <Footer locale={locale} />
    </div>
    </>
  );
}
