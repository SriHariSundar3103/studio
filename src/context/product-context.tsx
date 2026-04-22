'use client';

import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import type { Product } from '@/lib/types';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useUserProfile } from '@/firebase/auth/use-user-profile';
import { addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

const ProductContext = createContext({
  products: [] as Product[],
  loading: false,
  addProduct: async () => {},
  updateProduct: async () => {},
  deleteProduct: async () => {},
  getProductById: (id: string) => undefined as Product | undefined,
} as any);

export function ProductProvider({ children }: { children: ReactNode }) {
  const db = useFirestore();
  const { isAdmin, loading: profileLoading } = useUserProfile();

  const productsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return collection(db, 'products') as any;
  }, [db]);

  const { data: productsData, isLoading: collectionLoading, error } = useCollection<Product>(productsQuery);

  const products = useMemo(() => productsData || [], [productsData]);

  const addProduct = useCallback(async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (!isAdmin || !db) return;
    await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: serverTimestamp(),
      isTrending: false,
      isDealOfTheDay: false,
      rating: 0,
      reviewCount: 0,
      viewCount: 0,
    });
  }, [isAdmin, db]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    if (!isAdmin || !db) return;
    await updateDoc(doc(db, 'products', id), updates);
  }, [isAdmin, db]);

  const deleteProduct = useCallback(async (id: string) => {
    if (!isAdmin || !db) return;
    await deleteDoc(doc(db, 'products', id));
  }, [isAdmin, db]);

  const getProductById = useCallback((id: string) => {
    return products.find((p: Product) => p.id === id);
  }, [products]);

  const contextValue = {
    products,
    loading: collectionLoading || profileLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  return context;
}

