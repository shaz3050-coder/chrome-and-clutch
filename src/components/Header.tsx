import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Car, 
  User, 
  Search, 
  Menu, 
  X,
  Home,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Heart
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to a dedicated search page or show results on current page
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

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
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Ana Sayfa
            </Link>
            <Link to="/garages" className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
              <Home className="w-4 h-4" />
              <span>Garajlar</span>
            </Link>
            <Link to="/blog" className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </Link>
            <Link to="/community" className="text-foreground hover:text-primary transition-colors flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Topluluk</span>
            </Link>
          </nav>

          {/* Search & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <form onSubmit={handleSearch} className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Araç, kullanıcı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm w-64"
              />
            </form>
            
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <Link to="/favorites" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">Favoriler</span>
                </Link>
                <Link to="/my-garage" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <Car className="w-4 h-4" />
                  <span className="text-sm font-medium">Garajım</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Profil</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="btn-ghost" asChild>
                  <Link to="/login">
                    <User className="w-4 h-4 mr-2" />
                    Giriş Yap
                  </Link>
                </Button>
                <Button size="sm" className="btn-primary" asChild>
                  <Link to="/register">
                    Kayıt Ol
                  </Link>
                </Button>
              </>
            )}
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
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Araç, kullanıcı ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm w-full"
                />
              </form>
              
              <Link to="/" className="text-foreground hover:text-primary transition-colors py-2">
                Ana Sayfa
              </Link>
              <Link to="/garages" className="text-foreground hover:text-primary transition-colors py-2 flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Garajlar</span>
              </Link>
              <Link to="/blog" className="text-foreground hover:text-primary transition-colors py-2 flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Blog</span>
              </Link>
              <Link to="/community" className="text-foreground hover:text-primary transition-colors py-2 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Topluluk</span>
              </Link>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 py-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback>
                          <User className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Hoş geldin!</span>
                    </div>
                    <Button variant="ghost" className="btn-ghost justify-start" asChild>
                      <Link to="/favorites">
                        <Heart className="w-4 h-4 mr-2" />
                        Favoriler
                      </Link>
                    </Button>
                    <Button variant="ghost" className="btn-ghost justify-start" asChild>
                      <Link to="/my-garage">
                        <Car className="w-4 h-4 mr-2" />
                        Garajım
                      </Link>
                    </Button>
                    <Button variant="ghost" className="btn-ghost justify-start" asChild>
                      <Link to="/profile">
                        <Settings className="w-4 h-4 mr-2" />
                        Profil
                      </Link>
                    </Button>
                    <Button variant="ghost" className="btn-ghost justify-start" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Çıkış Yap
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="btn-ghost justify-start" asChild>
                      <Link to="/login">
                        <User className="w-4 h-4 mr-2" />
                        Giriş Yap
                      </Link>
                    </Button>
                    <Button className="btn-primary justify-start" asChild>
                      <Link to="/register">
                        Kayıt Ol
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;