import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  MapPin, 
  Calendar, 
  Globe, 
  Phone,
  Car,
  Heart,
  Eye,
  UserPlus,
  UserMinus,
  Settings
} from "lucide-react";
import MetaTags from "@/components/ui/meta";

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  location: string;
  website: string;
  avatar_url: string;
  phone_number: string;
  created_at: string;
}

interface Garage {
  id: string;
  name: string;
  car_brand: string;
  car_model: string;
  car_year: number;
  image_url: string;
  likes_count: number;
  views_count: number;
}

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [garages, setGarages] = useState<Garage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);

      // Mock data - will be replaced with real data later
      const mockProfile: UserProfile = {
        id: "1",
        username: username || "",
        full_name: "Mustafa Yılmaz",
        bio: "Araç tutkunu. 15 yıldır modifiye dünyasında. VW Golf sevdalısı. Track day aşığı.",
        location: "Ankara, Türkiye",
        website: "https://example.com",
        avatar_url: "",
        phone_number: "+90 555 123 45 67",
        created_at: "2020-01-15T10:30:00Z"
      };

      const mockGarages: Garage[] = [
        {
          id: "1",
          name: "Golf 7 GTI Performance",
          car_brand: "Volkswagen",
          car_model: "Golf GTI",
          car_year: 2018,
          image_url: "/placeholder.svg",
          likes_count: 45,
          views_count: 234
        },
        {
          id: "2", 
          name: "E46 M3 Track Car",
          car_brand: "BMW",
          car_model: "M3",
          car_year: 2004,
          image_url: "/placeholder.svg",
          likes_count: 78,
          views_count: 456
        }
      ];

      setProfile(mockProfile);
      setGarages(mockGarages);
      setFollowerCount(420);
      setFollowingCount(180);
      setIsFollowing(false); // Will be checked with real data

    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Hata",
        description: "Profil yüklenirken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!user) {
      toast({
        title: "Giriş Gerekli",
        description: "Takip etmek için giriş yapmalısınız.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Will implement follow functionality later
      setIsFollowing(!isFollowing);
      setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
      
      toast({
        title: "Başarılı!",
        description: isFollowing ? "Takipten çıktınız." : "Takip etmeye başladınız."
      });
    } catch (error) {
      console.error('Error following user:', error);
      toast({
        title: "Hata",
        description: "Takip ederken bir hata oluştu.",
        variant: "destructive"
      });
    }
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="animate-pulse">
              <div className="h-32 bg-muted rounded-lg mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="heading-large mb-4">Kullanıcı Bulunamadı</h1>
            <p className="text-muted-foreground mb-8">
              Aradığınız kullanıcı mevcut değil veya silinmiş olabilir.
            </p>
            <Button onClick={() => navigate("/community")}>
              Topluluğa Geri Dön
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isOwnProfile = user?.id === profile.id;

  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title={`${profile.full_name} (@${profile.username}) - sonvites.net`}
        description={profile.bio || `${profile.full_name} adlı kullanıcının profili. Garajlarını keşfedin.`}
      />
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                
                {/* Avatar */}
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-4xl font-bold">
                    {profile.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{profile.full_name}</h1>
                      <p className="text-xl text-muted-foreground mb-2">@{profile.username}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-4 lg:mt-0">
                      {isOwnProfile ? (
                        <Button asChild>
                          <a href="/profile">
                            <Settings className="w-4 h-4 mr-2" />
                            Profili Düzenle
                          </a>
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleFollow}
                          variant={isFollowing ? "outline" : "default"}
                          className={!isFollowing ? "btn-primary" : ""}
                        >
                          {isFollowing ? (
                            <>
                              <UserMinus className="w-4 h-4 mr-2" />
                              Takipten Çık
                            </>
                          ) : (
                            <>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Takip Et
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex space-x-6 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{garages.length}</div>
                      <div className="text-sm text-muted-foreground">Garaj</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{followerCount}</div>
                      <div className="text-sm text-muted-foreground">Takipçi</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{followingCount}</div>
                      <div className="text-sm text-muted-foreground">Takip</div>
                    </div>
                  </div>

                  {/* Bio */}
                  {profile.bio && (
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {profile.bio}
                    </p>
                  )}

                  {/* Additional Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {profile.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {profile.website && (
                      <div className="flex items-center space-x-1">
                        <Globe className="w-4 h-4" />
                        <a 
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          Website
                        </a>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatJoinDate(profile.created_at)} tarihinde katıldı</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Garages */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Garajlar <span className="text-muted-foreground">({garages.length})</span>
              </h2>
            </div>

            {garages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {garages.map((garage) => (
                  <Card 
                    key={garage.id} 
                    className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/garage/${garage.id}`)}
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={garage.image_url}
                        alt={garage.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1 truncate">{garage.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {garage.car_brand} {garage.car_model} {garage.car_year && `(${garage.car_year})`}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{garage.likes_count}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{garage.views_count}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isOwnProfile ? "Henüz garajınız yok" : "Henüz garaj paylaşmamış"}
                </h3>
                <p className="text-muted-foreground">
                  {isOwnProfile 
                    ? "İlk garajınızı oluşturun ve araç tutkusunu paylaşmaya başlayın"
                    : "Bu kullanıcı henüz hiç garaj paylaşmamış"
                  }
                </p>
                {isOwnProfile && (
                  <Button className="mt-4" asChild>
                    <a href="/create-garage">İlk Garajımı Oluştur</a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;