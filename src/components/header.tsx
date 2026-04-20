"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
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
import { categories } from "@/lib/data";

const mainNavLinks = [
  ...categories.map(c => ({ href: `/products/${c.slug}`, label: c.name })),
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const userNavLinks = [
  { href: "/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/admin", icon: PanelLeft, label: "Admin" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center px-4 md:px-6">
        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-primary text-primary-foreground">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Icons.Logo className="h-6 w-6" />
              <span className="font-bold">Hi/sky</span>
            </Link>
            <div className="mt-6 flex flex-col gap-4">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-accent",
                    pathname === link.href ? "text-accent" : "text-primary-foreground/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Nav */}
        <div className="hidden items-center md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.Logo className="h-6 w-6" />
            <span className="font-bold">Hi/sky</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-accent",
                  pathname === link.href ? "text-accent" : "text-primary-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 items-center justify-center px-4 lg:px-12">
          <div className="w-full max-w-md">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search watches..."
                  className="w-full rounded-md bg-background pl-9 text-foreground"
                />
              </div>
            </form>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          {userNavLinks.map((link) => (
            <Button key={link.href} variant="ghost" size="icon" asChild>
              <Link href={link.href}>
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
