import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Target, Calendar, DollarSign, Activity, Handshake } from "lucide-react";
import { payams, activities, donations } from "@/lib/data";

const PayamDetail = () => {
  const { slug } = useParams();
  const payam = payams.find(p => p.slug === slug);

  if (!payam) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <Card className="shadow-card max-w-2xl mx-auto">
              <CardContent className="pt-8">
                <h1 className="text-2xl font-serif font-bold text-primary mb-4">
                  Payam Not Found
                </h1>
                <p className="text-muted-foreground mb-6">
                  The payam you're looking for doesn't exist or has been moved.
                </p>
                <Button asChild>
                  <Link to="/resettlement/payams">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Payams
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  const progress = Math.round((payam.raisedAmount / payam.requestedAmount) * 100);
  const payamActivities = activities.filter(activity => activity.payamId === payam.id);
  const payamDonations = donations.filter(donation => donation.payamId === payam.id && donation.verified);

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="max-w-6xl mx-auto mb-8">
            <Button variant="ghost" asChild>
              <Link to="/resettlement/payams">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Payams
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="max-w-6xl mx-auto mb-12">
            <Card className="shadow-card bg-gradient-primary text-white">
              <CardContent className="pt-8">
                <div className="flex items-center mb-6">
                  <MapPin className="h-8 w-8 mr-4" />
                  <div>
                    <h1 className="text-4xl font-serif font-bold mb-2">
                      {payam.name} Payam
                    </h1>
                    <p className="text-xl opacity-90">
                      Development and Resettlement Progress
                    </p>
                  </div>
                </div>
                
                <p className="text-lg opacity-90 mb-8 max-w-3xl">
                  {payam.description}
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{progress}%</div>
                    <div className="opacity-90">Funding Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      ${payam.raisedAmount.toLocaleString()}
                    </div>
                    <div className="opacity-90">Funds Raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      {payamActivities.length}
                    </div>
                    <div className="opacity-90">Active Projects</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Funding Progress */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-primary flex items-center">
                    <Target className="h-6 w-6 mr-3" />
                    Funding Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={progress} className="h-4" />
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">
                        ${payam.raisedAmount.toLocaleString()} raised
                      </span>
                      <span className="font-semibold">
                        ${payam.requestedAmount.toLocaleString()} goal
                      </span>
                    </div>
                    <div className="text-center">
                      <Button size="lg" asChild className="mt-4">
                        <Link to="/fundraising">
                          <DollarSign className="mr-2 h-5 w-5" />
                          Support {payam.name}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activities */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-primary flex items-center">
                    <Activity className="h-6 w-6 mr-3" />
                    Development Activities
                  </CardTitle>
                  <CardDescription>
                    Current and planned projects in {payam.name} Payam
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {payamActivities.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No specific activities have been assigned to this payam yet. 
                      Check back soon for project updates.
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {payamActivities.map((activity) => (
                        <Card key={activity.id} className="border-l-4 border-l-primary">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-2">
                                  {activity.title}
                                </CardTitle>
                                <CardDescription>
                                  {activity.description}
                                </CardDescription>
                              </div>
                              <Badge 
                                className={getActivityStatusColor(activity.status)}
                              >
                                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                Start: {formatDate(activity.startDate)}
                              </div>
                              {activity.endDate && (
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  End: {formatDate(activity.endDate)}
                                </div>
                              )}
                              {activity.budget && (
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  Budget: ${activity.budget.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Donations */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-primary flex items-center">
                    <Handshake className="h-6 w-6 mr-3" />
                    Recent Support
                  </CardTitle>
                  <CardDescription>
                    Latest donations and pledges for {payam.name} Payam
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {payamDonations.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No donations recorded yet for this payam. Be the first to contribute!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {payamDonations.slice(0, 5).map((donation) => (
                        <div key={donation.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">
                              {donation.isPublic ? donation.donorName || 'Anonymous' : 'Anonymous Donor'}
                            </p>
                            {donation.message && (
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                "{donation.message}"
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {formatDate(donation.createdAt)} • {donation.method}
                            </p>
                          </div>
                          <div className="text-lg font-semibold text-primary">
                            ${donation.amount.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-serif text-lg text-primary">
                    Quick Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completion:</span>
                      <span className="font-semibold">{progress}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Donors:</span>
                      <span className="font-semibold">{payamDonations.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projects:</span>
                      <span className="font-semibold">{payamActivities.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-semibold text-green-600">
                        {payamActivities.filter(a => a.status === 'completed').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support Actions */}
              <Card className="shadow-card bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-serif text-lg text-primary">
                    Support This Payam
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/fundraising">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Make a Donation
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/volunteer">
                      <Users className="mr-2 h-4 w-4" />
                      Volunteer
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="w-full">
                    <Link to="/contact">
                      Contact Leadership
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Other Payams */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-serif text-lg text-primary">
                    Other Payams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {payams
                      .filter(p => p.id !== payam.id)
                      .slice(0, 4)
                      .map((otherPayam) => (
                        <Link
                          key={otherPayam.id}
                          to={`/resettlement/payams/${otherPayam.slug}`}
                          className="block p-2 rounded hover:bg-accent transition-smooth"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{otherPayam.name}</span>
                            <span className="text-sm text-primary">
                              {Math.round((otherPayam.raisedAmount / otherPayam.requestedAmount) * 100)}%
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PayamDetail;
