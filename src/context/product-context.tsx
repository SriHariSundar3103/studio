'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { products as initialProducts } from '@/lib/data';
import type { Product } from '@/lib/types';

export type NewProductData = {
  name: string;
  description: string;
  price: number;
  category: 'Men' | 'Women' | 'Kids';
  tags: string[];
  stockStatus: 'Available' | 'Out of Stock';
};

interface ProductContextType {
  products: Product[];
  addProduct: (productData: NewProductData) => void;
  updateProduct: (productId: string, productData: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = useCallback((productData: NewProductData) => {
    const newProduct: Product = {
      id: `hsk-new-${Date.now()}`,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      tags: productData.tags,
      stockStatus: productData.stockStatus,
      images: ['hsk-m-001-1', 'hsk-m-001-2', 'hsk-m-001-3'], // Placeholder images
      isTrending: false,
      isDealOfTheDay: false,
      rating: 4.5,
      reviewCount: 0,
      strap: productData.tags.find(t => t.toLowerCase().includes('strap')) || 'Leather',
      color: 'Black',
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  }, []);

  const updateProduct = useCallback((productId: string, productData: Partial<Product>) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === productId ? { ...p, ...productData } : p))
    );
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  }, []);
  
  const getProductById = useCallback((productId: string) => {
    return products.find(p => p.id === productId);
  }, [products]);
  
  const value = useMemo(() => ({ products, addProduct, updateProduct, deleteProduct, getProductById }), [products, addProduct, updateProduct, deleteProduct, getProductById]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
