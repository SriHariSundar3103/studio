import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, Phone, Heart } from 'lucide-react';
import { ProductRecommendations } from '@/components/product-recommendations';
import { Separator } from '@/components/ui/separator';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const productImages = product.images.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);

  return (
    <div className="container py-8 md:py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products/${product.category.toLowerCase()}`}>{product.category} Watches</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="grid gap-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            {productImages[0] && (
              <Image
                src={productImages[0].imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={productImages[0].imageHint}
              />
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {productImages.slice(1).map((img, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                {img && (
                  <Image
                    src={img.imageUrl}
                    alt={`${product.name} view ${index + 2}`}
                    fill
                    className="object-cover"
                    data-ai-hint={img.imageHint}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-5" />
                 <div className="flex items-center gap-2">
                    {product.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                 </div>
            </div>
          </div>

          <p className="text-4xl font-bold">₹{product.price.toLocaleString()}</p>
          
          <div className="flex items-center gap-2">
            <CheckCircle className={`w-5 h-5 ${product.stockStatus === 'Available' ? 'text-green-600' : 'text-red-600'}`} />
            <span className={`font-semibold ${product.stockStatus === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                {product.stockStatus}
            </span>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1">
              <Phone className="mr-2 h-5 w-5" /> Call Now to Order
            </Button>
            <Button size="lg" variant="outline" className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Order via GPay
            </Button>
             <Button size="lg" variant="outline" className="px-4">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to Wishlist</span>
            </Button>
          </div>
        </div>
      </div>
      
      <Separator className="my-12" />

      <ProductRecommendations product={product} />
    </div>
  );
}
