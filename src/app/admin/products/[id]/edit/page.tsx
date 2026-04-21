'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/lib/data';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { generateProductDescription } from '@/ai/flows/admin-product-description-generator';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/context/product-context';

const productSchema = z.object({
  productName: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  priceInr: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.enum(['Men', 'Women', 'Kids']),
  tags: z.string(),
  stockStatus: z.enum(['Available', 'Out of Stock']),
  images: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const { getProductById, updateProduct } = useProducts();
  const [isGenerating, setIsGenerating] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (id) {
      const productToEdit = getProductById(id);
      if (productToEdit) {
        setProduct(productToEdit);
        form.reset({
          productName: productToEdit.name,
          description: productToEdit.description,
          priceInr: productToEdit.price,
          category: productToEdit.category,
          tags: productToEdit.tags.join(', '),
          stockStatus: productToEdit.stockStatus,
          images: productToEdit.images.join(', '),
        });
      } else {
        toast({
            variant: 'destructive',
            title: 'Product not found',
            description: 'Could not find a product with that ID.',
        });
        router.push('/admin/products');
      }
    }
  }, [id, router, toast, form, getProductById]);

  const onSubmit = (data: ProductFormValues) => {
    const updatedData: Partial<Product> = {
        name: data.productName,
        description: data.description,
        price: data.priceInr,
        category: data.category,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        stockStatus: data.stockStatus,
        images: data.images ? data.images.split(',').map(img => img.trim()).filter(Boolean) : product?.images,
    };

    updateProduct(id, updatedData);
    
    toast({
      title: 'Product Updated',
      description: `${data.productName} has been successfully updated.`,
    });
    router.push('/admin/products');
  };
  
  const handleGenerateDescription = async () => {
    const values = form.getValues();
    if (!values.productName || !values.priceInr) {
        toast({
            variant: 'destructive',
            title: 'Missing Information',
            description: 'Please enter a Product Name and Price before generating a description.',
        });
        return;
    }

    setIsGenerating(true);
    try {
        const result = await generateProductDescription({
            ...values,
            tags: values.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        });
        form.setValue('description', result.description);
        toast({
            title: 'Description Generated!',
            description: 'The AI has crafted a new product description.',
        });
    } catch (error) {
        console.error('Failed to generate description:', error);
        toast({
            variant: 'destructive',
            title: 'Generation Failed',
            description: 'Could not generate a description at this time.',
        });
    } finally {
        setIsGenerating(false);
    }
  };

  if (!product) {
    return (
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-48" />
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8 mt-4">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card><CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader><CardContent><Skeleton className="h-48 w-full" /></CardContent></Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card><CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
       <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/products">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Link>
             </Button>
             <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Edit: {product.name}
             </h1>
             <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" type="button" onClick={() => router.push('/admin/products')}>
                    Cancel
                </Button>
                <Button size="sm" type="submit">Save Changes</Button>
             </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8 mt-4">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Modify the details for this product.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" {...form.register('productName')} />
                    {form.formState.errors.productName && <p className="text-sm text-destructive">{form.formState.errors.productName.message}</p>}
                  </div>
                   <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="description">Description</Label>
                        <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isGenerating}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            {isGenerating ? 'Generating...' : 'Generate with AI'}
                        </Button>
                    </div>
                    <Textarea id="description" {...form.register('description')} rows={5}/>
                     {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
               <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="stockStatus">Status</Label>
                      <Controller
                        control={form.control}
                        name="stockStatus"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id="stockStatus" aria-label="Select status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Available">Available</SelectItem>
                                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Product Category</Label>
                    <Controller
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id="category" aria-label="Select category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(c => <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        )}
                      />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="priceInr">Price (INR)</Label>
                    <Input id="priceInr" type="number" {...form.register('priceInr')} />
                     {form.formState.errors.priceInr && <p className="text-sm text-destructive">{form.formState.errors.priceInr.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input id="tags" {...form.register('tags')} placeholder="e.g. Formal, Leather" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="images">Image IDs (comma-separated)</Label>
                    <Input id="images" {...form.register('images')} placeholder="e.g. hsk-m-001-1,hsk-m-001-2" />
                     <p className="text-xs text-muted-foreground">Find IDs in src/lib/placeholder-images.json</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden mt-4">
            <Button variant="outline" size="sm" type="button" onClick={() => router.push('/admin/products')}>
                Cancel
            </Button>
            <Button size="sm" type="submit">Save Changes</Button>
          </div>
        </form>
    </div>
  );
}
