import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { User, Upload, Save, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    full_name: "",
    bio: "",
    location: "",
    website: "",
    avatar_url: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Fetch existing profile data
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
          return;
        }

        if (data) {
          setProfileData({
            username: data.username || "",
            full_name: data.full_name || "",
            bio: data.bio || "",
            location: data.location || "", 
            website: data.website || "",
            avatar_url: data.avatar_url || ""
          });
        }
      } catch (error) {
        console.error('Unexpected error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          username: profileData.username,
          full_name: profileData.full_name,
          bio: profileData.bio,
          location: profileData.location,
          website: profileData.website,
          avatar_url: profileData.avatar_url,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Profile update error:', error);
        toast({
          title: "Hata",
          description: "Profil güncellenirken bir hata oluştu.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Başarılı!",
        description: "Profiliniz başarıyla güncellendi."
      });
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Hata",
        description: "Beklenmeyen bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="heading-large mb-4">Giriş Gerekli</h1>
            <p className="text-muted-foreground mb-8">
              Profil sayfasına erişmek için önce giriş yapmalısınız.
            </p>
            <Button asChild>
              <a href="/login">Giriş Yap</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.avatar_url} />
                  <AvatarFallback className="text-2xl">
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                  <Camera className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
              <h1 className="heading-large mb-2">Profil Ayarları</h1>
              <p className="text-muted-foreground">
                Profil bilgilerinizi düzenleyin ve kişiselleştirin
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Kişisel Bilgiler</CardTitle>
                <CardDescription>
                  Bu bilgiler profilinizde diğer kullanıcılara gösterilecektir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Avatar URL */}
                  <div className="space-y-2">
                    <Label htmlFor="avatar_url">Profil Fotoğrafı URL'si</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="avatar_url"
                        placeholder="https://example.com/profile-photo.jpg"
                        value={profileData.avatar_url}
                        onChange={(e) => handleInputChange("avatar_url", e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Kullanıcı Adı *</Label>
                    <Input
                      id="username"
                      placeholder="Örn: speedhunter92"
                      value={profileData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Bu sizin benzersiz kullanıcı adınızdır. Diğerleri sizi bu adla bulabilir.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Ad Soyad</Label>
                    <Input
                      id="full_name"
                      placeholder="Örn: Ahmet Yılmaz"
                      value={profileData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Hakkında</Label>
                    <Textarea
                      id="bio"
                      placeholder="Kendiniz, ilgi alanlarınız ve araçlarınız hakkında kısa bir açıklama..."
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Konum</Label>
                    <Input
                      id="location"
                      placeholder="Örn: İstanbul, Türkiye"
                      value={profileData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://example.com"
                      value={profileData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/")}
                      className="flex-1"
                    >
                      İptal
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                          Kaydediliyor...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Kaydet
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Hesap Ayarları</CardTitle>
                <CardDescription>
                  E-posta adresi ve güvenlik ayarları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">E-posta Adresi</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Değiştir
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">Şifre</div>
                      <div className="text-sm text-muted-foreground">Son değiştirilme: Bugün</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Değiştir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;