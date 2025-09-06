import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pages = () => (
  <Layout title="Admin - Pages" description="Manage pages">
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Card className="shadow-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-serif text-3xl text-primary text-center">
              Admin - Pages Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Pages management coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </Layout>
);

export default Pages;