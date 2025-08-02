import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MessageCircle, Search, Filter, Plus, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";
import carProfile from "@/assets/car-profile.jpg";

const Garages = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { toggleFavorite, checkIsFavorited } = useFavorites();
  
  const [garages, setGarages] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<Record<string, any>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    fetchGarages();
  }, []);

  useEffect(() => {
    if (user && garages.length > 0) {
      checkFavorites();
    }
  }, [user, garages]);

  const fetchGarages = async () => {
    try {
      const { data: garagesData, error } = await supabase
        .from('garages')
        .select('*')
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

      setGarages(garagesData || []);

      // Fetch profiles for garage owners
      if (garagesData?.length > 0) {
        const userIds = [...new Set(garagesData.map(garage => garage.user_id))];
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('*')
          .in('user_id', userIds);

        const profilesMap = {};
        profilesData?.forEach(profile => {
          profilesMap[profile.user_id] = profile;
        });
        setProfiles(profilesMap);
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

  const checkFavorites = async () => {
    const favoritesMap = {};
    for (const garage of garages) {
      const isFavorited = await checkIsFavorited(garage.id);
      favoritesMap[garage.id] = isFavorited;
    }
    setFavorites(favoritesMap);
  };

  const handleFavoriteToggle = async (garageId: string) => {
    const result = await toggleFavorite(garageId);
    if (result !== false) {
      setFavorites(prev => ({ ...prev, [garageId]: result }));
      
      // Update garage likes count in the local state
      setGarages(prev => prev.map(garage => 
        garage.id === garageId 
          ? { ...garage, likes_count: result ? garage.likes_count + 1 : Math.max(0, garage.likes_count - 1) }
          : garage
      ));
    }
  };

  const filteredAndSortedGarages = garages
    .filter(garage => {
      const matchesSearch = 
        garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        garage.car_brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        garage.car_model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        garage.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterBy === "all" || 
        (filterBy === "for_sale" && garage.is_for_sale) ||
        (filterBy === "modified" && garage.modification_type);
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "popular":
          return (b.likes_count || 0) - (a.likes_count || 0);
        case "views":
          return (b.views_count || 0) - (a.views_count || 0);
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Garajlar yükleniyor...</p>
            </div>
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
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="heading-large mb-4">Garajlar</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Topluluk üyelerinin araçlarını keşfedin, modifikasyon hikayelerini okuyun
            </p>
            {user && (
              <Button className="btn-primary" size="lg" asChild>
                <Link to="/create-garage">
                  <Plus className="w-5 h-5 mr-2" />
                  Garajını Oluştur
                </Link>
              </Button>
            )}
          </div>
        </section>

        {/* Search and Filters */}
        <section className="px-4 pb-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Garaj ara... (marka, model, isim)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">En Yeni</SelectItem>
                  <SelectItem value="oldest">En Eski</SelectItem>
                  <SelectItem value="popular">En Popüler</SelectItem>
                  <SelectItem value="views">En Çok Görüntülenen</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="for_sale">Satılık</SelectItem>
                  <SelectItem value="modified">Modifiyeli</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Garages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedGarages.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    {searchQuery || filterBy !== "all" ? "Arama kriterlerinize uygun garaj bulunamadı." : "Henüz garaj eklenmemiş."}
                  </p>
                  {user && (
                    <Link to="/create-garage">
                      <Button className="btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        İlk Garajı Ekle
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                filteredAndSortedGarages.map((garage) => {
                  const profile = profiles[garage.user_id];
                  return (
                    <Card key={garage.id} className="garage-card group">
                      <div className="relative overflow-hidden">
                        <img 
                          src={garage.image_url || carProfile}
                          alt={garage.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {garage.is_for_sale && (
                          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">
                            Satılık
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold leading-tight mb-1">
                              {garage.name}
                            </CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <span>@{profile?.username || "Anonim"}</span>
                              {garage.car_brand && garage.car_model && (
                                <>
                                  <span>•</span>
                                  <span>{garage.car_brand} {garage.car_model}</span>
                                </>
                              )}
                              {garage.car_year && (
                                <>
                                  <span>•</span>
                                  <Badge variant="outline" className="text-xs">
                                    {garage.car_year}
                                  </Badge>
                                </>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                        
                        {garage.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                            {garage.description}
                          </p>
                        )}
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Heart className={`w-4 h-4 ${favorites[garage.id] ? 'fill-current text-red-500' : ''}`} />
                              <span>{garage.likes_count || 0}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{garage.views_count || 0}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleFavoriteToggle(garage.id)}
                              disabled={!user}
                              className="h-8"
                            >
                              <Heart className={`w-3 h-3 ${favorites[garage.id] ? 'fill-current text-red-500' : ''}`} />
                            </Button>
                            <Link to={`/garage/${garage.id}`}>
                              <Button size="sm" className="btn-primary h-8">
                                Görüntüle
                              </Button>
                            </Link>
                          </div>
                        </div>
                        
                        {garage.sale_price && garage.is_for_sale && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-green-600">Fiyat:</span>
                              <span className="text-sm font-semibold">{garage.sale_price}</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Garages;