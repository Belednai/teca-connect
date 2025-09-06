import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Heart, Home, Users, Target, TrendingUp, ArrowRight, MapPin, Building, Droplets, GraduationCap } from "lucide-react";
import { payams, getTotalRaised, getTotalRequested, getProgressPercentage } from "@/lib/data";

const Resettlement = () => {
  const totalRaised = getTotalRaised();
  const totalRequested = getTotalRequested();
  const progressPercentage = getProgressPercentage();

  const priorities = [
    {
      icon: Droplets,
      title: "Water Infrastructure",
      description: "Clean water access through wells, boreholes, and distribution systems",
      payams: ["Ajuong", "Kongor", "Nyuak"]
    },
    {
      icon: GraduationCap,
      title: "Education Facilities",
      description: "Primary schools, libraries, and adult education centers",
      payams: ["Kongor", "Lith", "Pawuoi"]
    },
    {
      icon: Building,
      title: "Community Centers",
      description: "Multi-purpose facilities for governance, meetings, and events",
      payams: ["Lith", "Pakeer", "Pawuoi"]
    },
    {
      icon: Home,
      title: "Housing Support",
      description: "Building materials, land preparation, and housing assistance",
      payams: ["All Payams"]
    }
  ];

  return (
    <Layout
      title="Resettlement Initiative"
      description="Supporting voluntary return to Twic East through comprehensive development programs"
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Overview */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="shadow-card">
              <CardContent className="pt-8">
                <div className="text-center mb-8">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                    Our Resettlement Vision
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    TECA's resettlement initiative is built on the principle of voluntary return with dignity. 
                    We believe that families should only return to Twic East when there are sustainable 
                    opportunities, essential services, and strong community foundations in place.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold mb-2">Community-Led</h3>
                    <p className="text-sm text-muted-foreground">
                      Every project is planned and implemented with full community participation
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold mb-2">Sustainable</h3>
                    <p className="text-sm text-muted-foreground">
                      Long-term solutions that create lasting impact and local capacity
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold mb-2">Transparent</h3>
                    <p className="text-sm text-muted-foreground">
                      Open reporting on all activities, finances, and progress metrics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-primary text-center">
                  Overall Progress
                </CardTitle>
                <CardDescription className="text-center">
                  Our community-wide fundraising and development efforts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {progressPercentage}%
                    </div>
                    <p className="text-muted-foreground">
                      of our total fundraising goal achieved
                    </p>
                  </div>
                  
                  <Progress value={progressPercentage} className="h-4" />
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        ${totalRaised.toLocaleString()}
                      </div>
                      <p className="text-muted-foreground">Total Raised</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        ${totalRequested.toLocaleString()}
                      </div>
                      <p className="text-muted-foreground">Total Goal</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Development Priorities */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Development Priorities
              </h2>
              <p className="text-lg text-muted-foreground">
                Key infrastructure and services needed for successful resettlement
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {priorities.map((priority, index) => (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <priority.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-serif text-xl">
                          {priority.title}
                        </CardTitle>
                        <CardDescription>
                          {priority.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        <strong>Focus Payams:</strong> {priority.payams.join(", ")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Payams Overview */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Six Payams, One Vision
              </h2>
              <p className="text-lg text-muted-foreground">
                Each payam has unique characteristics and development priorities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {payams.map((payam) => {
                const progress = Math.round((payam.raisedAmount / payam.requestedAmount) * 100);
                
                return (
                  <Card key={payam.id} className="group shadow-card hover:shadow-elegant transition-smooth">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-serif text-xl flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-primary" />
                          {payam.name}
                        </CardTitle>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {progress}%
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {payam.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Progress value={progress} className="h-2 mb-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              ${payam.raisedAmount.toLocaleString()}
                            </span>
                            <span className="font-medium">
                              ${payam.requestedAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <Link to={`/resettlement/payams/${payam.slug}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link to="/resettlement/payams">
                  Explore All Payams
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Call to Action */}
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-card bg-gradient-primary text-white">
              <CardContent className="pt-8 text-center">
                <h2 className="text-3xl font-serif font-bold mb-4">
                  Support Our Resettlement Mission
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Your contribution helps build the foundation for sustainable return 
                  and community development in Twic East.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/fundraising">
                      Make a Donation
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
                    <Link to="/volunteer">
                      Volunteer with Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resettlement;