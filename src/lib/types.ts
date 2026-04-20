export type Product = {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Kids';
  price: number;
  images: string[];
  description: string;
  stockStatus: 'Available' | 'Out of Stock';
  tags: string[];
  isTrending: boolean;
  isDealOfTheDay: boolean;
  rating: number;
  reviewCount: number;
};

export type Category = {
  name: 'Men' | 'Women' | 'Kids';
  slug: 'men' | 'women' | 'kids';
  image: string;
  description: string;
}

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
