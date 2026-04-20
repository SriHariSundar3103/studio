import { notFound } from 'next/navigation';
import { products, categories } from '@/lib/data';
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


export async function generateStaticParams() {
  const allCategories = categories.map((category) => ({
    category: category.slug,
  }));
  return [...allCategories, { category: 'all' }];
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;

  const currentCategory = categories.find(c => c.slug === category);
  
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === category);
    
  if (!currentCategory && category !== 'all') {
    notFound();
  }

  const categoryName = currentCategory ? currentCategory.name : 'All';

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products/all">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{categoryName} Watches</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{categoryName} Watches</h1>
        <p className="text-muted-foreground">{filteredProducts.length} products</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block">
          <ProductFilters />
        </aside>
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
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
