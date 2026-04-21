'use client';

import { createContext, useContext, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { products as initialProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { useFirestore, useCollection, useUserProfile } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, getDocs, writeBatch, query } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type NewProductData = Omit<Product, 'id' | 'isTrending' | 'isDealOfTheDay' | 'rating' | 'reviewCount' | 'createdAt'>;

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (productData: NewProductData) => Promise<void>;
  updateProduct: (productId: string, productData: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  getProductById: (productId: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const db = useFirestore();
  const { isAdmin, loading: isAdminLoading } = useUserProfile();
  const productsQuery = useMemo(() => db ? query(collection(db, 'products')) : null, [db]);
  const { data: productsData, loading: productsLoading } = useCollection<Product>(productsQuery);

  const products = useMemo(() => (productsData || []).map(p => ({
    ...p,
    // Firestore timestamps need to be converted to JS Dates if they exist
    createdAt: (p.createdAt as any)?.toDate ? (p.createdAt as any).toDate() : p.createdAt,
  })).sort((a, b) => (b.createdAt as any) - (a.createdAt as any)), [productsData]);


  // Seed the database with initial products if it's empty, but only for admins.
  useEffect(() => {
    const seedDatabase = async () => {
      if (!db || products.length > 0 || productsLoading || isAdminLoading || !isAdmin) return;
      
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);
      
      if (snapshot.empty) {
        console.log('Admin user detected. Seeding database with initial products...');
        const batch = writeBatch(db);
        initialProducts.forEach((product) => {
          const docRef = doc(productsRef, product.id);
          batch.set(docRef, { ...product, createdAt: serverTimestamp() });
        });
        batch.commit().catch(async (serverError) => {
          const permissionError = new FirestorePermissionError({
            path: productsRef.path,
            operation: 'create',
            requestResourceData: { note: `Seeding ${initialProducts.length} initial products.` }
          });
          errorEmitter.emit('permission-error', permissionError);
        });
      }
    };

    seedDatabase();
  }, [db, products.length, productsLoading, isAdmin, isAdminLoading]);


  const addProduct = useCallback(async (productData: NewProductData) => {
    if (!db) return;
    const newProduct: Omit<Product, 'id' | 'createdAt'> = {
      isTrending: false,
      isDealOfTheDay: false,
      rating: 4.5,
      reviewCount: 0,
      ...productData,
    };
    const productsRef = collection(db, 'products');
    addDoc(productsRef, {
      ...newProduct,
      createdAt: serverTimestamp(),
    }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: productsRef.path,
          operation: 'create',
          requestResourceData: newProduct,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }, [db]);

  const updateProduct = useCallback(async (productId: string, productData: Partial<Product>) => {
    if (!db) return;
    const productRef = doc(db, 'products', productId);
    updateDoc(productRef, productData)
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: productRef.path,
          operation: 'update',
          requestResourceData: productData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }, [db]);

  const deleteProduct = useCallback(async (productId: string) => {
    if (!db) return;
    const productRef = doc(db, 'products', productId)
    deleteDoc(productRef)
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: productRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }, [db]);

  const getProductById = useCallback((productId: string) => {
    return products?.find(p => p.id === productId);
  }, [products]);
  
  const value = useMemo(() => ({ 
    products, 
    loading: productsLoading || isAdminLoading, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    getProductById 
  }), [products, productsLoading, isAdminLoading, addProduct, updateProduct, deleteProduct, getProductById]);

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
