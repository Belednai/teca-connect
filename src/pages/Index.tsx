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
      <section className="relative hero-bg text-white py-20" style={{backgroundImage: 'url(/img/twicconf.jpg)'}}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary-dark/90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Twic East Community Association
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Supporting resettlement and sustainable development in Twic East County - Jonglei State, South Sudan through 
              unity, transparency, and community-driven progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="shadow-hero transition-bounce">
                <Link to="/fundraising">
                  <HandHeart className="mr-2 h-5 w-5" />
                  Support Our Mission
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/20 hover:text-white bg-white/10 backdrop-blur-sm">
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

      {/* Latest News */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                Latest News
              </h2>
              <Button variant="outline" asChild>
                <Link to="/news">
                  <Newspaper className="mr-2 h-4 w-4" />
                  View All News
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.slice(0, 3).map((item) => (
                <Card key={item.id} className="group hover:shadow-card transition-smooth overflow-hidden">
                  <div className="aspect-video bg-primary/5 relative overflow-hidden">
                    <img 
                      src="/img/twicconf.jpg" 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
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
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                Upcoming Events
              </h2>
              <Button variant="outline" asChild>
                <Link to="/events">
                  <Calendar className="mr-2 h-4 w-4" />
                  View All Events
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </section>

      {/* About & History */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From community vision to organized action - discover TECA's journey and impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="shadow-card hover:shadow-elegant transition-smooth">
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-primary flex items-center">
                    <Users className="h-6 w-6 mr-3" />
                    Our History
                  </CardTitle>
                  <CardDescription>
                    The journey of TECA from community vision to organized action
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Founded in 2020, TECA emerged from community consultations among Twic East diaspora members in Juba. 
                    Our organization has grown from informal gatherings to a structured association serving thousands 
                    across six payams.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>2019: Community consultations begin</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>2020: TECA officially established</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>2024: Major fundraising initiative launched</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link to="/history">
                      Learn Our Full Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-smooth">
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-primary flex items-center">
                    <Target className="h-6 w-6 mr-3" />
                    Our Mission
                  </CardTitle>
                  <CardDescription>
                    Supporting resettlement and sustainable development in Twic East
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We believe in voluntary return with dignity. Our mission is to create sustainable opportunities, 
                    essential services, and strong community foundations that enable families to return home safely 
                    and build thriving communities.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-primary">6</div>
                      <div className="text-muted-foreground">Payams Served</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-primary">100%</div>
                      <div className="text-muted-foreground">Transparent</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground mt-4">
                    <Link to="/about">
                      Learn More About Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Spotlight */}
      <section className="py-16 bg-primary-light/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Our Leadership
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated leaders guiding TECA's mission and resettlement efforts
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="shadow-card hover:shadow-elegant transition-smooth">
                <CardHeader className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl text-primary">
                    Democratic Governance
                  </CardTitle>
                  <CardDescription>
                    Elected leaders accountable to the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    All leadership positions are elected through transparent democratic processes, 
                    with regular accountability sessions and community feedback mechanisms.
                  </p>
                  <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link to="/leadership">
                      Meet Our Leaders
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-smooth">
                <CardHeader className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl text-primary">
                    Transparency & Accountability
                  </CardTitle>
                  <CardDescription>
                    Open reporting on all activities and finances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Leaders operate with full transparency, providing regular reports on activities, 
                    finances, and decision-making processes to the community.
                  </p>
                  <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link to="/ledger">
                      View Public Ledger
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-smooth">
                <CardHeader className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl text-primary">
                    Service-Oriented Leadership
                  </CardTitle>
                  <CardDescription>
                    Volunteers dedicated to community good
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Leaders serve the community's interests above personal gain, dedicating their 
                    time and skills as volunteers for the collective good.
                  </p>
                  <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link to="/volunteer">
                      Join Our Team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Activities & Media */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Our Work in Action
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how we're making a difference across all six payams
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-card hover:shadow-elegant transition-smooth">
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-primary flex items-center">
                    <Calendar className="h-6 w-6 mr-3" />
                    Activities & Projects
                  </CardTitle>
                  <CardDescription>
                    Track all resettlement activities and development projects across payams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="font-semibold text-primary">Water Wells</div>
                        <div className="text-muted-foreground">Infrastructure</div>
                      </div>
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="font-semibold text-primary">Schools</div>
                        <div className="text-muted-foreground">Education</div>
                      </div>
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="font-semibold text-primary">Community Centers</div>
                        <div className="text-muted-foreground">Governance</div>
                      </div>
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="font-semibold text-primary">Housing Support</div>
                        <div className="text-muted-foreground">Resettlement</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Our comprehensive development approach focuses on essential infrastructure, 
                      education, and community services needed for successful resettlement.
                    </p>
                    <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      <Link to="/activities">
                        View All Activities
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-smooth">
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-primary flex items-center">
                    <Newspaper className="h-6 w-6 mr-3" />
                    Media Gallery
                  </CardTitle>
                  <CardDescription>
                    Photos and videos from our community activities and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="aspect-square bg-primary/10 rounded-lg flex items-center justify-center">
                        <div className="text-primary text-xs">Photos</div>
                      </div>
                      <div className="aspect-square bg-primary/10 rounded-lg flex items-center justify-center">
                        <div className="text-primary text-xs">Videos</div>
                      </div>
                      <div className="aspect-square bg-primary/10 rounded-lg flex items-center justify-center">
                        <div className="text-primary text-xs">Events</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Explore our visual journey through community gatherings, project milestones, 
                      and the people who make our mission possible.
                    </p>
                    <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      <Link to="/media">
                        Browse Gallery
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved & Contact */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Get Involved
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                There are many ways to support our mission and connect with the community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="shadow-card hover:shadow-elegant transition-smooth text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-lg text-primary">
                    Donate
                  </CardTitle>
                  <CardDescription>
                    Support our resettlement projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link to="/fundraising">
                      Make a Donation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-smooth text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-lg text-primary">
                    Volunteer
                  </CardTitle>
                  <CardDescription>
                    Join our community efforts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link to="/volunteer">
                      Get Involved
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-smooth text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-lg text-primary">
                    Attend Events
                  </CardTitle>
                  <CardDescription>
                    Join community gatherings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link to="/events">
                      View Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-smooth text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Newspaper className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-lg text-primary">
                    Stay Updated
                  </CardTitle>
                  <CardDescription>
                    Follow our progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                    <Link to="/news">
                      Read News
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card bg-primary/5">
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl text-primary">
                  Contact Us
                </CardTitle>
                <CardDescription>
                  Have questions or want to learn more? We're here to help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-primary mb-2">
                      General Inquiries
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      info@teca-juba.org
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-primary mb-2">
                      Leadership
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      leadership@teca-juba.org
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-primary mb-2">
                      Community Meetings
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      First Sunday of each month
                    </p>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Button asChild>
                    <Link to="/contact">
                      Get in Touch
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/70 via-primary/60 to-primary-dark/70 text-white">
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
            <Button size="lg" variant="outline" asChild className="border-white/40 text-white hover:bg-white/20 hover:text-white bg-white/5 backdrop-blur-sm">
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
