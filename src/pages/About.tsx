import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Target, Shield } from "lucide-react";

const About = () => {
  return (
    <Layout
      title="About TECA"
      description="Learn about our mission, vision, and commitment to the Twic East Community"
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Mission & Vision */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="shadow-card">
                <CardHeader className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-2xl text-primary">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground leading-relaxed">
                    To facilitate the voluntary resettlement of Twic East communities in Juba 
                    through transparent, community-driven development programs that build 
                    sustainable livelihoods and preserve our cultural heritage.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-2xl text-primary">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground leading-relaxed">
                    A thriving Twic East community where families live in dignity, children 
                    receive quality education, and economic opportunities flourish while 
                    maintaining strong cultural identity and unity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide every decision and action we take
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Transparency",
                  description: "Open and honest communication about all activities, finances, and decision-making processes."
                },
                {
                  icon: Users,
                  title: "Unity",
                  description: "Bringing together all Twic East communities regardless of location or background."
                },
                {
                  icon: Target,
                  title: "Accountability",
                  description: "Responsible stewardship of resources and commitment to measurable outcomes."
                },
                {
                  icon: Heart,
                  title: "Compassion",
                  description: "Caring for the most vulnerable and ensuring no one is left behind in our progress."
                }
              ].map((value, index) => (
                <Card key={index} className="text-center shadow-card hover:shadow-elegant transition-smooth">
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-serif text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Our Story */}
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-serif text-3xl text-primary text-center mb-6">
                  Our Story
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    The Twic East Community Association (TECA) was born from a shared vision of hope, 
                    unity, and sustainable development. Established by members of the Twic East community 
                    living in Juba, TECA represents the collective aspirations of families who dream 
                    of returning to their ancestral lands with dignity and opportunity.
                  </p>
                  
                  <p>
                    Our journey began with simple community meetings where elders, youth, women, and 
                    men gathered to discuss the challenges and opportunities of resettlement. What 
                    emerged was a clear consensus: any return to Twic East must be voluntary, 
                    well-planned, and built on solid foundations that ensure long-term success.
                  </p>
                  
                  <p>
                    Today, TECA serves as the bridge between aspiration and reality, coordinating 
                    comprehensive development programs across six payams: Ajuong, Kongor, Lith, 
                    Nyuak, Pakeer, and Pawuoi. Each payam has unique needs and priorities, but all 
                    share the common goal of creating sustainable, thriving communities.
                  </p>
                  
                  <p>
                    We believe that true development comes from within the community itself. Every 
                    project we undertake is guided by community input, managed with full transparency, 
                    and designed to build local capacity. Our approach ensures that the infrastructure 
                    we build today will serve generations to come.
                  </p>
                  
                  <p>
                    TECA is more than an organization—we are a movement of hope, a testament to what 
                    can be achieved when communities unite around shared values and common purpose. 
                    Together, we are not just building schools, wells, and roads; we are building 
                    the foundation for a brighter future.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;