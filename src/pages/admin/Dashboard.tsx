import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDollarSign,
  faUsers,
  faListCheck,
  faNewspaper,
  faCalendarDays,
  faChartLine,
  faHandHoldingHeart,
  faMapMarkedAlt,
  faExclamationTriangle,
  faCheckCircle,
  faClock,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import { 
  payams, 
  activities, 
  donations, 
  pledges, 
  news, 
  events, 
  leaders,
  getTotalRaised, 
  getTotalRequested, 
  getProgressPercentage 
} from "@/lib/data";

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Calculate KPIs
  const totalRaised = getTotalRaised();
  const totalRequested = getTotalRequested();
  const progressPercentage = getProgressPercentage();
  const totalDonors = donations.filter(d => d.verified).length;
  const pendingPledges = pledges.filter(p => p.status === 'pending').length;
  const activeActivities = activities.filter(a => a.status === 'ongoing').length;
  const completedActivities = activities.filter(a => a.status === 'completed').length;
  const plannedActivities = activities.filter(a => a.status === 'planned').length;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of TECA's current activities and progress.
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
                <p className="text-2xl font-bold text-primary">
                  ${totalRaised.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {progressPercentage}% of ${totalRequested.toLocaleString()} goal
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donors</p>
                <p className="text-2xl font-bold text-primary">{totalDonors}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                {pendingPledges} pending pledges
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold text-primary">{activeActivities}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faListCheck} className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex space-x-4 text-sm">
                <span className="text-green-600">{completedActivities} completed</span>
                <span className="text-yellow-600">{plannedActivities} planned</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payams</p>
                <p className="text-2xl font-bold text-primary">{payams.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faMapMarkedAlt} className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Communities served
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payam Progress Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-xl flex items-center">
            <FontAwesomeIcon icon={faChartLine} className="h-5 w-5 mr-3" />
            Payam Funding Progress
          </CardTitle>
          <CardDescription>
            Fundraising progress across all six payams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payams.map((payam) => {
              const progress = Math.round((payam.raisedAmount / payam.requestedAmount) * 100);
              return (
                <div key={payam.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{payam.name}</span>
                      <Badge variant="secondary">{progress}%</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${payam.raisedAmount.toLocaleString()} / ${payam.requestedAmount.toLocaleString()}
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;