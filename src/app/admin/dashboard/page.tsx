import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                 <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                 <Button asChild variant="outline" className="ml-auto">
                    <Link href="/">Back to Shop</Link>
                 </Button>
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Welcome, Admin!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>This is your admin dashboard. You can manage products, view orders, and more from here.</p>
                    </CardContent>
                 </Card>
            </main>
        </div>
    </div>
  );
}
