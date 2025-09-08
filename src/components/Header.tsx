import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHouse, 
  faPeopleGroup, 
  faTimeline, 
  faUserTie, 
  faNewspaper, 
  faCalendarDays, 
  faHandHoldingHeart, 
  faDonate, 
  faScaleBalanced, 
  faListCheck, 
  faHandsHelping, 
  faPhotoFilm, 
  faEnvelope, 
  faBars,
  faTimes,
  faUserShield
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { href: "/", label: "Home", icon: faHouse },
    { href: "/about", label: "About", icon: faPeopleGroup },
    { href: "/history", label: "History", icon: faTimeline },
    { href: "/leadership", label: "Leadership", icon: faUserTie },
    { href: "/news", label: "News", icon: faNewspaper },
    { href: "/events", label: "Events", icon: faCalendarDays },
    { href: "/resettlement", label: "Resettlement", icon: faHandHoldingHeart },
    { href: "/fundraising", label: "Fundraising", icon: faDonate },
    { href: "/ledger", label: "Transparency", icon: faScaleBalanced },
    { href: "/activities", label: "Activities", icon: faListCheck },
    { href: "/volunteer", label: "Volunteer", icon: faHandsHelping },
    { href: "/media", label: "Media", icon: faPhotoFilm },
    { href: "/contact", label: "Contact", icon: faEnvelope },
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
            <div className="block">
              <div className="font-serif font-bold text-lg sm:text-xl text-primary">
                TECA - Juba
              </div>
              <div className="text-xs text-muted-foreground -mt-1 hidden sm:block">
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
                    <FontAwesomeIcon icon={item.icon} className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Search, Admin Login and Mobile Menu */}
          <div className="flex items-center space-x-2">
            <SearchBar />
            
            {/* Admin Login Link */}
            <Link to="/admin/login">
              <Button variant="ghost" size="icon" title="Admin Login">
                <FontAwesomeIcon icon={faUserShield} className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
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
                        TECA - Juba
                      </div>
                      <div className="text-xs text-muted-foreground -mt-1">
                        Twic East Community Association
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
                      <FontAwesomeIcon icon={item.icon} className="h-5 w-5 mr-3" />
                      {item.label}
                    </Link>
                  ))}
                  
                  {/* Admin Login Link in Mobile Menu */}
                  <Link
                    to="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-3 text-base font-medium rounded-md transition-smooth text-foreground hover:bg-accent hover:text-accent-foreground border-t border-border mt-4 pt-4"
                  >
                    <FontAwesomeIcon icon={faUserShield} className="h-5 w-5 mr-3" />
                    Admin Login
                  </Link>
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