import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => (
  <Layout title="Admin Dashboard" description="TECA Administration">
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Card className="shadow-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-serif text-3xl text-primary text-center">
              Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Admin functionality coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </Layout>
);

export default Dashboard;