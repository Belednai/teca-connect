import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDonate } from "@fortawesome/free-solid-svg-icons";

const AdminDonations = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Donations Management</h1>
        <p className="text-muted-foreground">Track and manage all donations received</p>
      </div>

      {/* Coming Soon Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-xl flex items-center">
            <FontAwesomeIcon icon={faDonate} className="h-5 w-5 mr-3" />
            Donations Management
          </CardTitle>
          <CardDescription>
            Comprehensive donation tracking and management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Donations management features coming soon. This will include donation tracking, 
            donor management, and financial reporting capabilities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDonations;