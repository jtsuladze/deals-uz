export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  location: string;
  avatar?: string;
  createdAt: Date;
  bio?: string;
  preferredLanguage: 'en' | 'ru' | 'uz';
  role: 'user' | 'admin';
  isActive: boolean;
  lastLogin?: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  name: string;
  phone: string;
  location: string;
  preferredLanguage: 'en' | 'ru' | 'uz';
  confirmPassword: string;
}

class UserStore {
  private users: User[] = [
    {
      id: '1',
      email: 'demo@dealsuz.com',
      name: 'Demo User',
      phone: '+998901234567',
      location: 'Tashkent',
      createdAt: new Date('2024-01-01'),
      bio: 'Welcome to DealsUZ! This is a demo account.',
      preferredLanguage: 'en',
      role: 'user',
      isActive: true,
      lastLogin: new Date()
    },
    {
      id: '2',
      email: 'user@example.com',
      name: 'Aziz Karimov',
      phone: '+998971234567',
      location: 'Samarkand',
      createdAt: new Date('2024-02-15'),
      bio: 'Active seller of electronics and gadgets.',
      preferredLanguage: 'ru',
      role: 'user',
      isActive: true,
      lastLogin: new Date('2024-12-01')
    },
    {
      id: '3',
      email: 'admin@dealsuz.com',
      name: 'Admin User',
      phone: '+998900000000',
      location: 'Tashkent',
      createdAt: new Date('2024-01-01'),
      bio: 'System Administrator',
      preferredLanguage: 'en',
      role: 'admin',
      isActive: true,
      lastLogin: new Date()
    }
  ];

  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  // Subscribe to auth state changes
  subscribe(listener: (user: User | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.currentUser));
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Sign in
  async signIn(credentials: UserCredentials): Promise<{ success: boolean; error?: string }> {
    const { email, password } = credentials;
    
    // Simple validation for demo purposes
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    // Demo authentication - in real app, this would call an API
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // For demo, any password works for existing users
    if (password.length < 6) {
      return { success: false, error: 'Invalid password' };
    }

    // Check if user is active
    if (!user.isActive) {
      return { success: false, error: 'Account is deactivated. Please contact support.' };
    }

    // Update last login
    const userIndex = this.users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      this.users[userIndex].lastLogin = new Date();
    }

    this.currentUser = { ...user, lastLogin: new Date() };
    this.notify();
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('dealsuz_user', JSON.stringify(this.currentUser));
    }

    return { success: true };
  }

  // Sign up
  async signUp(registration: UserRegistration): Promise<{ success: boolean; error?: string }> {
    const { email, password, confirmPassword, name, phone, location, preferredLanguage } = registration;

    // Validation
    if (!email || !password || !name || !phone || !location) {
      return { success: false, error: 'All fields are required' };
    }

    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Check if user already exists
    if (this.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'User with this email already exists' };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      name,
      phone,
      location,
      preferredLanguage,
      createdAt: new Date(),
      role: 'user',
      isActive: true,
      lastLogin: new Date()
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    this.notify();

    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('dealsuz_user', JSON.stringify(newUser));
    }

    return { success: true };
  }

  // Sign out
  signOut() {
    this.currentUser = null;
    this.notify();
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dealsuz_user');
    }
  }

  // Update user profile
  async updateProfile(updates: Partial<Omit<User, 'id' | 'email' | 'createdAt'>>): Promise<{ success: boolean; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }

    const updatedUser = { ...this.currentUser, ...updates };
    
    // Update in users array
    const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id);
    if (userIndex !== -1) {
      this.users[userIndex] = updatedUser;
    }

    this.currentUser = updatedUser;
    this.notify();

    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('dealsuz_user', JSON.stringify(updatedUser));
    }

    return { success: true };
  }

  // Initialize from localStorage
  initializeFromStorage() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dealsuz_user');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          this.currentUser = user;
          this.notify();
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('dealsuz_user');
        }
      }
    }
  }

  // Get all users (for admin purposes)
  getAllUsers(): User[] {
    return this.users;
  }

  // Get user by ID
  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  // Admin methods
  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  // Admin: Toggle user active status
  async toggleUserStatus(userId: string): Promise<{ success: boolean; error?: string }> {
    if (!this.isAdmin()) {
      return { success: false, error: 'Access denied. Admin privileges required.' };
    }

    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    this.users[userIndex].isActive = !this.users[userIndex].isActive;
    return { success: true };
  }

  // Admin: Delete user
  async deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
    if (!this.isAdmin()) {
      return { success: false, error: 'Access denied. Admin privileges required.' };
    }

    if (userId === this.currentUser?.id) {
      return { success: false, error: 'Cannot delete your own account' };
    }

    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    this.users.splice(userIndex, 1);
    return { success: true };
  }

  // Admin: Update user role
  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<{ success: boolean; error?: string }> {
    if (!this.isAdmin()) {
      return { success: false, error: 'Access denied. Admin privileges required.' };
    }

    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    this.users[userIndex].role = role;
    return { success: true };
  }

  // Admin: Get user statistics
  getUserStats() {
    if (!this.isAdmin()) {
      return null;
    }

    const totalUsers = this.users.length;
    const activeUsers = this.users.filter(u => u.isActive).length;
    const adminUsers = this.users.filter(u => u.role === 'admin').length;
    const recentUsers = this.users.filter(u => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return u.createdAt > monthAgo;
    }).length;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      adminUsers,
      regularUsers: totalUsers - adminUsers,
      recentUsers
    };
  }
}

export const userStore = new UserStore();

// Initialize from storage on module load
if (typeof window !== 'undefined') {
  userStore.initializeFromStorage();
}
