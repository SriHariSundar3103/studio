import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroBanner() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner');

  return (
    <section className="relative w-full h-[400px]">
      {heroImage && (
         <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
      <div className="relative h-full flex flex-col justify-center items-start container text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-2xl">
          Timeless Style, Modern Precision
        </h1>
        <p className="mt-4 max-w-xl text-lg text-neutral-200">
          Discover our exclusive collection of watches that blend classic design with cutting-edge technology.
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/products/men">
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
