'use client';

import { useState, useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import { useProducts } from '@/context/product-context';
import { categories } from '@/lib/data';
import { ProductGrid } from '@/components/product-grid';
import { ProductFilters } from '@/components/product-filters';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const { products } = useProducts();
  const [sortBy, setSortBy] = useState('trending');

  const currentCategory = categories.find(c => c.slug === category);
  
  const filteredProducts = useMemo(() => category === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === category), [products, category]);
    
  if (!currentCategory && category !== 'all') {
    notFound();
  }

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        sortableProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortableProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortableProducts.sort((a, b) => {
            const idA = parseInt(a.id.split('-').pop()?.replace('new','') || '0');
            const idB = parseInt(b.id.split('-').pop()?.replace('new','') || '0');
            return idB - idA;
        });
        break;
      case 'popularity':
        sortableProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'trending':
      default:
        sortableProducts.sort((a, b) => (b.isTrending === a.isTrending)? 0 : b.isTrending? -1 : 1);
        break;
    }
    return sortableProducts;
  }, [filteredProducts, sortBy]);

  const categoryName = currentCategory ? currentCategory.name : 'All';
  const isWomenCategory = category === 'women';

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {isWomenCategory ? (
            <BreadcrumbItem>
              <BreadcrumbPage>Women Watches</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products/all">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{categoryName} Watches</BreadcrumbPage>
            </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="border-b pb-4 mb-8">
        {isWomenCategory ? (
          <div className='text-center'>
            <h1 className="text-4xl font-bold tracking-tight text-primary">Women's Watches Collection</h1>
            <p className="mt-2 text-lg text-muted-foreground">Elegant and trendy watches for every occasion</p>
          </div>
        ) : (
          <h1 className="text-4xl font-bold tracking-tight">{categoryName} Watches</h1>
        )}
      </div>

       <div className="flex items-baseline justify-between mb-8">
        <p className="text-sm text-muted-foreground">{sortedProducts.length} products</p>
        <div className="flex items-center gap-4">
            <Select onValueChange={setSortBy} defaultValue="trending">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="newest">New Arrivals</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block">
          <ProductFilters category={category} />
        </aside>
        <main className="lg:col-span-3">
          {sortedProducts.length > 0 ? (
            <>
              <ProductGrid products={sortedProducts} />
              <div className="flex justify-center items-center mt-12 space-x-1">
                <Button variant="outline">Previous</Button>
                <Button variant="outline" size="icon">1</Button>
                <Button variant="ghost" size="icon">2</Button>
                <Button variant="ghost" size="icon">3</Button>
                <span className="p-2 text-muted-foreground">...</span>
                <Button variant="ghost" size="icon">10</Button>
                <Button variant="outline">Next</Button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold">No Products Found</h2>
              <p className="mt-2 text-muted-foreground">Try adjusting your filters or checking another category.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
