import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Eye, EyeOff } from "lucide-react";
import heroGarage from "@/assets/hero-garage.jpg";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroGarage} 
          alt="Garage background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-6">
        <Card className="bg-card/80 backdrop-blur-md border-border shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow-yellow">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient">sonvites</span>
                <span className="text-sm text-muted-foreground -mt-1">.net</span>
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Kayıt Ol</CardTitle>
              <CardDescription>
                Sanal garajını oluştur, hikayeni anlat
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="kullanici_adi"
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="ornek@email.com"
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-background/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-background/50 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2 text-sm">
                <input type="checkbox" className="rounded border-border mt-0.5" />
                <span className="text-muted-foreground">
                  <Link to="#" className="text-primary hover:text-primary/80">Kullanım Şartları</Link> ve{" "}
                  <Link to="#" className="text-primary hover:text-primary/80">Gizlilik Politikası</Link>'nı 
                  kabul ediyorum.
                </span>
              </div>

              <Button className="w-full btn-primary" size="lg">
                Kayıt Ol
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Zaten hesabın var mı?{" "}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                Giriş yap
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;