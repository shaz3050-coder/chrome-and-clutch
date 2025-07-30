import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  User, 
  Search, 
  Menu, 
  X,
  Home,
  BookOpen,
  Users,
  Settings
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-yellow">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gradient">sonvites</span>
              <span className="text-xs text-muted-foreground -mt-1">.net</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Ana Sayfa
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
              <Home className="w-4 h-4" />
              <span>Garajlar</span>
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Topluluk</span>
            </a>
          </nav>

          {/* Search & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Araç, kullanıcı ara..."
                className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm w-64"
              />
            </div>
            <Button variant="ghost" size="sm" className="btn-ghost">
              <User className="w-4 h-4 mr-2" />
              Giriş Yap
            </Button>
            <Button size="sm" className="btn-primary">
              Kayıt Ol
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border animate-fade-in">
            <nav className="flex flex-col p-4 space-y-4">
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Araç, kullanıcı ara..."
                  className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm w-full"
                />
              </div>
              
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                Ana Sayfa
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2 flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Garajlar</span>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2 flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Blog</span>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Topluluk</span>
              </a>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="ghost" className="btn-ghost justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Giriş Yap
                </Button>
                <Button className="btn-primary justify-start">
                  Kayıt Ol
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;