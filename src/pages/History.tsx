import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Home, Lightbulb } from "lucide-react";

const History = () => {
  const timeline = [
    {
      year: "2019",
      title: "Community Consultations Begin",
      description: "Initial meetings held among Twic East community members in Juba to discuss the possibility of organized resettlement.",
      icon: Users,
      type: "foundation"
    },
    {
      year: "2020",
      title: "TECA Officially Established",
      description: "Formal establishment of Twic East Community Association with elected leadership and defined mission.",
      icon: Home,
      type: "milestone"
    },
    {
      year: "2021",
      title: "Payam Structure Development",
      description: "Creation of the six-payam organizational structure: Ajuong, Kongor, Lith, Nyuak, Pakeer, and Pawuoi.",
      icon: Lightbulb,
      type: "development"
    },
    {
      year: "2022",
      title: "First Infrastructure Projects",
      description: "Launch of pilot water well projects and community needs assessments across all payams.",
      icon: Clock,
      type: "project"
    },
    {
      year: "2023",
      title: "Transparency Framework",
      description: "Implementation of comprehensive transparency and accountability measures, including public ledger system.",
      icon: Users,
      type: "development"
    },
    {
      year: "2024",
      title: "Major Fundraising Initiative",
      description: "Launch of the largest community-driven fundraising campaign to date, targeting comprehensive infrastructure development.",
      icon: Home,
      type: "milestone"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'foundation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'milestone': return 'bg-primary/10 text-primary border-primary/20';
      case 'development': return 'bg-green-100 text-green-800 border-green-200';
      case 'project': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout
      title="Our History"
      description="The journey of TECA from community vision to organized action"
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <Card className="shadow-card">
              <CardContent className="pt-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The story of TECA is a testament to the power of community vision and collective action. 
                  From humble beginnings in community gatherings to a structured organization serving 
                  thousands, our history reflects the determination and unity of the Twic East people.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                Key milestones in TECA's development and growth
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>

              <div className="space-y-12">
                {timeline.map((event, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-5 h-5 bg-primary rounded-full border-4 border-background shadow-sm"></div>
                    
                    {/* Timeline icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-6">
                      <event.icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <Card className="shadow-card hover:shadow-elegant transition-smooth">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={`text-xs font-medium ${getTypeColor(event.type)}`}>
                              {event.year}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                          <CardTitle className="font-serif text-xl text-primary">
                            {event.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base leading-relaxed">
                            {event.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Historical Context */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-primary text-center">
                  Historical Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                      The Twic East Heritage
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Twic East County has deep historical significance as the ancestral home of 
                      the Twic community. Rich in cultural traditions and natural resources, the 
                      area has faced challenges due to conflict and displacement over the years.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Many families were forced to relocate to urban areas like Juba, creating 
                      a diaspora community that maintained strong connections to their homeland 
                      and traditions.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                      The Path Forward
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      TECA emerged from a recognition that sustainable return to Twic East required 
                      more than individual effort—it needed coordinated community action, 
                      transparent governance, and strategic development planning.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Today, we continue building on this foundation, creating pathways for 
                      voluntary resettlement that honor our past while embracing a sustainable future.
                    </p>
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

export default History;