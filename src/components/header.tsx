"use client";

import Link from "next/link";
import {
  Menu,
  Search,
  Phone,
  PanelLeft,
} from "lucide-react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { categories, businessDetails } from "@/lib/data";

const mainNavLinks = [
  ...categories.map(c => ({ href: `/products/${c.slug}`, label: c.name })),
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", icon: PanelLeft, label: "Admin" },
];


export function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background text-foreground">
      <div className="container flex h-16 items-center px-4 md:px-6">
        
        {/* Mobile Nav Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background text-foreground">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Icons.Logo className="h-6 w-6" />
              <span className="font-bold">Hi/sky</span>
            </Link>
            <div className="mt-6 flex flex-col gap-4">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Desktop Logo */}
        <div className="hidden items-center md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.Logo className="h-8 w-8" />
            <span className="font-bold text-xl">Hi/sky</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 items-center justify-center px-4 lg:px-12">
          <div className="w-full max-w-lg">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search watches, shirts, pants & more..."
                  className="w-full rounded-md border-input bg-secondary pl-9 text-foreground focus:bg-background"
                />
              </div>
            </form>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
           <Button asChild>
              <a href={`tel:${businessDetails.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call to Order
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Admin</span>
              </Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
