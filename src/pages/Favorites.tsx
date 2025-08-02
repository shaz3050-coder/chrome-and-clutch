import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Eye, MessageCircle, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface FavoriteGarage {
  id: string;
  name: string;
  description: string;
  image_url: string;
  car_brand: string;
  car_model: string;
  car_year: number;
  likes_count: number;
  views_count: number;
  modification_type: string;
  is_for_sale: boolean;
  sale_price: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
}

interface FavoritePost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  likes_count: number;
  views_count: number;
  comments_count: number;
  category: string;
  tags: string[];
  profiles: {
    username: string;
    avatar_url: string;
  };
}

const Favorites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favoriteGarages, setFavoriteGarages] = useState<FavoriteGarage[]>([]);
  const [favoritePosts, setFavoritePosts] = useState<FavoritePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'garages' | 'posts'>('garages');

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      // Fetch favorite garages
      const { data: garageData, error: garageError } = await supabase
        .from('favorites')
        .select(`
          garage_id,
          garages (
            id,
            name,
            description,
            image_url,
            car_brand,
            car_model,
            car_year,
            likes_count,
            views_count,
            modification_type,
            is_for_sale,
            sale_price,
            profiles (
              username,
              avatar_url
            )
          )
        `)
        .eq('user_id', user?.id)
        .not('garage_id', 'is', null);

      if (garageError) throw garageError;

      // Fetch favorite posts
      const { data: postData, error: postError } = await supabase
        .from('favorites')
        .select(`
          post_id,
          posts (
            id,
            title,
            content,
            image_url,
            likes_count,
            views_count,
            comments_count,
            category,
            tags,
            profiles (
              username,
              avatar_url
            )
          )
        `)
        .eq('user_id', user?.id)
        .not('post_id', 'is', null);

      if (postError) throw postError;

      setFavoriteGarages(garageData?.map(item => item.garages).filter(Boolean) || []);
      setFavoritePosts(postData?.map(item => item.posts).filter(Boolean) || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: "Hata",
        description: "Favoriler yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Giriş Gerekli</h1>
            <p className="text-muted-foreground mb-4">
              Favorilerinizi görmek için giriş yapmanız gerekiyor.
            </p>
            <Link to="/login">
              <Button>Giriş Yap</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4">Favoriler yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Favorilerim</h1>
          
          <div className="flex gap-4 mb-6">
            <Button 
              variant={activeTab === 'garages' ? 'default' : 'outline'}
              onClick={() => setActiveTab('garages')}
              className="flex items-center gap-2"
            >
              <Car className="w-4 h-4" />
              Garajlar ({favoriteGarages.length})
            </Button>
            <Button 
              variant={activeTab === 'posts' ? 'default' : 'outline'}
              onClick={() => setActiveTab('posts')}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Gönderiler ({favoritePosts.length})
            </Button>
          </div>
        </div>

        {activeTab === 'garages' && (
          <div>
            {favoriteGarages.length === 0 ? (
              <div className="text-center py-12">
                <Car className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Henüz favori garajınız yok</h3>
                <p className="text-muted-foreground mb-4">
                  Beğendiğiniz garajları favorilere ekleyerek buradan takip edebilirsiniz.
                </p>
                <Link to="/garages">
                  <Button>Garajları Keşfet</Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteGarages.map((garage) => (
                  <Card key={garage.id} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={garage.image_url || '/placeholder.svg'} 
                        alt={garage.name}
                        className="w-full h-48 object-cover"
                      />
                      {garage.is_for_sale && (
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          Satılık
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{garage.name}</span>
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <img 
                          src={garage.profiles?.avatar_url || '/placeholder.svg'} 
                          alt={garage.profiles?.username}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-muted-foreground">
                          @{garage.profiles?.username}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {garage.description}
                      </p>
                      <div className="space-y-2">
                        <p className="font-medium">
                          {garage.car_brand} {garage.car_model} {garage.car_year}
                        </p>
                        {garage.modification_type && (
                          <Badge variant="secondary">{garage.modification_type}</Badge>
                        )}
                        {garage.is_for_sale && garage.sale_price && (
                          <p className="text-green-600 font-semibold">
                            Fiyat: {garage.sale_price}
                          </p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {garage.likes_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {garage.views_count}
                        </span>
                      </div>
                      <Link to={`/garage/${garage.id}`}>
                        <Button variant="outline" size="sm">İncele</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            {favoritePosts.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Henüz favori gönderiniz yok</h3>
                <p className="text-muted-foreground mb-4">
                  Beğendiğiniz gönderileri favorilere ekleyerek buradan takip edebilirsiniz.
                </p>
                <Link to="/forum">
                  <Button>Forum'u Keşfet</Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritePosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    {post.image_url && (
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="line-clamp-1">{post.title}</span>
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <img 
                          src={post.profiles?.avatar_url || '/placeholder.svg'} 
                          alt={post.profiles?.username}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-muted-foreground">
                          @{post.profiles?.username}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {post.content}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.category && (
                          <Badge variant="secondary">{post.category}</Badge>
                        )}
                        {post.tags?.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments_count}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;