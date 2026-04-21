import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function CategoryShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => {
        const categoryImage = PlaceHolderImages.find(img => img.id === category.image);
        return (
          <Link href={`/products/${category.slug}`} key={category.slug} className="group block">
            <Card className="relative overflow-hidden h-full transition-all duration-300 hover:shadow-xl">
              {categoryImage && (
                <Image
                  src={categoryImage.imageUrl}
                  alt={category.name}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={categoryImage.imageHint}
                />
              )}
               <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-end p-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    {category.name === 'Men' ? "Men's Collection" : `${category.name} Watches`}
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </CardTitle>
                </CardHeader>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
