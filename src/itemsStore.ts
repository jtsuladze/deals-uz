export type Item = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  imageUrl?: string;
  sellerId: string;
  sellerName: string;
  createdAt: Date;
  featured?: boolean;
  type?: 'item' | 'service';
};

// Sample data with some featured items
let items: Item[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    description: 'Brand new iPhone 15 Pro Max 256GB in Titanium Blue. Unopened box with all accessories.',
    price: 15000000,
    location: 'Tashkent, Yunusabad',
    category: 'Electronics & Media',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    sellerId: 'user1',
    sellerName: 'Aziz Karimov',
    createdAt: new Date('2024-01-15'),
    featured: true,
    type: 'item'
  },
  {
    id: '2',
    title: 'Toyota Camry 2020',
    description: 'Excellent condition Toyota Camry 2020, low mileage, full service history.',
    price: 280000000,
    location: 'Samarkand',
    category: 'Vehicles',
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
    sellerId: 'user2',
    sellerName: 'Dilshod Ahmedov',
    createdAt: new Date('2024-01-14'),
    featured: true,
    type: 'item'
  },
  {
    id: '3',
    title: 'MacBook Pro M3',
    description: 'MacBook Pro 14" with M3 chip, 16GB RAM, 512GB SSD. Perfect for professionals.',
    price: 25000000,
    location: 'Tashkent, Chilanzar',
    category: 'Electronics & Media',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
    sellerId: 'user3',
    sellerName: 'Malika Rashidova',
    createdAt: new Date('2024-01-13'),
    type: 'item'
  },
  {
    id: '4',
    title: 'Professional Web Development',
    description: 'Custom website development using modern technologies. React, Next.js, TypeScript. SEO optimized and mobile responsive.',
    price: 2000000,
    location: 'Tashkent, Remote',
    category: 'Computer and Device Maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
    sellerId: 'user4',
    sellerName: 'Dmitry Volkov',
    createdAt: new Date('2024-01-12'),
    type: 'service',
    featured: true
  },
  {
    id: '5',
    title: 'Home Cleaning Service',
    description: 'Professional house cleaning service. Deep cleaning, regular maintenance, eco-friendly products. Available weekdays and weekends.',
    price: 150000,
    location: 'Tashkent, All Districts',
    category: 'House Cleaning',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-fbd95b9ff67b?w=500',
    sellerId: 'user5',
    sellerName: 'Elena Komarova',
    createdAt: new Date('2024-01-11'),
    type: 'service'
  },
  {
    id: '6',
    title: 'Designer Leather Jacket',
    description: 'Genuine Italian leather jacket, size L. Excellent condition, worn only a few times. Perfect for autumn and winter.',
    price: 800000,
    location: 'Tashkent, Mirabad',
    category: 'Clothing, Shoes, & Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    sellerId: 'user6',
    sellerName: 'Jasur Nazarov',
    createdAt: new Date('2024-01-10'),
    type: 'item'
  },
  {
    id: '7',
    title: 'Baby Stroller - Chicco',
    description: 'High-quality Chicco baby stroller in excellent condition. Lightweight, easy to fold, includes rain cover.',
    price: 1200000,
    location: 'Bukhara, Center',
    category: 'Baby & Kids',
    imageUrl: 'https://images.unsplash.com/photo-1544558382-ec4ce4c34db0?w=500',
    sellerId: 'user7',
    sellerName: 'Nigora Sultanova',
    createdAt: new Date('2024-01-09'),
    type: 'item'
  },
  {
    id: '8',
    title: 'PlayStation 5 Console',
    description: 'Sony PlayStation 5 with controller and 3 games included. Great condition, barely used.',
    price: 6500000,
    location: 'Tashkent, Sergeli',
    category: 'Toys, Games, & Hobbies',
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
    sellerId: 'user8',
    sellerName: 'Akmal Rakhimov',
    createdAt: new Date('2024-01-08'),
    type: 'item',
    featured: true
  },
  {
    id: '9',
    title: 'Professional Plumbing Services',
    description: 'Licensed plumber available for all your plumbing needs. Pipe repairs, fixture installation, emergency services available 24/7.',
    price: 300000,
    location: 'Tashkent, All Districts',
    category: 'Plumbing',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500',
    sellerId: 'user9',
    sellerName: 'Rustam Khudoyarov',
    createdAt: new Date('2024-01-07'),
    type: 'service'
  },
  {
    id: '10',
    title: 'Wedding Photography',
    description: 'Professional wedding photographer with 10+ years experience. Beautiful, artistic wedding photos to capture your special day.',
    price: 5000000,
    location: 'Tashkent, Samarkand, Bukhara',
    category: 'Photography',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500',
    sellerId: 'user10',
    sellerName: 'Zarina Mirzaeva',
    createdAt: new Date('2024-01-06'),
    type: 'service',
    featured: true
  },
  {
    id: '11',
    title: 'Handyman Services',
    description: 'Reliable handyman for all your home repair needs. Furniture assembly, minor electrical work, painting, and general repairs.',
    price: 200000,
    location: 'Tashkent, Yunusabad & Chilanzar',
    category: 'Handyman',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500',
    sellerId: 'user11',
    sellerName: 'Bobur Nazarov',
    createdAt: new Date('2024-01-05'),
    type: 'service'
  }
];

let nextId = 12;

export function addItem(item: Omit<Item, 'id' | 'createdAt'>) {
  const newItem: Item = {
    ...item,
    id: nextId.toString(),
    createdAt: new Date(),
  };
  items.push(newItem);
  nextId++;
  return newItem;
}

export function getItems(): Item[] {
  return items.sort((a, b) => {
    // Featured items first, then by date
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export function getFeaturedItems(): Item[] {
  return items.filter(item => item.featured);
}

export function getItemsByCategory(category: string): Item[] {
  return items.filter(item => item.category === category);
}
