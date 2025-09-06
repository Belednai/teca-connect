import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, Users, Target, Activity, ArrowRight, TrendingUp } from "lucide-react";
import { payams, activities } from "@/lib/data";

const PayamIndex = () => {
  const getPayamActivities = (payamId: string) => {
    return activities.filter(activity => activity.payamId === payamId);
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalRaised = payams.reduce((sum, p) => sum + p.raisedAmount, 0);
  const totalRequested = payams.reduce((sum, p) => sum + p.requestedAmount, 0);
  const overallProgress = totalRequested > 0 ? Math.round((totalRaised / totalRequested) * 100) : 0;

  return (
    <Layout
      title="Payam Development"
      description="Detailed view of development progress across all six Twic East payams"
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Overview Stats */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl text-primary">
                  Payam Development Overview
                </CardTitle>
                <CardDescription>
                  Comprehensive progress across all six payams in Twic East County
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">6</div>
                    <p className="text-muted-foreground">Active Payams</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      ${totalRaised.toLocaleString()}
                    </div>
                    <p className="text-muted-foreground">Total Raised</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {overallProgress}%
                    </div>
                    <p className="text-muted-foreground">Overall Progress</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Overall Fundraising Progress</span>
                    <span className="font-medium">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${totalRaised.toLocaleString()} raised</span>
                    <span>${totalRequested.toLocaleString()} goal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payam Cards */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {payams.map((payam) => {
                const progress = Math.round((payam.raisedAmount / payam.requestedAmount) * 100);
                const payamActivities = getPayamActivities(payam.id);
                const completedActivities = payamActivities.filter(a => a.status === 'completed').length;
                const ongoingActivities = payamActivities.filter(a => a.status === 'ongoing').length;
                
                return (
                  <Card key={payam.id} className="group shadow-card hover:shadow-elegant transition-smooth">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle className="font-serif text-xl flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-primary" />
                          {payam.name} Payam
                        </CardTitle>
                        <Badge 
                          variant="secondary" 
                          className={`${progress >= 50 ? 'bg-green-100 text-green-800' : 'bg-primary/10 text-primary'}`}
                        >
                          {progress}%
                        </Badge>
                      </div>
                      
                      <CardDescription className="line-clamp-3 leading-relaxed">
                        {payam.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-6">
                        {/* Progress Bar */}
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

                        {/* Activity Summary */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-muted-foreground">Activity Status</h4>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <div className="text-lg font-bold text-green-600">{completedActivities}</div>
                              <div className="text-xs text-muted-foreground">Completed</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-blue-600">{ongoingActivities}</div>
                              <div className="text-xs text-muted-foreground">Ongoing</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-yellow-600">
                                {payamActivities.length - completedActivities - ongoingActivities}
                              </div>
                              <div className="text-xs text-muted-foreground">Planned</div>
                            </div>
                          </div>
                        </div>

                        {/* Recent Activities */}
                        {payamActivities.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm text-muted-foreground">Recent Activity</h4>
                            <div className="space-y-2">
                              {payamActivities.slice(0, 2).map((activity) => (
                                <div key={activity.id} className="flex items-center justify-between text-xs">
                                  <span className="line-clamp-1 flex-1">{activity.title}</span>
                                  <Badge 
                                    variant="outline" 
                                    className={`ml-2 text-xs ${getActivityStatusColor(activity.status)}`}
                                  >
                                    {activity.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <Link to={`/resettlement/payams/${payam.slug}`}>
                            View Full Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="shadow-card bg-primary/5">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-primary text-center">
                  Development Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      {activities.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Projects
                    </div>
                  </div>
                  
                  <div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {activities.filter(a => a.status === 'completed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Completed
                    </div>
                  </div>
                  
                  <div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {activities.filter(a => a.status === 'ongoing').length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      In Progress
                    </div>
                  </div>
                  
                  <div>
                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      {activities.filter(a => a.status === 'planned').length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Planned
                    </div>
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

export default PayamIndex;