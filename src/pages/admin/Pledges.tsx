import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const AdminPledges = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Pledges Management</h1>
        <p className="text-muted-foreground">Track and manage donation pledges</p>
      </div>

      {/* Coming Soon Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-xl flex items-center">
            <FontAwesomeIcon icon={faHandHoldingHeart} className="h-5 w-5 mr-3" />
            Pledges Management
          </CardTitle>
          <CardDescription>
            Comprehensive pledge tracking and fulfillment system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Pledges management features coming soon. This will include pledge tracking, 
            fulfillment monitoring, and donor communication tools.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPledges;