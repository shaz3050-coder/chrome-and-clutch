import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Car, Eye, Heart, Plus, Edit, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MetaTags from "@/components/ui/meta";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MyGarage {
  id: string;
  name: string;
  description: string;
  image_url: string;
  car_brand: string;
  car_model: string;
  car_year: number;
  likes_count: number;
  views_count: number;
  created_at: string;
  is_for_sale: boolean;
  sale_price: string;
}

const MyGarage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [garages, setGarages] = useState<MyGarage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchMyGarages();
  }, [user, navigate]);

  const fetchMyGarages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('garages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching garages:', error);
        return;
      }

      setGarages(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteGarage = async (garageId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('garages')
        .delete()
        .eq('id', garageId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting garage:', error);
        toast({
          title: "Hata",
          description: "Garaj silinirken bir hata oluştu.",
          variant: "destructive"
        });
        return;
      }

      setGarages(prev => prev.filter(garage => garage.id !== garageId));
      toast({
        title: "Başarılı!",
        description: "Garaj başarıyla silindi."
      });
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
              Garajınızı görüntülemek için önce giriş yapmalısınız.
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
        description="Kendi garajınızı yönetin ve araçlarınızı düzenleyin."
      />
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="heading-large mb-4">Garajım</h1>
              <p className="text-muted-foreground">
                Oluşturduğunuz garajları yönetin ve düzenleyin.
              </p>
            </div>
            <Button onClick={() => navigate("/create-garage")} className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Garaj Oluştur
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-48 mb-4"></div>
                  <div className="bg-muted rounded h-4 mb-2"></div>
                  <div className="bg-muted rounded h-4 w-2/3"></div>
                </div>
              ))}
            </div>
          ) : garages.length === 0 ? (
            <div className="text-center py-16">
              <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Henüz garajınız yok</h2>
              <p className="text-muted-foreground mb-6">
                İlk garajınızı oluşturun ve araç tutkunlarıyla paylaşın.
              </p>
              <Button onClick={() => navigate("/create-garage")}>
                <Plus className="w-4 h-4 mr-2" />
                İlk Garajını Oluştur
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {garages.map((garage) => (
                <Card key={garage.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={garage.image_url || '/placeholder.svg'}
                      alt={garage.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {garage.is_for_sale && (
                      <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                        Satılık
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{garage.car_brand}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {garage.car_year}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold mb-2 line-clamp-2">{garage.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {garage.description}
                    </p>
                    
                    {garage.is_for_sale && garage.sale_price && (
                      <p className="text-lg font-semibold text-green-600 mb-2">
                        {garage.sale_price}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{garage.likes_count}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{garage.views_count}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(garage.created_at).toLocaleDateString('tr-TR')}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/garage/${garage.id}`)}
                        className="flex-1"
                      >
                        <Car className="w-4 h-4 mr-2" />
                        Görüntüle
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/edit-garage/${garage.id}`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Garajı Sil</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu garajı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteGarage(garage.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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