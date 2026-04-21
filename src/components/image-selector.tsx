'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';

interface ImageSelectorProps {
  selectedImages: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export function ImageSelector({ selectedImages, onSelectionChange }: ImageSelectorProps) {
  const handleImageClick = (id: string) => {
    const newSelection = selectedImages.includes(id)
      ? selectedImages.filter((imageId) => imageId !== id)
      : [...selectedImages, id];
    onSelectionChange(newSelection);
  };

  const productImages = PlaceHolderImages.filter(
    (img) => !['hero-banner', 'category-men', 'category-women', 'category-kids'].includes(img.id)
  );

  return (
    <ScrollArea className="h-72 rounded-md border">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-4">
        {productImages.map((image) => {
          const isSelected = selectedImages.includes(image.id);
          return (
            <div
              key={image.id}
              className={cn(
                'relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all',
                isSelected ? 'border-primary ring-2 ring-primary/50' : 'border-border'
              )}
              onClick={() => handleImageClick(image.id)}
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                data-ai-hint={image.imageHint}
              />
              <div
                className={cn(
                  'absolute inset-0 transition-colors',
                  isSelected ? 'bg-black/30' : 'bg-black/0 hover:bg-black/10'
                )}
              />
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 bg-primary rounded-full h-5 w-5 flex items-center justify-center text-primary-foreground">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                <p className="text-white text-[10px] truncate" title={image.id}>{image.id}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
