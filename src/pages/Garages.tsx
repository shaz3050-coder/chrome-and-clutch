import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Star, Eye, MessageCircle, Plus } from "lucide-react";

const Garages = () => {
  const garages = [
    {
      id: 1,
      username: "speedster_23",
      car: "BMW M3 E92",
      image: "/placeholder.svg",
      modifications: ["Turbo", "Suspansiyon", "Egzoz"],
      likes: 142,
      views: 1205,
      comments: 28
    },
    {
      id: 2,
      username: "drift_king",
      car: "Nissan 350Z",
      image: "/placeholder.svg",
      modifications: ["Body Kit", "Widebody", "Coilover"],
      likes: 98,
      views: 856,
      comments: 15
    },
    {
      id: 3,
      username: "jdm_lover",
      car: "Honda Civic Type-R",
      image: "/placeholder.svg",
      modifications: ["Cold Air Intake", "Aerodinamik", "Frenler"],
      likes: 76,
      views: 634,
      comments: 12
    }
  ];

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
            <Button className="btn-primary" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Garajını Oluştur
            </Button>
          </div>
        </section>

        {/* Garages Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {garages.map((garage) => (
                <Card key={garage.id} className="garage-card overflow-hidden hover-glow">
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5">
                    <img 
                      src={garage.image}
                      alt={garage.car}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Home className="w-3 h-3 mr-1" />
                        Garaj
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{garage.car}</CardTitle>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span>{garage.likes}</span>
                      </div>
                    </div>
                    <CardDescription>@{garage.username}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Modifikasyonlar:</p>
                        <div className="flex flex-wrap gap-1">
                          {garage.modifications.map((mod, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {mod}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{garage.views}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{garage.comments}</span>
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          İncele
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Garages;