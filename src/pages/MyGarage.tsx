import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Car, Plus, Edit, Trash2, Eye, Heart, MapPin, Calendar, Settings } from "lucide-react";
import MetaTags from "@/components/ui/meta";

interface Garage {
  id: string;
  name: string;
  description: string;
  car_brand: string;
  car_model: string;
  car_year: number;
  horsepower: number;
  torque: number;
  modification_type: string;
  price_range: string;
  location: string;
  image_url: string;
  is_for_sale: boolean;
  sale_price: string;
  likes_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
}

const MyGarage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [garages, setGarages] = useState<Garage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGarages();
    }
  }, [user]);

  const fetchGarages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('garages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching garages:', error);
        toast({
          title: "Hata",
          description: "Garajlar yüklenirken bir hata oluştu.",
          variant: "destructive"
        });
        return;
      }

      setGarages(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGarage = async (garageId: string) => {
    if (!confirm('Bu garajı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('garages')
        .delete()
        .eq('id', garageId);

      if (error) {
        console.error('Error deleting garage:', error);
        toast({
          title: "Hata",
          description: "Garaj silinirken bir hata oluştu.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Başarılı!",
        description: "Garaj başarıyla silindi."
      });

      fetchGarages(); // Refresh the list
    } catch (error) {
      console.error('Unexpected error:', error);
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
              Garajlarınızı görmek için önce giriş yapmalısınız.
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
      <MetaTags 
        title="Garajım - sonvites.net"
        description="Oluşturduğunuz garajları yönetin ve düzenleyin."
      />
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="heading-large mb-2">Garajım</h1>
              <p className="text-muted-foreground">
                Oluşturduğunuz garajları yönetin ve düzenleyin
              </p>
            </div>
            <Button asChild className="glow-yellow">
              <a href="/create-garage">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Garaj
              </a>
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-muted rounded flex-1"></div>
                      <div className="h-8 bg-muted rounded flex-1"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && garages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Henüz garajınız yok</h2>
              <p className="text-muted-foreground mb-6">
                İlk garajınızı oluşturun ve araç tutkusunu paylaşmaya başlayın
              </p>
              <Button asChild>
                <a href="/create-garage">
                  <Plus className="w-4 h-4 mr-2" />
                  İlk Garajımı Oluştur
                </a>
              </Button>
            </div>
          )}

          {/* Garages Grid */}
          {!isLoading && garages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {garages.map((garage) => (
                <Card key={garage.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={garage.image_url || '/placeholder.svg'}
                      alt={garage.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {garage.is_for_sale && (
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                        Satılık
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    {/* Title */}
                    <h3 className="font-semibold text-lg mb-1 truncate">{garage.name}</h3>
                    
                    {/* Car Info */}
                    <p className="text-muted-foreground text-sm mb-3">
                      {garage.car_brand} {garage.car_model} {garage.car_year && `(${garage.car_year})`}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {garage.likes_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {garage.views_count}
                      </div>
                      {garage.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {garage.location.split(',')[0]}
                        </div>
                      )}
                    </div>

                    {/* Modification Type */}
                    {garage.modification_type && (
                      <Badge variant="secondary" className="mb-4">
                        {garage.modification_type}
                      </Badge>
                    )}

                    {/* Created Date */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                      <Calendar className="w-3 h-3" />
                      {new Date(garage.created_at).toLocaleDateString('tr-TR')}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/garage/${garage.id}`)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Görüntüle
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/garage/${garage.id}/edit`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteGarage(garage.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyGarage;