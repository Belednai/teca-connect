import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Home, Users, Clock, Newspaper, Calendar, Heart, HandHeart, BarChart3, Activity, HelpingHand, Camera, Mail, Search } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Users },
    { href: "/history", label: "History", icon: Clock },
    { href: "/leadership", label: "Leadership", icon: Users },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/resettlement", label: "Resettlement", icon: Heart },
    { href: "/fundraising", label: "Fundraising", icon: HandHeart },
    { href: "/ledger", label: "Transparency", icon: BarChart3 },
    { href: "/activities", label: "Activities", icon: Activity },
    { href: "/volunteer", label: "Volunteer", icon: HelpingHand },
    { href: "/media", label: "Media", icon: Camera },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
              T
            </div>
            <div className="hidden sm:block">
              <div className="font-serif font-bold text-xl text-primary">
                TECA
              </div>
              <div className="text-xs text-muted-foreground -mt-1">
                Twic East Community Association
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 8).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Dropdown for remaining items */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className="text-sm">
                More
              </Button>
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border rounded-md shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth">
                {navItems.slice(8).map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-sm hover:bg-accent ${
                      isActive(item.href) ? "bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                      T
                    </div>
                    <div>
                      <div className="font-serif font-bold text-lg text-primary">
                        TECA
                      </div>
                      <div className="text-xs text-muted-foreground -mt-1">
                        Community Association
                      </div>
                    </div>
                  </div>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md transition-smooth ${
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;