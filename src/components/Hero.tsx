import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Users } from "lucide-react";
import heroGarage from "@/assets/hero-garage.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroGarage} 
          alt="Luxury garage with sports cars"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Türkiye'nin #1 Otomotiv Platformu</span>
            </div>

            {/* Main Heading */}
            <h1 className="heading-large mb-6 animate-fade-in">
              Son Vitesteki<br />
              <span className="text-primary animate-glow-pulse">Hikayeni</span><br />
              Burada Anlat
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-fade-in">
              Sanal garajını kur, modifiyeli arabanı sergile, tutkunu paylaştığın araç severlerle tanış. 
              Her araba bir hikaye, seninkini dinleyelim.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8 animate-fade-in">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15K+</div>
                <div className="text-sm text-muted-foreground">Kayıtlı Üye</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3.2K+</div>
                <div className="text-sm text-muted-foreground">Sanal Garaj</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">45K+</div>
                <div className="text-sm text-muted-foreground">Paylaşılan Fotoğraf</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in">
              <Button size="lg" className="btn-primary group" asChild>
                <Link to="/register">
                  Garajını Oluştur
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="btn-ghost group">
                <Play className="w-4 h-4 mr-2" />
                Nasıl Çalışır?
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8 animate-fade-in">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background flex items-center justify-center text-sm font-bold text-primary-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">500+ araç tutkunu</span> sonvites.net'i sevdi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-20 right-10 hidden lg:block animate-float">
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-medium">Aktif Topluluk</div>
              <div className="text-xs text-muted-foreground">2.1K online kullanıcı</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;