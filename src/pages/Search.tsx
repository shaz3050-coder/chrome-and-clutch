import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Car, User, Calendar } from "lucide-react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock search results - in a real app, this would be an API call
  const mockResults = [
    {
      type: 'garage',
      id: 1,
      title: 'BMW M3 E46 Drift Build',
      description: 'Tam drift konfigürasyonlu BMW M3 E46. V8 motor swap, roll cage, ve profesyonel drift setup.',
      image: '/placeholder.svg',
      author: 'drift_king',
      category: 'Garaj'
    },
    {
      type: 'post',
      id: 2,
      title: 'JDM Kültürü ve Türkiye',
      description: 'Japonya kökenli JDM kültürünün Türkiye\'deki gelişimi ve popüler araçlar.',
      image: '/placeholder.svg',
      author: 'jdm_expert',
      category: 'Blog'
    },
    {
      type: 'user',
      id: 3,
      title: 'speedmaster',
      description: 'Drift uzmanı ve modifikasyon danışmanı. 15+ yıl deneyim.',
      image: '/placeholder.svg',
      author: 'speedmaster',
      category: 'Kullanıcı'
    }
  ];

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (query) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = mockResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'garage': return <Car className="w-5 h-5" />;
      case 'user': return <User className="w-5 h-5" />;
      default: return <SearchIcon className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Garaj': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Blog': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Kullanıcı': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1 className="heading-large mb-4">Arama Sonuçları</h1>
              <p className="text-muted-foreground text-lg mb-8">
                "{searchParams.get('q')}" için sonuçlar
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
                <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-background/50"
                />
                <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2" size="sm">
                  Ara
                </Button>
              </form>
            </div>

            {/* Results */}
            <div className="max-w-4xl mx-auto">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-4">Aranıyor...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-12">
                  <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Sonuç bulunamadı</h3>
                  <p className="text-muted-foreground">
                    Farklı anahtar kelimeler deneyebilir veya daha genel terimler kullanabilirsiniz.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <p className="text-muted-foreground">
                      {results.length} sonuç bulundu
                    </p>
                  </div>
                  
                  {results.map((result) => (
                    <Card key={`${result.type}-${result.id}`} className="hover-glow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                              {getIcon(result.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <CardTitle className="text-lg">{result.title}</CardTitle>
                                <Badge variant="outline" className={getCategoryColor(result.category)}>
                                  {result.category}
                                </Badge>
                              </div>
                              <CardDescription className="text-base">
                                {result.description}
                              </CardDescription>
                              <div className="flex items-center text-sm text-muted-foreground mt-2">
                                <User className="w-4 h-4 mr-1" />
                                <span>{result.author}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;