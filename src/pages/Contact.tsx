import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => (
  <Layout title="Contact Us" description="Get in touch with TECA">
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Card className="shadow-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-serif text-3xl text-primary text-center">
              Contact TECA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Contact form coming soon. Reach out with questions or suggestions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </Layout>
);

export default Contact;