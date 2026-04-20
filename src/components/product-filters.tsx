"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface ProductFiltersProps {
  category: string;
}

// Default filters (for Men, Kids, All)
const defaultStyles = ['Formal', 'Casual', 'Sports', 'Luxury', 'Fashion'];
const defaultStrapTypes = ['Leather', 'Stainless Steel', 'Silicone', 'Mesh', 'Fabric'];

// Women-specific filters
const womenPriceRanges = ["Under ₹1000", "₹1000–₹3000", "Above ₹3000"];
const womenStyles = ["Casual", "Formal", "Luxury", "Fashion", "Party", "Office"];
const womenStrapTypes = ["Metal", "Leather", "Ceramic", "Mesh"];
const womenColors = ["Rose Gold", "Gold", "Silver", "Black", "Pink"];


export function ProductFilters({ category }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const isWomenCategory = category === 'women';

  const styles = isWomenCategory ? womenStyles : defaultStyles;
  const strapTypes = isWomenCategory ? womenStrapTypes : defaultStrapTypes;

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
          {isWomenCategory ? (
            <RadioGroup defaultValue="any">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="price-any" />
                <Label htmlFor="price-any" className="font-normal">Any Price</Label>
              </div>
              {womenPriceRanges.map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <RadioGroupItem value={range} id={`price-${range}`} />
                  <Label htmlFor={`price-${range}`} className="font-normal">{range}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <>
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
            </>
          )}
        </div>
        
        {isWomenCategory && (
          <div className="space-y-3">
            <Label className="font-semibold">Color</Label>
            <div className="space-y-2">
              {womenColors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox id={`color-${color.toLowerCase().replace(' ', '-')}`} />
                  <Label htmlFor={`color-${color.toLowerCase().replace(' ', '-')}`} className="font-normal">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Label className="font-semibold">Style</Label>
          <div className="space-y-2">
            {styles.map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox id={`style-${style.toLowerCase()}`} />
                <Label
                  htmlFor={`style-${style.toLowerCase()}`}
                  className="font-normal"
                >
                  {style}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="font-semibold">Strap</Label>
          <div className="space-y-2">
            {strapTypes.map((strap) => (
              <div key={strap} className="flex items-center space-x-2">
                <Checkbox id={`strap-${strap.toLowerCase().replace(' ', '-')}`} />
                <Label
                  htmlFor={`strap-${strap.toLowerCase().replace(' ', '-')}`}
                  className="font-normal"
                >
                  {strap}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="font-semibold">Availability</Label>
           <div className="flex items-center space-x-2">
                <Checkbox id="availability-stock" />
                <Label
                  htmlFor="availability-stock"
                  className="font-normal"
                >
                  In Stock Only
                </Label>
              </div>
        </div>
      </CardContent>
    </Card>
  );
}
