'use client';

import { t } from '../../i18n';
import React, { useState } from 'react';
import type { Locale } from '../../i18n';
import { addItem } from '../../itemsStore';

export default function PostItem({ locale }: { locale: Locale }) {
  const [type, setType] = useState<'item' | 'service'>('item');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState<'fixed' | 'range'>('fixed');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Electronics & Media');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [sellerName, setSellerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemCategories = [
    'Electronics & Media',
    'Home & Garden', 
    'Clothing, Shoes, & Accessories',
    'Baby & Kids',
    'Vehicles',
    'Toys, Games, & Hobbies',
    'Sports & Outdoors',
    'Collectibles & Art',
    'Pet Supplies',
    'Health & Beauty',
    'Wedding',
    'Business Equipment',
    'Tickets',
    'General'
  ];
  const serviceCategories = [
    'Appliance Repair and Maintenance',
    'Auto Detailing', 
    'Auto Repair & Maintenance',
    'Carpentry',
    'Computer and Device Maintenance',
    'Concrete and Masonry',
    'Dog Grooming',
    'Drywall Repair and Texturing',
    'Electrical',
    'Event Planning Services',
    'Exterior Painting',
    'Fence and Gate Installation Repair',
    'Flooring',
    'Furniture Assembly',
    'General Contracting',
    'Handyman',
    'Home Remodelling',
    'House Cleaning',
    'HVAC Repair & Maintenance',
    'Interior Design',
    'Junk Removal',
    'Landscaping',
    'Lawncare and Garden Maintenance',
    'Local Moving',
    'Makeup and Beauty',
    'Mold Inspection and Removal',
    'Moving',
    'Music Entertainment',
    'Music Lessons',
    'Outdoor Cleaning',
    'Personal Chef',
    'Personal Training',
    'Photography',
    'Plumbing',
    'Roofing',
    'Swimming Pool Cleaning & Maintenance',
    'TV Mounting',
    'Vehicle Towing',
    'Windows & Doors'
  ];
  
  const categories = type === 'item' ? itemCategories : serviceCategories;

  // Update category when type changes
  const handleTypeChange = (newType: 'item' | 'service') => {
    setType(newType);
    // Reset category to first option of the new type
    setCategory(newType === 'item' ? itemCategories[0] : serviceCategories[0]);
  };

  // Handle file upload (multiple files)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Check if total files exceed limit (max 5 photos)
    if (imageFiles.length + files.length > 5) {
      alert('You can upload maximum 5 photos');
      return;
    }
    
    const validFiles: File[] = [];
    const newPreviews: string[] = [];
    
    files.forEach(file => {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Max size is 5MB`);
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image`);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      
      addItem({
        title,
        description,
        price: finalPrice,
        location,
        category,
        imageUrl: imageUrl || undefined,
        sellerId: 'user@example.com',
        sellerName: sellerName || 'Anonymous User',
        type, // Add type to the item data
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setPriceType('fixed');
      setPriceMin('');
      setPriceMax('');
      setLocation('');
      setCategory(type === 'item' ? itemCategories[0] : serviceCategories[0]);
      setImageUrl('');
      setImageFiles([]);
      setImagePreviews([]);
      setSellerName('');
      
      const successMessage = type === 'item' 
        ? '🎉 Item posted successfully! Check the Browse page to see it.'
        : '🎉 Service posted successfully! Check the Browse page to see it.';
      alert(successMessage);
    } catch (error) {
      console.error('Failed to post:', error);
      const errorMessage = type === 'item'
        ? '❌ Failed to post item. Please try again.'
        : '❌ Failed to post service. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
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
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="e.g., Tashkent, Yunusabad"
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

            {/* Seller Name Field */}
            <div>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333',
                fontSize: '1rem'
              }}>
                👤 Your Name (Optional)
              </label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="How should buyers contact you?"
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
    </div>
  );
}
