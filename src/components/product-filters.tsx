"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const styles = ['Formal', 'Casual', 'Sports', 'Luxury', 'Fashion'];

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 6000]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Filters
          <Button variant="ghost" size="sm">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="font-semibold">Price Range</Label>
          <Slider
            min={0}
            max={10000}
            step={500}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
        <div className="space-y-3">
          <Label className="font-semibold">Style</Label>
          <div className="space-y-2">
            {styles.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox id={`style-${style}`} />
                <label
                  htmlFor={`style-${style}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {style}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Label className="font-semibold">Availability</Label>
           <div className="flex items-center space-x-2">
                <Checkbox id="availability-stock" />
                <label
                  htmlFor="availability-stock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  In Stock Only
                </label>
              </div>
        </div>
      </CardContent>
    </Card>
  );
}
