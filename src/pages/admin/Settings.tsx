import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faSave,
  faShield,
  faInfoCircle,
  faUsers,
  faPlus,
  faEdit,
  faTrash,
  faBan,
  faCheck,
  faUserShield
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Mock user data - in production this would come from an API
const mockUsers = [
  {
    id: '1',
    name: 'John Deng Majok',
    email: 'admin@teca.org',
    role: 'SUPER_ADMIN',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Mary Nyandeng Akot',
    email: 'editor@teca.org',
    role: 'EDITOR',
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    name: 'Peter Malual Deng',
    email: 'finance@teca.org',
    role: 'FINANCE',
    isActive: true,
    createdAt: '2024-02-01'
  }
];

const AdminSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // User management state
  const [users, setUsers] = useState(mockUsers);
  const [isCreateUserDialogOpen, setIsCreateUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EDITOR',
    isActive: true
  });

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return null;
  };

  // User management functions
  const resetUserForm = () => {
    setUserForm({
      name: '',
      email: '',
      password: '',
      role: 'EDITOR',
      isActive: true
    });
  };

  const handleCreateUser = async () => {
    setIsLoading(true);
    try {
      const newUser = {
        id: Date.now().toString(),
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        isActive: userForm.isActive,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setUsers(prev => [...prev, newUser]);
      resetUserForm();
      setIsCreateUserDialogOpen(false);
      toast({
        title: "Success",
        description: "User created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      isActive: user.isActive
    });
    setIsEditUserDialogOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    
    setIsLoading(true);
    try {
      const updatedUser = {
        ...editingUser,
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        isActive: userForm.isActive
      };

      setUsers(prev => prev.map(u => u.id === editingUser.id ? updatedUser : u));
      resetUserForm();
      setEditingUser(null);
      setIsEditUserDialogOpen(false);
      toast({
        title: "Success",
        description: "User updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    try {
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, isActive: !u.isActive } : u
      ));
      
      const user = users.find(u => u.id === userId);
      toast({
        title: "Success",
        description: `User ${user?.isActive ? 'blocked' : 'unblocked'} successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast({
        title: "Success",
        description: "User deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'default';
      case 'EDITOR': return 'secondary';
      case 'FINANCE': return 'outline';
      default: return 'outline';
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      const passwordError = validatePassword(passwordForm.newPassword);
      if (passwordError) {
        newErrors.newPassword = passwordError;
      }
    }
    
    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an API call to change the password
      // For demo purposes, we'll just show success
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast({
        title: "Success",
        description: "Password changed successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* User Information */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-xl flex items-center">
            <FontAwesomeIcon icon={faUser} className="h-5 w-5 mr-3" />
            Account Information
          </CardTitle>
          <CardDescription>
            Your current account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Name</Label>
              <div className="text-lg font-medium">{user?.name}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Email</Label>
              <div className="text-lg font-medium">{user?.email}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Role</Label>
              <div className="text-lg font-medium">{user?.role}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">User ID</Label>
              <div className="text-lg font-medium">{user?.id}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-xl flex items-center">
            <FontAwesomeIcon icon={faLock} className="h-5 w-5 mr-3" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your account password for security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password *</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter your current password"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon 
                    icon={showCurrentPassword ? faEyeSlash : faEye} 
                    className="h-4 w-4 text-muted-foreground" 
                  />
                </Button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-destructive">{errors.currentPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password *</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter your new password"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon 
                    icon={showNewPassword ? faEyeSlash : faEye} 
                    className="h-4 w-4 text-muted-foreground" 
                  />
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-destructive">{errors.newPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm your new password"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  <FontAwesomeIcon 
                    icon={showConfirmPassword ? faEyeSlash : faEye} 
                    className="h-4 w-4 text-muted-foreground" 
                  />
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <Alert>
              <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4" />
              <AlertDescription>
                Password must be at least 6 characters long. Choose a strong password that you haven't used before.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="min-w-[120px]"
              >
                <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
                {isLoading ? 'Changing...' : 'Change Password'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-xl flex items-center">
            <FontAwesomeIcon icon={faShield} className="h-5 w-5 mr-3" />
            Security Information
          </CardTitle>
          <CardDescription>
            Important security guidelines for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Password Security Tips:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use a combination of letters, numbers, and symbols</li>
                <li>• Avoid using personal information in your password</li>
                <li>• Don't reuse passwords from other accounts</li>
                <li>• Change your password regularly</li>
                <li>• Never share your password with anyone</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Account Security:</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Your account is protected with role-based access control. Always log out when using shared computers 
                and report any suspicious activity immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-serif text-xl flex items-center">
                <FontAwesomeIcon icon={faUsers} className="h-5 w-5 mr-3" />
                User Management
              </CardTitle>
              <CardDescription>
                Create, manage, and control access for admin users
              </CardDescription>
            </div>
            <Dialog open={isCreateUserDialogOpen} onOpenChange={setIsCreateUserDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetUserForm}>
                  <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
                  Create User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Add a new admin user to the system.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Full Name *</Label>
                    <Input
                      id="userName"
                      value={userForm.name}
                      onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email *</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="userPassword">Password *</Label>
                    <Input
                      id="userPassword"
                      type="password"
                      value={userForm.password}
                      onChange={(e) => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="userRole">Role *</Label>
                    <Select value={userForm.role} onValueChange={(value) => setUserForm(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                        <SelectItem value="EDITOR">Editor</SelectItem>
                        <SelectItem value="FINANCE">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="userActive"
                      checked={userForm.isActive}
                      onCheckedChange={(checked) => setUserForm(prev => ({ ...prev, isActive: checked }))}
                    />
                    <Label htmlFor="userActive">Active User</Label>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateUserDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateUser} disabled={isLoading || !userForm.name || !userForm.email || !userForm.password}>
                      <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
                      {isLoading ? 'Creating...' : 'Create User'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role.replace('_', ' ')}
                  </Badge>
                  
                  <Badge variant={user.isActive ? "default" : "destructive"}>
                    {user.isActive ? "Active" : "Blocked"}
                  </Badge>
                  
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditUser(user)}
                      title="Edit User"
                    >
                      <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleToggleUserStatus(user.id)}
                      title={user.isActive ? "Block User" : "Unblock User"}
                    >
                      <FontAwesomeIcon 
                        icon={user.isActive ? faBan : faCheck} 
                        className="h-4 w-4" 
                      />
                    </Button>
                    
                    {user.id !== user?.id && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
                      >
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editUserName">Full Name *</Label>
              <Input
                id="editUserName"
                value={userForm.name}
                onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editUserEmail">Email *</Label>
              <Input
                id="editUserEmail"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editUserRole">Role *</Label>
              <Select value={userForm.role} onValueChange={(value) => setUserForm(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  <SelectItem value="EDITOR">Editor</SelectItem>
                  <SelectItem value="FINANCE">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="editUserActive"
                checked={userForm.isActive}
                onCheckedChange={(checked) => setUserForm(prev => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="editUserActive">Active User</Label>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser} disabled={isLoading || !userForm.name || !userForm.email}>
                <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
                {isLoading ? 'Updating...' : 'Update User'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSettings;