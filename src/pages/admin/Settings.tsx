import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => (
  <Layout title="Admin - Settings" description="Manage settings">
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Card className="shadow-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-serif text-3xl text-primary text-center">
              Admin - Settings Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Settings management coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </Layout>
);

export default Settings;