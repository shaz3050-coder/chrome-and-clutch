import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Zap, 
  Gauge, 
  Settings, 
  Camera,
  Star,
  User,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";
import carProfile from "@/assets/car-profile.jpg";
import MetaTags from "@/components/ui/meta";
import Comments from "@/components/Comments";

const GarageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { toggleFavorite, checkIsFavorited, isLoading: favoriteLoading } = useFavorites();
  
  const [garage, setGarage] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchGarageData = async () => {
      try {
        // Fetch garage data
        const { data: garageData, error: garageError } = await supabase
          .from('garages')
          .select('*')
          .eq('id', id)
          .single();

        if (garageError) {
          console.error('Error fetching garage:', garageError);
          toast({
            title: "Hata",
            description: "Garaj bilgileri yüklenirken bir hata oluştu.",
            variant: "destructive"
          });
          return;
        }

        if (!garageData) {
          navigate('/garages');
          return;
        }

        setGarage(garageData);

        // Fetch owner profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', garageData.user_id)
          .single();

        setProfile(profileData);

        // Check if favorited
        if (user) {
          const favorited = await checkIsFavorited(garageData.id);
          setIsFavorited(favorited);
        }

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

    fetchGarageData();
  }, [id, user, navigate, toast, checkIsFavorited]);

  const handleFavoriteToggle = async () => {
    if (!garage) return;
    
    const result = await toggleFavorite(garage.id);
    if (result !== false) {
      setIsFavorited(result);
      setGarage(prev => ({
        ...prev,
        likes_count: result ? prev.likes_count + 1 : Math.max(0, prev.likes_count - 1)
      }));
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Garaj yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!garage) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="heading-large mb-4">Garaj Bulunamadı</h2>
            <p className="text-muted-foreground mb-8">Aradığınız garaj mevcut değil.</p>
            <Button onClick={() => navigate('/garages')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Garajlara Dön
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title={`${garage?.name || "Garaj"} - sonvites.net`}
        description={`${garage?.description || "Araç detayları ve modifikasyonları"} - ${garage?.car_brand} ${garage?.car_model}`}
        url={`https://sonvites.net/garage/${id}`}
        image={garage?.image_url}
      />
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <img 
            src={garage.image_url || carProfile}
            alt={garage.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="heading-large mb-2">{garage.name}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                    <span>@{profile?.username || "Anonim"}</span>
                  </div>
                  <Badge variant="secondary">{garage.car_brand} {garage.car_model}</Badge>
                  {garage.car_year && <Badge variant="outline">{garage.car_year}</Badge>}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Paylaş
                </Button>
                <Button 
                  size="sm" 
                  variant={isFavorited ? "default" : "outline"}
                  onClick={handleFavoriteToggle}
                  disabled={favoriteLoading}
                  className={isFavorited ? "btn-primary" : ""}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                  {garage.likes_count || 0}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                <TabsTrigger value="modifications">Modifikasyonlar</TabsTrigger>
                <TabsTrigger value="gallery">Galeri</TabsTrigger>
                <TabsTrigger value="comments">Yorumlar</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Performance Stats */}
                  <Card className="garage-card">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Gauge className="w-5 h-5 mr-2 text-primary" />
                        Performans
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{garage.horsepower ? `${garage.horsepower} HP` : "N/A"}</div>
                          <div className="text-sm text-muted-foreground">Güç</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{garage.torque ? `${garage.torque} Nm` : "N/A"}</div>
                          <div className="text-sm text-muted-foreground">Tork</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{garage.modification_type || "Belirtilmemiş"}</div>
                          <div className="text-sm text-muted-foreground">Modifikasyon</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{garage.price_range || "N/A"}</div>
                          <div className="text-sm text-muted-foreground">Fiyat Aralığı</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Owner's Story */}
                  <Card className="garage-card lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Sahibinin Hikayesi</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{garage.description || "Henüz açıklama eklenmemiş."}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="modifications" className="space-y-6">
                <Card className="garage-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-primary" />
                      Modifikasyonlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {garage.modification_type && (
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span>{garage.modification_type}</span>
                        </div>
                      )}
                      {garage.location && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Konum:</span>
                          <span>{garage.location}</span>
                        </div>
                      )}
                      <p className="text-muted-foreground text-sm">
                        Detaylı modifikasyon listesi yakında eklenecek.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="aspect-square overflow-hidden rounded-lg car-card">
                    <img 
                      src={garage.image_url || carProfile}
                      alt={garage.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center car-card hover:border-primary">
                    <div className="text-center">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Daha Fazla Fotoğraf</p>
                      <p className="text-xs text-muted-foreground mt-1">Yakında...</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="space-y-6">
                <Comments garageId={garage?.id} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GarageDetail;