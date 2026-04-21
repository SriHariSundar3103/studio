export type Product = {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Kids';
  productType: 'Watch' | 'Shirt' | 'Pant';
  price: number;
  images: string[];
  description: string;
  stockStatus: 'Available' | 'Out of Stock';
  tags: string[];
  isTrending: boolean;
  isDealOfTheDay: boolean;
  rating: number;
  reviewCount: number;
  color: string;
  sizes?: string[];
  fit?: string;
  strap?: string;
  sleeve?: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  } | Date;
};

export type Category = {
  name: 'Men' | 'Women' | 'Kids';
  slug: 'men' | 'women' | 'kids';
  image: string;
  description: string;
}

export type SubCategory = {
  name: string;
  slug: string;
};

export type BusinessDetails = {
  shop_name: string;
  phone: string;
  email: string;
  address: string;
  payment_mode: string;
  gpay: {
    email: string;
    number: string;
  };
}
