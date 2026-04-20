import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, Eye, Phone } from 'lucide-react';
import { businessDetails } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const placeholderImage = PlaceHolderImages.find(img => img.id === product.images[0]);

  return (
    <Card className="h-full overflow-hidden transition-all duration-200 group hover:shadow-xl flex flex-col">
      <CardContent className="p-0 relative">
        <div className="relative aspect-square">
          <Link href={`/product/${product.id}`} className="block w-full h-full">
            {placeholderImage && (
              <Image
                src={placeholderImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={placeholderImage.imageHint}
              />
            )}
          </Link>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none"></div>
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            {product.isTrending && (
              <Badge variant="default" className="bg-accent text-accent-foreground">Trending</Badge>
            )}
            {product.isDealOfTheDay && (
              <Badge variant="destructive">Deal</Badge>
            )}
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                  <Heart className="h-5 w-5"/>
                  <span className="sr-only">Wishlist</span>
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                  <Eye className="h-5 w-5"/>
                  <span className="sr-only">Quick View</span>
              </Button>
          </div>
        </div>
      </CardContent>
      <div className="p-4 space-y-2 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold tracking-tight">
            <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
                {product.name}
            </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-bold">₹{product.price.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span>{product.rating}</span>
            <span className="text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>
        <Button asChild className="w-full mt-2">
            <a href={`tel:${businessDetails.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call to Order
            </a>
        </Button>
      </div>
    </Card>
  );
}
