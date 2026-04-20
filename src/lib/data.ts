import type { Product, Category, BusinessDetails } from './types';

export const businessDetails: BusinessDetails = {
  shop_name: "Hi/sky",
  phone: "8073324806",
  email: "kumarshiva7681@gmail.com",
  address: "Diya School Opposite, Bangalore",
  payment_mode: "Offline (Cash / GPay)",
  gpay: {
    email: "kumarshiva7681@gmail.com",
    number: "8073324806"
  }
};

export const categories: Category[] = [
  { name: 'Men', slug: 'men', image: 'category-men', description: 'Explore our collection of men\'s watches, from classic timepieces to modern smartwatches.' },
  { name: 'Women', slug: 'women', image: 'category-women', description: 'Discover elegant and stylish watches for women, perfect for any occasion.' },
  { name: 'Kids', slug: 'kids', image: 'category-kids', description: 'Fun, durable, and easy-to-read watches for the younger generation.' },
];

export const products: Product[] = [
  {
    id: 'hsk-m-001',
    name: 'Hi/sky Voyager',
    category: 'Men',
    price: 4999,
    images: ['hsk-m-001-1', 'hsk-m-001-2', 'hsk-m-001-3'],
    description: 'The Voyager is the quintessential pilot\'s watch, featuring a robust stainless steel case, a high-contrast dial with luminous hands, and a genuine leather strap. Built for adventure, ready for anything.',
    stockStatus: 'Available',
    tags: ['Formal', 'Leather Strap', 'Analog'],
    isTrending: true,
    isDealOfTheDay: false,
    rating: 4.5,
    reviewCount: 120,
    strap: 'Leather',
    color: 'Silver'
  },
  {
    id: 'hsk-m-002',
    name: 'Hi/sky Urban Classic',
    category: 'Men',
    price: 2499,
    images: ['hsk-m-002-1', 'hsk-m-002-2', 'hsk-m-002-3'],
    description: 'A masterpiece of minimalist design, the Urban Classic features a clean dial, sleek case, and a comfortable mesh bracelet. Perfect for the modern professional.',
    stockStatus: 'Available',
    tags: ['Casual', 'Formal', 'Stainless Steel'],
    isTrending: true,
    isDealOfTheDay: true,
    rating: 4.7,
    reviewCount: 250,
    strap: 'Stainless Steel',
    color: 'Silver'
  },
  {
    id: 'hsk-w-001',
    name: 'Hi/sky Aura',
    category: 'Women',
    price: 3499,
    images: ['hsk-w-001-1', 'hsk-w-001-2', 'hsk-w-001-3'],
    description: 'Elegance redefined. The Aura watch boasts a beautiful mother-of-pearl dial, rose gold case, and a soft pastel leather strap. It\'s a statement of grace and sophistication.',
    stockStatus: 'Available',
    tags: ['Formal', 'Luxury', 'Leather Strap'],
    isTrending: true,
    isDealOfTheDay: false,
    rating: 4.8,
    reviewCount: 180,
    strap: 'Leather',
    color: 'Rose Gold'
  },
  {
    id: 'hsk-w-002',
    name: 'Hi/sky Starlight',
    category: 'Women',
    price: 1999,
    images: ['hsk-w-002-1', 'hsk-w-002-2', 'hsk-w-002-3'],
    description: 'Chic and contemporary, the Starlight features a polished silver case and a sparkling crystal-studded bezel. It\'s the perfect accessory to light up your look, day or night.',
    stockStatus: 'Out of Stock',
    tags: ['Casual', 'Fashion', 'Stainless Steel'],
    isTrending: false,
    isDealOfTheDay: false,
    rating: 4.6,
    reviewCount: 95,
    strap: 'Metal',
    color: 'Silver'
  },
  {
    id: 'hsk-k-001',
    name: 'Hi/sky Junior Explorer',
    category: 'Kids',
    price: 999,
    images: ['hsk-k-001-1', 'hsk-k-001-2', 'hsk-k-001-3'],
    description: 'Built for fun and adventure! The Junior Explorer is a durable, water-resistant watch with a colorful, easy-to-read dial and a comfortable silicone strap. Learning to tell time has never been so exciting.',
    stockStatus: 'Available',
    tags: ['Sports', 'Digital', 'Kids'],
    isTrending: false,
    isDealOfTheDay: true,
    rating: 4.9,
    reviewCount: 300,
    strap: 'Silicone',
    color: 'Blue'
  },
    {
    id: 'hsk-m-003',
    name: 'Hi/sky Chrono-Sport',
    category: 'Men',
    price: 5999,
    images: ['hsk-m-003-1', 'hsk-m-003-2', 'hsk-m-003-3'],
    description: 'Engineered for performance, the Chrono-Sport combines aggressive styling with precision chronograph functionality. A rugged silicone strap and water resistance up to 100m make it the perfect companion for any challenge.',
    stockStatus: 'Available',
    tags: ['Sports', 'Chronograph', 'Silicone Strap'],
    isTrending: false,
    isDealOfTheDay: false,
    rating: 4.4,
    reviewCount: 88,
    strap: 'Silicone',
    color: 'Black'
  },
  {
    id: 'hsk-w-003',
    name: 'Hi/sky Petale',
    category: 'Women',
    price: 2799,
    images: ['hsk-w-003-1', 'hsk-w-003-2', 'hsk-w-003-3'],
    description: 'Delicate and feminine, the Petale features a floral-engraved dial and a slender mesh strap in a stunning gold finish. A truly charming timepiece for the modern woman.',
    stockStatus: 'Available',
    tags: ['Casual', 'Fashion', 'Gold'],
    isTrending: true,
    isDealOfTheDay: false,
    rating: 4.7,
    reviewCount: 150,
    strap: 'Mesh',
    color: 'Gold'
  },
    {
    id: 'hsk-k-002',
    name: 'Hi/sky Time Teacher',
    category: 'Kids',
    price: 799,
    images: ['hsk-k-002-1', 'hsk-k-002-2', 'hsk-k-002-3'],
    description: 'Make learning to tell time a breeze with the Time Teacher watch. Featuring labeled "HOUR" and "MINUTE" hands and a clear, numbered dial, it\'s the perfect first watch for any child.',
    stockStatus: 'Available',
    tags: ['Educational', 'Kids', 'Analog'],
    isTrending: false,
    isDealOfTheDay: false,
    rating: 4.9,
    reviewCount: 412,
    strap: 'Fabric',
    color: 'Pink'
  }
];
