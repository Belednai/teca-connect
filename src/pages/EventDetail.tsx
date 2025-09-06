import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowLeft, Clock, Share2 } from "lucide-react";
import { events } from "@/lib/data";

const EventDetail = () => {
  const { slug } = useParams();
  const event = events.find(item => item.slug === slug);

  if (!event) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <Card className="shadow-card max-w-2xl mx-auto">
              <CardContent className="pt-8">
                <h1 className="text-2xl font-serif font-bold text-primary mb-4">
                  Event Not Found
                </h1>
                <p className="text-muted-foreground mb-6">
                  The event you're looking for doesn't exist or has been moved.
                </p>
                <Button asChild>
                  <Link to="/events">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Events
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isPastEvent = new Date(event.startDate) < new Date();

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="max-w-4xl mx-auto mb-8">
            <Button variant="ghost" asChild>
              <Link to="/events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>

          {/* Event Details */}
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-card">
              {/* Header image placeholder */}
              {event.coverImage && (
                <div className="aspect-video bg-gradient-primary rounded-t-lg"></div>
              )}

              <CardHeader className="space-y-6">
                {/* Status badge */}
                {isPastEvent && (
                  <Badge variant="secondary" className="w-fit bg-gray-100 text-gray-600">
                    Past Event
                  </Badge>
                )}

                {/* Title */}
                <CardTitle className="font-serif text-3xl md:text-4xl text-primary">
                  {event.title}
                </CardTitle>

                {/* Description */}
                <CardDescription className="text-lg leading-relaxed">
                  {event.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Event Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-primary/5">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-primary mr-3" />
                          <div>
                            <p className="font-medium">Date</p>
                            <p className="text-muted-foreground">{formatDate(event.startDate)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-primary mr-3" />
                          <div>
                            <p className="font-medium">Time</p>
                            <p className="text-muted-foreground">
                              {formatTime(event.startDate)}
                              {event.endDate && ` - ${formatTime(event.endDate)}`}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-primary mr-3" />
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-muted-foreground">{event.location}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary/5">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-primary mr-3" />
                          <div>
                            <p className="font-medium">RSVP Status</p>
                            <p className="text-muted-foreground">
                              {event.rsvpEnabled ? 'RSVP Required' : 'Open to All'}
                            </p>
                          </div>
                        </div>
                        
                        {!isPastEvent && event.rsvpEnabled && (
                          <Button className="w-full">
                            RSVP Now
                          </Button>
                        )}
                        
                        <Button variant="outline" className="w-full">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Event
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Information */}
                <div className="prose prose-lg max-w-none">
                  <h3 className="font-serif text-xl text-primary">About This Event</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.title === "Annual TECA Community Assembly" ? 
                      `Join us for our most important gathering of the year. This assembly brings together 
                      community members from all six payams to review our progress, discuss challenges, and 
                      collectively plan for the year ahead. Your voice matters in shaping TECA's direction 
                      and priorities.

                      The assembly will include presentations on financial transparency, project updates from 
                      each payam, and open discussion sessions where community members can ask questions and 
                      provide feedback. Light refreshments will be provided.

                      We encourage attendance from all community members, regardless of their current 
                      involvement level with TECA. This is an opportunity to learn, contribute, and connect 
                      with fellow community members.` :
                      
                      `Join us for an elegant evening of community, culture, and fundraising. This special 
                      dinner gala brings together community members, supporters, and friends to celebrate 
                      our progress and raise vital funds for resettlement activities.

                      The evening will feature traditional music and dance performances, inspiring stories 
                      from community members, updates on our resettlement progress, and opportunities to 
                      contribute to specific payam projects.

                      Formal attire is encouraged. Tickets include a three-course dinner, entertainment, 
                      and contribution to our community development fund. Limited seating available.`
                    }
                  </p>
                </div>

                {/* Important Notes */}
                <Card className="bg-warning/5 border-warning/20">
                  <CardHeader>
                    <CardTitle className="font-serif text-lg text-warning-foreground">
                      Important Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Please arrive 15 minutes before the scheduled start time</li>
                      <li>• Light refreshments will be provided during breaks</li>
                      <li>• Translation services available in Arabic and Dinka</li>
                      <li>• Contact us if you need special accommodations</li>
                      <li>• Parking is available at the venue</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Other Events */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-serif font-bold text-primary mb-8">
              Other Events
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {events
                .filter(item => item.id !== event.id)
                .slice(0, 2)
                .map((item) => (
                  <Card key={item.id} className="group shadow-card hover:shadow-elegant transition-smooth">
                    <CardHeader>
                      <CardTitle className="font-serif text-lg group-hover:text-primary transition-smooth">
                        <Link to={`/events/${item.slug}`}>
                          {item.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(item.startDate)}
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/events/${item.slug}`}>
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
