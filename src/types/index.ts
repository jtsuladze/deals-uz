export interface Post {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  type: 'item' | 'service';
  condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
  location: string;
  coordinates?: { lat: number; lng: number };
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'pending' | 'rejected' | 'sold' | 'archived';
  views: number;
  favorites: string[]; // Array of user IDs who favorited this post
  isFeatured: boolean;
  featuredUntil?: Date;
  contactPreference: 'phone' | 'message' | 'both';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  postId?: string;
  content: string;
  type: 'text' | 'image' | 'offer';
  offerAmount?: number;
  createdAt: Date;
  readAt?: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  postId: string;
  buyerId: string;
  sellerId: string;
  lastMessage?: Message;
  lastMessageAt: Date;
  createdAt: Date;
  isArchived: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'offer' | 'favorite' | 'post_approved' | 'post_rejected';
  title: string;
  message: string;
  postId?: string;
  conversationId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  nameRu: string;
  nameUz: string;
  icon: string;
  subcategories: Subcategory[];
  isActive: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  nameRu: string;
  nameUz: string;
  categoryId: string;
  isActive: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  avatar?: string;
  createdAt: Date;
  bio?: string;
  preferredLanguage: 'en' | 'ru' | 'uz';
  role: 'user' | 'admin';
  isActive: boolean;
  lastLogin?: Date;
  emailVerified: boolean;
  phoneVerified: boolean;
  rating: number;
  reviewCount: number;
  totalSold: number;
  totalBought: number;
  favoritePostIds: string[];
  blockedUserIds: string[];
  settings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    showPhone: boolean;
    showEmail: boolean;
  };
}

export interface Review {
  id: string;
  reviewerId: string;
  revieweeId: string;
  postId: string;
  rating: number; // 1-5
  comment: string;
  type: 'buyer' | 'seller';
  createdAt: Date;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  subcategory?: string;
  type?: 'item' | 'service';
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  condition?: string;
  sortBy?: 'newest' | 'oldest' | 'price_low' | 'price_high' | 'popularity';
  onlyFeatured?: boolean;
}
