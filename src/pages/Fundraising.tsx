import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Fundraising = () => (
  <Layout title="Fundraising" description="Support TECA's resettlement mission">
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Card className="shadow-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-serif text-3xl text-primary text-center">
              Support Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Fundraising page coming soon. Help us build sustainable communities in Twic East.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </Layout>
);

export default Fundraising;