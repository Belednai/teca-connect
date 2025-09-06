import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                T
              </div>
              <div>
                <div className="font-serif font-bold text-xl">TECA</div>
                <div className="text-sm opacity-90">Twic East Community Association</div>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Supporting the resettlement and development of Twic East communities in Juba, South Sudan through unity, transparency, and sustainable progress.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/leadership", label: "Leadership" },
                { href: "/resettlement", label: "Resettlement" },
                { href: "/fundraising", label: "Fundraising" },
                { href: "/ledger", label: "Transparency" },
                { href: "/volunteer", label: "Volunteer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="opacity-90 hover:opacity-100 transition-smooth hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payams */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Payams</h3>
            <ul className="space-y-2 text-sm">
              {[
                { slug: "ajuong", name: "Ajuong" },
                { slug: "kongor", name: "Kongor" },
                { slug: "lith", name: "Lith" },
                { slug: "nyuak", name: "Nyuak" },
                { slug: "pakeer", name: "Pakeer" },
                { slug: "pawuoi", name: "Pawuoi" },
              ].map((payam) => (
                <li key={payam.slug}>
                  <Link 
                    to={`/resettlement/payams/${payam.slug}`}
                    className="opacity-90 hover:opacity-100 transition-smooth hover:underline"
                  >
                    {payam.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 opacity-75" />
                <span className="opacity-90">info@teca-juba.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 opacity-75" />
                <span className="opacity-90">+211 XXX XXX XXX</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 opacity-75 mt-0.5" />
                <span className="opacity-90">Juba, South Sudan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} Twic East Community Association (TECA) - Juba. All rights reserved.
          </p>
          <p className="text-sm opacity-75 mt-2 flex items-center justify-center">
            Built with <Heart className="h-4 w-4 mx-1" /> for our community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;