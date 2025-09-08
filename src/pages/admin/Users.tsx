import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Users Management</h1>
        <p className="text-muted-foreground">Manage admin users and permissions</p>
      </div>

      {/* Coming Soon Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-xl flex items-center">
            <FontAwesomeIcon icon={faUsers} className="h-5 w-5 mr-3" />
            Users Management
          </CardTitle>
          <CardDescription>
            Comprehensive user management and permission system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Users management features coming soon. This will include user creation, 
            role management, and permission control capabilities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;