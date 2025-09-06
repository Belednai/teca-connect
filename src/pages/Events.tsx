import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { events } from "@/lib/data";

const Events = () => {
  const upcomingEvents = events.filter(event => new Date(event.startDate) >= new Date());
  const pastEvents = events.filter(event => new Date(event.startDate) < new Date());

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

  const EventCard = ({ event, isPast = false }: { event: typeof events[0], isPast?: boolean }) => (
    <Card className={`group shadow-card hover:shadow-elegant transition-smooth ${isPast ? 'opacity-75' : ''}`}>
      {event.coverImage && (
        <div className="aspect-video bg-primary/5 rounded-t-lg"></div>
      )}
      
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="font-serif text-xl group-hover:text-primary transition-smooth">
              <Link to={`/events/${event.slug}`}>
                {event.title}
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-2">
              {event.description}
            </CardDescription>
          </div>
          {isPast && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              Past Event
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {/* Date and time */}
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(event.startDate)}</span>
            {event.startDate && (
              <span className="ml-2">at {formatTime(event.startDate)}</span>
            )}
          </div>
          
          {/* Location */}
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          {/* RSVP status */}
          {event.rsvpEnabled && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>RSVP Required</span>
            </div>
          )}
          
          {/* Action button */}
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground mt-4"
          >
            <Link to={`/events/${event.slug}`}>
              {isPast ? 'View Details' : 'Learn More & RSVP'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout
      title="Events & Gatherings"
      description="Join us for community meetings, fundraising events, and celebration gatherings"
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Upcoming Events */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Upcoming Events
              </h2>
              <p className="text-lg text-muted-foreground">
                Join us for important community gatherings and activities
              </p>
            </div>

            {upcomingEvents.length === 0 ? (
              <Card className="shadow-card text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground text-lg mb-4">
                    No upcoming events scheduled at this time.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check back soon for announcements about future community gatherings.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                  Past Events
                </h2>
                <p className="text-lg text-muted-foreground">
                  A record of our community gatherings and achievements
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isPast />
                ))}
              </div>
            </div>
          )}

          {/* Event Guidelines */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="shadow-card bg-primary/5">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-primary text-center">
                  Event Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                      RSVP Policy
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      For events requiring RSVP, please confirm your attendance in advance. 
                      This helps us prepare appropriate seating, refreshments, and materials.
                    </p>
                    
                    <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                      Community Guidelines
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      All TECA events are welcoming spaces where community members can 
                      engage respectfully, share ideas, and work together toward our 
                      common goals.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                      Accessibility
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      We strive to make all events accessible to community members with 
                      different needs. Contact us in advance if you require special 
                      accommodations.
                    </p>
                    
                    <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                      Contact Us
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Questions about events? Contact our organizing committee at 
                      events@teca-juba.org or through our community WhatsApp group.
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

export default Events;