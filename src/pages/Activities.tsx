import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Activities = () => (
  <Layout title="Activities" description="All resettlement activities across payams">
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Card className="shadow-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-serif text-3xl text-primary text-center">
              Resettlement Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Activities dashboard coming soon. Track all projects across payams.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </Layout>
);

export default Activities;