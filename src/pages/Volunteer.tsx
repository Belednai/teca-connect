import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Volunteer = () => (
  <Layout title="Volunteer" description="Join our community efforts">
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Card className="shadow-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-serif text-3xl text-primary text-center">
              Volunteer With Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Volunteer opportunities coming soon. Help build our community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </Layout>
);

export default Volunteer;