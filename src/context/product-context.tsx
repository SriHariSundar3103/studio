'use client';

import { createContext, useContext, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { products as initialProducts } from '@/lib/data';
import type { Product, Image as ImageType } from '@/lib/types';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useUserProfile } from '@/firebase/auth/use-user-profile';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, getDocs, writeBatch, query } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export type NewProductData = Omit<Product, 'id' | 'isTrending' | 'isDealOfTheDay' | 'rating' | 'reviewCount' | 'createdAt' | 'viewCount'>;
export type NewImageData = Omit<ImageType, 'id' | 'createdAt'>;

interface ProductContextType {
  products: Product[];
  images: ImageType[];
  loading: boolean;
  addProduct: (productData: NewProductData) => Promise<void>;
  updateProduct: (productId: string, productData: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  getProductById: (productId: string) => Product | undefined;
  addImage: (imageData: NewImageData) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const db = useFirestore();
  const { isAdmin, loading: isAdminLoading } = useUserProfile();
  
  const productsQuery = useMemoFirebase(() => db ? query(collection(db, 'products')) : null, [db]);
  const { data: productsData, loading: productsLoading } = useCollection<Product>(productsQuery);

  const imagesQuery = useMemoFirebase(() => db ? query(collection(db, 'images')) : null, [db]);
  const { data: imagesData, loading: imagesLoading } = useCollection<ImageType>(imagesQuery);

  const products = useMemo(() => (productsData || []).map(p => ({
    ...p,
    createdAt: (p.createdAt as any)?.toDate ? (p.createdAt as any).toDate() : p.createdAt,
  })).sort((a, b) => (b.createdAt as any) - (a.createdAt as any)), [productsData]);

  const images = useMemo(() => (imagesData || []).map(i => ({
    ...i,
    createdAt: (i.createdAt as any)?.toDate ? (i.createdAt as any).toDate() : i.createdAt,
  })), [imagesData]);

  useEffect(() => {
    const seedDatabase = async () => {
        if (!db || isAdminLoading || !isAdmin) return;

        // Seed Products
        if (products.length === 0 && !productsLoading) {
            const productsRef = collection(db, "products");
            const snapshot = await getDocs(productsRef);
            if (snapshot.empty) {
                console.log('Admin user detected. Seeding database with initial products...');
                const batch = writeBatch(db);
                initialProducts.forEach((product) => {
                    const docRef = doc(productsRef, product.id);
                    batch.set(docRef, { ...product, createdAt: serverTimestamp(), viewCount: 0 });
                });
                await batch.commit().catch(async (serverError) => {
                    const permissionError = new FirestorePermissionError({
                        path: productsRef.path,
                        operation: 'write',
                        requestResourceData: { note: `Seeding ${initialProducts.length} initial products.` }
                    });
                    errorEmitter.emit('permission-error', permissionError);
                });
            }
        }

        // Seed Images
        if (images.length === 0 && !imagesLoading) {
            const imagesRef = collection(db, "images");
            const snapshot = await getDocs(imagesRef);
            if (snapshot.empty) {
                console.log('Seeding database with initial images...');
                const batch = writeBatch(db);
                PlaceHolderImages.forEach((image) => {
                    const docRef = doc(imagesRef, image.id);
                    batch.set(docRef, { url: image.imageUrl, altText: image.description, createdAt: serverTimestamp() });
                });
                await batch.commit().catch(async (serverError) => {
                    const permissionError = new FirestorePermissionError({
                        path: imagesRef.path,
                        operation: 'write',
                        requestResourceData: { note: `Seeding ${PlaceHolderImages.length} initial images.` }
                    });
                    errorEmitter.emit('permission-error', permissionError);
                });
            }
        }
    };

    seedDatabase();
  }, [db, products.length, productsLoading, images.length, imagesLoading, isAdmin, isAdminLoading]);


  const addProduct = useCallback(async (productData: NewProductData) => {
    if (!db) return;
    const newProduct: Omit<Product, 'id' | 'createdAt'> = {
      isTrending: false,
      isDealOfTheDay: false,
      rating: 4.5,
      reviewCount: 0,
      viewCount: 0,
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

  const addImage = useCallback(async (imageData: NewImageData) => {
    if (!db) return;
    const imagesRef = collection(db, 'images');
    addDoc(imagesRef, {
        ...imageData,
        createdAt: serverTimestamp(),
    }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: imagesRef.path,
            operation: 'create',
            requestResourceData: imageData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
  }, [db]);
  
  const value = useMemo(() => ({ 
    products,
    images,
    loading: productsLoading || isAdminLoading || imagesLoading, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    getProductById,
    addImage,
  }), [products, images, productsLoading, isAdminLoading, imagesLoading, addProduct, updateProduct, deleteProduct, getProductById, addImage]);

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

    