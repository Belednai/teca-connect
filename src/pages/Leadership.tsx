import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";
import { leaders } from "@/lib/data";

const Leadership = () => {
  const associationLeaders = leaders.filter(leader => leader.group === 'association');
  const resettlementLeaders = leaders.filter(leader => leader.group === 'resettlement');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const LeaderCard = ({ leader }: { leader: typeof leaders[0] }) => (
    <Card className="shadow-card hover:shadow-elegant transition-smooth">
      <CardHeader className="text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src={leader.photo} alt={leader.name} />
          <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
            {getInitials(leader.name)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="font-serif text-xl text-primary">
          {leader.name}
        </CardTitle>
        <Badge variant="secondary" className="w-fit mx-auto">
          {leader.title}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center leading-relaxed mb-4">
          {leader.bio}
        </CardDescription>
        
        {/* Contact info placeholder */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-center">
            <Mail className="h-4 w-4 mr-2" />
            <span>Available upon request</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout
      title="Leadership"
      description="Meet the dedicated leaders guiding TECA's mission and resettlement efforts"
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <Card className="shadow-card">
              <CardContent className="pt-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  TECA's leadership combines experienced community organizers, skilled professionals, 
                  and passionate advocates who volunteer their time and expertise to serve our community. 
                  Our leaders are elected by and accountable to the community they serve.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Top 3 Leaders Spotlight */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Executive Leadership
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet our top leadership team guiding TECA's strategic direction
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {associationLeaders.slice(0, 3).map((leader) => (
                <LeaderCard key={leader.id} leader={leader} />
              ))}
            </div>
          </div>

          {/* Leadership Tabs */}
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="association" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-12">
                <TabsTrigger value="association" className="text-base">
                  Association Leadership
                </TabsTrigger>
                <TabsTrigger value="resettlement" className="text-base">
                  Resettlement Leadership
                </TabsTrigger>
              </TabsList>

              <TabsContent value="association">
                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-bold text-primary text-center mb-4">
                    Association Leadership
                  </h2>
                  <p className="text-center text-muted-foreground mb-8">
                    The elected leaders who oversee TECA's overall governance, strategy, and operations
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {associationLeaders.map((leader) => (
                    <LeaderCard key={leader.id} leader={leader} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resettlement">
                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-bold text-primary text-center mb-4">
                    Resettlement Leadership
                  </h2>
                  <p className="text-center text-muted-foreground mb-8">
                    Specialized leaders coordinating resettlement activities and payam development
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resettlementLeaders.map((leader) => (
                    <LeaderCard key={leader.id} leader={leader} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Leadership Principles */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-serif text-3xl text-primary text-center">
                  Our Leadership Principles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                        Democratic Governance
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        All leadership positions are elected through transparent democratic processes, 
                        with regular accountability sessions and community feedback mechanisms.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                        Transparency & Accountability
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Leaders operate with full transparency, providing regular reports on activities, 
                        finances, and decision-making processes to the community.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                        Inclusive Representation
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Our leadership reflects the diversity of our community, including representation 
                        across gender, age, payam affiliation, and professional backgrounds.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                        Service-Oriented Leadership
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Leaders serve the community's interests above personal gain, dedicating their 
                        time and skills as volunteers for the collective good.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Leadership */}
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <Card className="shadow-card bg-primary/5">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-primary">
                  Connect with Leadership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Have questions or suggestions for TECA leadership? We welcome community input 
                  and encourage open dialogue.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <span>leadership@teca-juba.org</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    <span>Community meetings every first Sunday</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span>Juba Community Center</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leadership;