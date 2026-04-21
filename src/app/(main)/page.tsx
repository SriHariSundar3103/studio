'use client';

import { HeroBanner } from '@/components/hero-banner';
import { CategoryShowcase } from '@/components/category-showcase';
import { ProductGrid } from '@/components/product-grid';
import { useProducts } from '@/context/product-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const { products } = useProducts();
  const trendingProducts = products.filter(p => p.isTrending);
  const dealOfTheDayProducts = products.filter(p => p.isDealOfTheDay);

  return (
    <>
      <HeroBanner />
      <div className="container py-12 md:py-16 space-y-16">
        <section>
          <CategoryShowcase />
        </section>

        {trendingProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
              <Button variant="outline" asChild>
                <Link href="/products/all">View All</Link>
              </Button>
            </div>
            <ProductGrid products={trendingProducts} />
          </section>
        )}

        {dealOfTheDayProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Deals of the Day</h2>
               <Button variant="outline" asChild>
                <Link href="/deals">View All Deals</Link>
              </Button>
            </div>
            <ProductGrid products={dealOfTheDayProducts} />
          </section>
        )}
      </div>
    </>
  );
}
