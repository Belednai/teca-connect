import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Media = () => (
  <Layout title="Media Gallery" description="Photos and videos from our activities">
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Card className="shadow-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-serif text-3xl text-primary text-center">
              Media Gallery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Media gallery coming soon. View photos and videos from our work.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </Layout>
);

export default Media;