'use client';

import { ProductProvider } from '@/context/product-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ProductProvider>{children}</ProductProvider>;
}
