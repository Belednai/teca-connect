import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, TrendingUp, Calendar, Newspaper, Heart, HandHeart } from "lucide-react";
import { payams, news, events, getTotalRaised, getTotalRequested, getProgressPercentage } from "@/lib/data";

const Index = () => {
  const totalRaised = getTotalRaised();
  const totalRequested = getTotalRequested();
  const progressPercentage = getProgressPercentage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Twic East Community Association
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Supporting resettlement and sustainable development in Juba, South Sudan through 
              unity, transparency, and community-driven progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="shadow-hero transition-bounce">
                <Link to="/fundraising">
                  <HandHeart className="mr-2 h-5 w-5" />
                  Support Our Mission
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
                <Link to="/resettlement">
                  <Heart className="mr-2 h-5 w-5" />
                  Learn About Resettlement
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Stats */}
      <section className="py-16 bg-primary-light/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-muted-foreground">
                Transparent progress toward our resettlement goals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="shadow-card border-primary/10">
                <CardHeader className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif">
                    ${totalRaised.toLocaleString()}
                  </CardTitle>
                  <CardDescription>Total Funds Raised</CardDescription>
                </CardHeader>
              </Card>

              <Card className="shadow-card border-primary/10">
                <CardHeader className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif">
                    ${totalRequested.toLocaleString()}
                  </CardTitle>
                  <CardDescription>Total Goal</CardDescription>
                </CardHeader>
              </Card>

              <Card className="shadow-card border-primary/10">
                <CardHeader className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif">
                    6 Payams
                  </CardTitle>
                  <CardDescription>Communities Served</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Overall Progress */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-serif">Overall Fundraising Progress</CardTitle>
                <CardDescription>
                  {progressPercentage}% of our total goal achieved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="h-3 mb-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${totalRaised.toLocaleString()} raised</span>
                  <span>${totalRequested.toLocaleString()} goal</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payams Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Our Payams
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Six distinct communities, each with unique needs and development priorities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payams.map((payam) => {
              const progress = Math.round((payam.raisedAmount / payam.requestedAmount) * 100);
              
              return (
                <Card key={payam.id} className="group hover:shadow-card transition-smooth">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-serif text-xl">{payam.name}</CardTitle>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {progress}%
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {payam.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${payam.raisedAmount.toLocaleString()} raised
                        </span>
                        <span className="font-medium">
                          ${payam.requestedAmount.toLocaleString()} goal
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Link to={`/resettlement/payams/${payam.slug}`}>
                          Learn More
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
                View All Payams
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest News & Events */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Latest News */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-primary">
                  Latest News
                </h2>
                <Button variant="outline" asChild>
                  <Link to="/news">
                    <Newspaper className="mr-2 h-4 w-4" />
                    View All
                  </Link>
                </Button>
              </div>

              <div className="space-y-6">
                {news.slice(0, 2).map((item) => (
                  <Card key={item.id} className="group hover:shadow-card transition-smooth">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="font-serif text-lg mb-2 group-hover:text-primary transition-smooth">
                            <Link to={`/news/${item.slug}`}>
                              {item.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {item.excerpt}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {item.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-primary">
                  Upcoming Events
                </h2>
                <Button variant="outline" asChild>
                  <Link to="/events">
                    <Calendar className="mr-2 h-4 w-4" />
                    View All
                  </Link>
                </Button>
              </div>

              <div className="space-y-6">
                {events.map((event) => (
                  <Card key={event.id} className="group hover:shadow-card transition-smooth">
                    <CardHeader>
                      <CardTitle className="font-serif text-lg mb-2 group-hover:text-primary transition-smooth">
                        <Link to={`/events/${event.slug}`}>
                          {event.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {new Date(event.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-muted-foreground">
                          {event.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Your support makes a real difference in the lives of families returning home. 
            Together, we can build sustainable communities and lasting hope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="shadow-hero">
              <Link to="/fundraising">
                Make a Donation
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
              <Link to="/volunteer">
                Volunteer With Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
