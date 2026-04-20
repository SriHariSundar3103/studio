import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { businessDetails } from '@/lib/data';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'hsk-m-001-2');

  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              About {businessDetails.shop_name}
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Welcome to Hi/sky, where timekeeping transcends function to become an expression of personal style. Founded in Bangalore, our passion is to bring you a curated collection of watches that blend timeless elegance with modern precision, all at an accessible price point.
            </p>
            <div className="mt-8 space-y-4 text-gray-600">
              <p>
                We believe a watch is more than just a device to tell time; it's a companion on your journey, a statement piece, and a reflection of your personality. That's why we meticulously select each piece in our collection, ensuring it meets our high standards of quality, design, and durability.
              </p>
              <p>
                From sophisticated formal wear to rugged sports models and fun, vibrant watches for kids, our collection is designed to cater to every taste and occasion. At Hi/sky, we're not just selling watches—we're helping you find the perfect timepiece to celebrate your moments.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            {aboutImage && (
              <div className="aspect-square relative rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={aboutImage.imageUrl}
                  alt="Inside of a watch"
                  fill
                  className="object-cover"
                  data-ai-hint="watch gears"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
