import { Car, Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-garage-dark border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-yellow">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gradient">sonvites</span>
                <span className="text-xs text-muted-foreground -mt-1">.net</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Araç tutkunlarının buluşma noktası. Son vitesteki hikayenizi paylaşın, 
              toplulukla bağlan, tutkunu olduğunuz araçları keşfedin.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Türkiye ile</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>yapıldı</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Ana Sayfa</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Garajları Keşfet</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Popüler Araçlar</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Topluluk</a></li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Hesap</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Giriş Yap</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kayıt Ol</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Garaj Oluştur</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Profil Ayarları</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Yardım</a></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">İletişim</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@sonvites.net</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+90 xxx xxx xx xx</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium text-foreground text-sm mb-2">Yasal</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Kullanım Şartları</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Çerez Politikası</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 sonvites.net - Tüm hakları saklıdır.
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.987 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297L6.875 14.7c.652.652 1.542 1.058 2.527 1.058 1.98 0 3.583-1.604 3.583-3.584 0-.985-.406-1.875-1.058-2.527l.991-.991c.807.88 1.297 2.031 1.297 3.328 0 2.699-2.195 4.894-4.894 4.894l.128.11z"/>
                </svg>
              </a>
              
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;