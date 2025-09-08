import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTachometerAlt,
  faNewspaper,
  faCalendarDays,
  faMapMarkedAlt,
  faDonate,
  faHandHoldingHeart,
  faCog,
  faBars,
  faSignOutAlt,
  faHome
} from "@fortawesome/free-solid-svg-icons";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: faTachometerAlt },
    { href: "/admin/news", label: "News", icon: faNewspaper },
    { href: "/admin/events", label: "Events", icon: faCalendarDays },
    { href: "/admin/payams", label: "Fundraising", icon: faMapMarkedAlt },
    { href: "/admin/donations", label: "Donations", icon: faDonate },
    { href: "/admin/pledges", label: "Pledges", icon: faHandHoldingHeart },
    { href: "/admin/settings", label: "Settings", icon: faCog },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Admin Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
            T
          </div>
          <div>
            <div className="font-serif font-bold text-lg text-sidebar-primary">
              TECA Admin
            </div>
            <div className="text-xs text-sidebar-foreground/70">
              {user?.name || 'Administration Panel'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {adminNavItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-smooth ${
              isActive(item.href)
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            }`}
          >
            <FontAwesomeIcon icon={item.icon} className="h-4 w-4 mr-3" />
            {item.label}
            {item.href === "/admin" && isActive(item.href) && (
              <Badge variant="secondary" className="ml-auto text-xs">
                Active
              </Badge>
            )}
          </Link>
        ))}
      </nav>

      {/* Admin Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="space-y-2">
          <Link
            to="/"
            className="flex items-center px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg transition-smooth"
          >
            <FontAwesomeIcon icon={faHome} className="h-4 w-4 mr-3" />
            Back to Site
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
            <div>
              <div className="font-serif font-bold text-primary">
                TECA Admin
              </div>
            </div>
          </div>
          
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 bg-sidebar">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-sidebar border-r border-sidebar-border">
          <SidebarContent />
        </div>

        {/* Main Content */}
        <div className="lg:ml-64 flex-1">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
