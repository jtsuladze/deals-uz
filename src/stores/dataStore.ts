import { Post, Message, Conversation, Notification, UserProfile, Review, SearchFilters } from '../types';
import { categories } from '../data/categories';

class DataStore {
  public instanceId: string = Math.random().toString(36).substring(7);
  
  // Sample posts data
  private posts: Post[] = [];
  
  constructor() {
    // Initialize posts with default data first
    this.posts = this.getDefaultPosts();
    // Then try to load from storage
    this.loadFromStorage();
  }
  
  private getDefaultPosts(): Post[] {
    return [
    {
      id: '1',
      title: 'iPhone 15 Pro Max - Like New',
      description: 'Selling my iPhone 15 Pro Max in excellent condition. Used for only 2 months. Comes with original box, charger, and screen protector already applied. No scratches or damages.',
      price: 1200,
      category: 'electronics',
      subcategory: 'phones',
      type: 'item',
      condition: 'like_new',
      location: 'Tashkent, Yunusabad',
      coordinates: { lat: 41.3775, lng: 69.2906 },
      userId: '1',
      userName: 'Demo User',
      userEmail: 'demo@dealsuz.com',
      userPhone: '+998901234567',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400'
      ],
      tags: ['iphone', 'apple', 'smartphone', 'unlocked'],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-01'),
      status: 'active',
      views: 234,
      favorites: ['2', '3'],
      isFeatured: true,
      featuredUntil: new Date('2025-01-01'),
      contactPreference: 'both'
    },
    {
      id: '2',
      title: 'MacBook Air M2 - 2023 Model',
      description: 'Brand new MacBook Air with M2 chip, 8GB RAM, 256GB SSD. Still in warranty. Perfect for students and professionals.',
      price: 1000,
      category: 'electronics',
      subcategory: 'computers',
      type: 'item',
      condition: 'new',
      location: 'Samarkand, Center',
      coordinates: { lat: 39.6547, lng: 66.9597 },
      userId: '2',
      userName: 'Aziz Karimov',
      userEmail: 'user@example.com',
      userPhone: '+998971234567',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
      ],
      tags: ['macbook', 'apple', 'laptop', 'new'],
      createdAt: new Date('2024-11-28'),
      updatedAt: new Date('2024-11-28'),
      status: 'active',
      views: 156,
      favorites: ['1'],
      isFeatured: false,
      contactPreference: 'message'
    },
    {
      id: '3',
      title: 'Professional Web Development Services',
      description: 'I offer professional web development services using modern technologies like React, Next.js, Node.js. Portfolio available upon request.',
      price: 500,
      category: 'services',
      subcategory: 'professional',
      type: 'service',
      location: 'Tashkent, Mirzo Ulugbek',
      coordinates: { lat: 41.3123, lng: 69.2787 },
      userId: '2',
      userName: 'Aziz Karimov',
      userEmail: 'user@example.com',
      userPhone: '+998971234567',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
      ],
      tags: ['web development', 'react', 'nextjs', 'programming'],
      createdAt: new Date('2024-11-25'),
      updatedAt: new Date('2024-11-25'),
      status: 'active',
      views: 89,
      favorites: [],
      isFeatured: true,
      featuredUntil: new Date('2025-01-15'),
      contactPreference: 'both'
    },
    {
      id: '4',
      title: '2019 Toyota Camry - Excellent Condition',
      description: 'Well-maintained Toyota Camry with low mileage. All service records available. New tires and recent oil change.',
      price: 18000,
      category: 'vehicles',
      subcategory: 'cars',
      type: 'item',
      condition: 'good',
      location: 'Bukhara, Center',
      coordinates: { lat: 39.7747, lng: 64.4286 },
      userId: '3',
      userName: 'Admin User',
      userEmail: 'admin@dealsuz.com',
      userPhone: '+998900000000',
      images: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
      ],
      tags: ['toyota', 'camry', 'sedan', 'reliable'],
      createdAt: new Date('2024-11-20'),
      updatedAt: new Date('2024-11-20'),
      status: 'active',
      views: 312,
      favorites: ['1', '2'],
      isFeatured: false,
      contactPreference: 'phone'
    }
    ];
  }

  private conversations: Conversation[] = [];
  private messages: Message[] = [];
  private notifications: Notification[] = [];
  private reviews: Review[] = [];

  private loadFromStorage(): void {
    if (typeof window === 'undefined') {
      // Server-side, use default posts
      this.posts = this.getDefaultPosts();
      return;
    }

    try {
      const stored = localStorage.getItem('dealsuz_posts');
      if (stored) {
        const parsedPosts = JSON.parse(stored);
        // Convert date strings back to Date objects
        this.posts = parsedPosts.map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
          featuredUntil: post.featuredUntil ? new Date(post.featuredUntil) : undefined
        }));
        console.log(`📦 Loaded ${this.posts.length} posts from localStorage`);
      } else {
        // First time, use default posts
        this.posts = this.getDefaultPosts();
        this.saveToStorage();
        console.log(`🆕 Created new dataStore with ${this.posts.length} default posts`);
      }
    } catch (error) {
      console.error('Error loading posts from storage:', error);
      this.posts = this.getDefaultPosts();
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('dealsuz_posts', JSON.stringify(this.posts));
    } catch (error) {
      console.error('Error saving posts to storage:', error);
    }
  }

  // Posts methods
  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostById(id: string): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  getPostsByUser(userId: string): Post[] {
    return this.posts.filter(post => post.userId === userId);
  }

  getFeaturedPosts(): Post[] {
    return this.posts.filter(post => 
      post.isFeatured && 
      post.status === 'active' && 
      (!post.featuredUntil || post.featuredUntil > new Date())
    );
  }

  searchPosts(filters: SearchFilters): Post[] {
    let filtered = this.posts.filter(post => post.status === 'active');

    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    if (filters.subcategory) {
      filtered = filtered.filter(post => post.subcategory === filters.subcategory);
    }

    if (filters.type) {
      filtered = filtered.filter(post => post.type === filters.type);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(post => post.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(post => post.price <= filters.maxPrice!);
    }

    if (filters.location) {
      filtered = filtered.filter(post => 
        post.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.condition) {
      filtered = filtered.filter(post => post.condition === filters.condition);
    }

    if (filters.onlyFeatured) {
      filtered = filtered.filter(post => post.isFeatured);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => (b.views + b.favorites.length) - (a.views + a.favorites.length));
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  }

  addPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'favorites'>): Post {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      favorites: []
    };
    this.posts.unshift(newPost);
    this.saveToStorage();
    console.log(`💾 Saved post "${newPost.title}" to localStorage. Total posts: ${this.posts.length}`);
    return newPost;
  }

  updatePost(id: string, updates: Partial<Post>): Post | null {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) return null;

    this.posts[index] = {
      ...this.posts[index],
      ...updates,
      updatedAt: new Date()
    };
    return this.posts[index];
  }

  deletePost(id: string): boolean {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) return false;
    
    this.posts.splice(index, 1);
    return true;
  }

  incrementViews(id: string): void {
    const post = this.getPostById(id);
    if (post) {
      post.views++;
    }
  }

  toggleFavorite(postId: string, userId: string): boolean {
    const post = this.getPostById(postId);
    if (!post) return false;

    const index = post.favorites.indexOf(userId);
    if (index === -1) {
      post.favorites.push(userId);
      return true;
    } else {
      post.favorites.splice(index, 1);
      return false;
    }
  }

  getUserFavoritePosts(userId: string): Post[] {
    return this.posts.filter(post => post.favorites.includes(userId));
  }

  // Categories methods
  getCategories() {
    return categories;
  }

  getCategoryById(id: string) {
    return categories.find(cat => cat.id === id);
  }

  // Messaging methods
  getConversationsByUser(userId: string): Conversation[] {
    return this.conversations.filter(conv => 
      conv.buyerId === userId || conv.sellerId === userId
    );
  }

  getMessagesByConversation(conversationId: string): Message[] {
    return this.messages
      .filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  sendMessage(message: Omit<Message, 'id' | 'createdAt' | 'isRead'>): Message {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date(),
      isRead: false
    };
    
    this.messages.push(newMessage);
    
    // Update conversation
    const conversation = this.conversations.find(conv => conv.id === message.conversationId);
    if (conversation) {
      conversation.lastMessage = newMessage;
      conversation.lastMessageAt = new Date();
    }
    
    return newMessage;
  }

  markMessageAsRead(messageId: string): void {
    const message = this.messages.find(msg => msg.id === messageId);
    if (message) {
      message.isRead = true;
      message.readAt = new Date();
    }
  }

  // Notifications methods
  getNotificationsByUser(userId: string): Notification[] {
    return this.notifications
      .filter(notif => notif.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  addNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
      isRead: false
    };
    
    this.notifications.push(newNotification);
    return newNotification;
  }

  markNotificationAsRead(notificationId: string): void {
    const notification = this.notifications.find(notif => notif.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
  }

  getUnreadNotificationCount(userId: string): number {
    return this.notifications.filter(notif => 
      notif.userId === userId && !notif.isRead
    ).length;
  }

  // Favorites functionality
  addFavorite(postId: string, userId: string = 'current_user'): void {
    const post = this.posts.find(p => p.id === postId);
    if (post && !post.favorites.includes(userId)) {
      post.favorites.push(userId);
    }
  }

  removeFavorite(postId: string, userId: string = 'current_user'): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.favorites = post.favorites.filter(id => id !== userId);
    }
  }

  isFavorite(postId: string, userId: string = 'current_user'): boolean {
    const post = this.posts.find(p => p.id === postId);
    return post ? post.favorites.includes(userId) : false;
  }

  getFavoritePostsByUser(userId: string): Post[] {
    return this.posts.filter(post => post.favorites.includes(userId));
  }
}

export const dataStore = new DataStore();
