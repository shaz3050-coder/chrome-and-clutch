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
  User
} from "lucide-react";
import carProfile from "@/assets/car-profile.jpg";

const GarageDetail = () => {
  const garage = {
    id: 1,
    username: "speedster_23",
    userAvatar: "/placeholder.svg",
    car: "BMW M3 E92",
    year: "2008",
    images: [carProfile, carProfile, carProfile, carProfile],
    modifications: [
      { category: "Motor", items: ["Turbo Kit", "Cold Air Intake", "ECU Remap"] },
      { category: "Suspansiyon", items: ["Coilover Kit", "Sway Bars", "Strut Bars"] },
      { category: "Egzoz", items: ["Cat-back Exhaust", "Headers", "Downpipe"] },
      { category: "Frenler", items: ["Brembo Kit", "Steel Lines", "Performance Pads"] }
    ],
    performance: {
      power: "420 HP",
      torque: "500 Nm", 
      acceleration: "4.2s 0-100",
      topSpeed: "280 km/h"
    },
    story: "Bu M3'ü 3 yıl önce aldım ve o günden beri hayallerime ulaşmak için adım adım modifiye ediyorum. İlk başta sadece görsel değişiklikler yapmak istiyordum ama sonra performans tarafına da yöneldim. Şu an çok memnunum ama henüz bitmiş değil!",
    likes: 142,
    comments: [
      {
        id: 1,
        user: "drift_king",
        avatar: "/placeholder.svg",
        text: "Çok güzel bir build! Turbo kit hangi marka?",
        time: "2 saat önce"
      },
      {
        id: 2,
        user: "jdm_lover", 
        avatar: "/placeholder.svg",
        text: "E92 M3'ler efsane, tebrikler 👏",
        time: "5 saat önce"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <img 
            src={garage.images[0]}
            alt={garage.car}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="heading-large mb-2">{garage.car}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={garage.userAvatar} />
                      <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                    <span>@{garage.username}</span>
                  </div>
                  <Badge variant="secondary">{garage.year}</Badge>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" className="btn-ghost">
                  <Share2 className="w-4 h-4 mr-2" />
                  Paylaş
                </Button>
                <Button size="sm" className="btn-primary">
                  <Heart className="w-4 h-4 mr-2" />
                  {garage.likes}
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
                          <div className="text-2xl font-bold text-primary">{garage.performance.power}</div>
                          <div className="text-sm text-muted-foreground">Güç</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{garage.performance.torque}</div>
                          <div className="text-sm text-muted-foreground">Tork</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{garage.performance.acceleration}</div>
                          <div className="text-sm text-muted-foreground">0-100 km/h</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">{garage.performance.topSpeed}</div>
                          <div className="text-sm text-muted-foreground">Maksimum Hız</div>
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
                      <p className="text-muted-foreground leading-relaxed">{garage.story}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="modifications" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {garage.modifications.map((mod, index) => (
                    <Card key={index} className="garage-card">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Settings className="w-5 h-5 mr-2 text-primary" />
                          {mod.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {mod.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center space-x-2">
                              <Zap className="w-3 h-3 text-primary" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {garage.images.map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg car-card">
                      <img 
                        src={image}
                        alt={`${garage.car} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center car-card hover:border-primary">
                    <div className="text-center">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Fotoğraf Ekle</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comments" className="space-y-6">
                {/* Add Comment */}
                <Card className="garage-card">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Yorumunuzu yazın..."
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end">
                        <Button className="btn-primary">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Yorum Yap
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments List */}
                <div className="space-y-4">
                  {garage.comments.map((comment) => (
                    <Card key={comment.id} className="garage-card">
                      <CardContent className="pt-6">
                        <div className="flex space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">@{comment.user}</span>
                              <span className="text-sm text-muted-foreground">{comment.time}</span>
                            </div>
                            <p className="text-muted-foreground">{comment.text}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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