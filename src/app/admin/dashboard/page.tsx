import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             <Card>
                <CardHeader>
                    <CardTitle>Manage Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Add, edit, and remove products from your store.</p>
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <Link href="/admin/products">
                            Go to Products <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
             </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Welcome, Admin!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This is your admin dashboard. You can manage products, view orders, and more from here.</p>
                </CardContent>
             </Card>
        </div>
    </div>
  );
}
