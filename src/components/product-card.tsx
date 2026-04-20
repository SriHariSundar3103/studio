import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const placeholderImage = PlaceHolderImages.find(img => img.id === product.images[0]);

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-200 group-hover:shadow-xl">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            {placeholderImage && (
              <Image
                src={placeholderImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={placeholderImage.imageHint}
              />
            )}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {product.isTrending && (
                <Badge variant="default" className="bg-accent text-accent-foreground">Trending</Badge>
              )}
              {product.isDealOfTheDay && (
                <Badge variant="destructive">Deal</Badge>
              )}
            </div>
          </div>
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">₹{product.price.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span>{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount})</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
