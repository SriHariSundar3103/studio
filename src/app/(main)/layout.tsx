import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { categories } from "@/lib/data";

function SecondaryNav() {
  return (
    <nav className="bg-secondary border-b">
      <div className="container flex items-center justify-center h-10 px-4 md:px-6">
        <div className="flex items-center space-x-8 text-sm font-medium">
          {categories.map((link) => (
            <Link
              key={link.slug}
              href={`/products/${link.slug}`}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SecondaryNav />
      <main className="flex-grow bg-background">
        {children}
      </main>
      <Footer />
    </div>
  );
}
