import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Zap, 
  DollarSign, 
  Star, 
  Heart,
  ShoppingCart,
  Wrench,
  Gauge,
  Settings
} from "lucide-react";

const AIModificationTool = () => {
  const [carModel, setCarModel] = useState("");
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const recommendations = [
    {
      id: 1,
      category: "Motor Performansı",
      title: "Cold Air Intake Sistemi",
      description: "Motor performansını artıran soğuk hava emme sistemi",
      price: "₺3,500 - ₺5,500",
      difficulty: "Orta",
      image: "/placeholder.svg",
      benefits: ["+15-25 HP", "Daha iyi ses", "Motor verimi"]
    },
    {
      id: 2, 
      category: "Suspansiyon",
      title: "Coilover Kit",
      description: "Ayarlanabilir yükseklik ve sertlik",
      price: "₺8,000 - ₺15,000",
      difficulty: "Zor",
      image: "/placeholder.svg",
      benefits: ["Daha iyi yol tutuş", "Ayarlanabilir", "Sportif görünüm"]
    },
    {
      id: 3,
      category: "Egzoz Sistemi",
      title: "Cat-back Egzoz",
      description: "Sportif ses ve performans egzoz sistemi",
      price: "₺4,000 - ₺8,000", 
      difficulty: "Orta",
      image: "/placeholder.svg",
      benefits: ["+10-20 HP", "Sportif ses", "Hafiflik"]
    },
    {
      id: 4,
      category: "Görsel",
      title: "Body Kit",
      description: "Agresif ve sportif görünüm paketi",
      price: "₺6,000 - ₺12,000",
      difficulty: "Zor",
      image: "/placeholder.svg", 
      benefits: ["Sportif görünüm", "Aerodinamik", "Kişiselleştirme"]
    }
  ];

  const generateRecommendations = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="space-y-6">
      {/* AI Tool Input */}
      <Card className="garage-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="w-6 h-6 mr-2 text-primary" />
            AI Modifikasyon Danışmanı
          </CardTitle>
          <CardDescription>
            Araç bilgilerinizi girin, size özel modifikasyon önerileri alın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="car-model">Araç Modeli</Label>
              <Input
                id="car-model"
                placeholder="ör: BMW M3 E92"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Bütçe</Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Bütçe seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">₺5,000 - ₺15,000</SelectItem>
                  <SelectItem value="medium">₺15,000 - ₺35,000</SelectItem>
                  <SelectItem value="high">₺35,000 - ₺75,000</SelectItem>
                  <SelectItem value="unlimited">₺75,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Modifikasyon Tarzı</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Tarz seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performans</SelectItem>
                  <SelectItem value="drift">Drift</SelectItem>
                  <SelectItem value="stance">Stance</SelectItem>
                  <SelectItem value="jdm">JDM</SelectItem>
                  <SelectItem value="luxury">Lüks</SelectItem>
                  <SelectItem value="track">Pist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateRecommendations}
            className="btn-primary w-full"
            disabled={!carModel || !budget || !style}
          >
            <Bot className="w-4 h-4 mr-2" />
            AI Önerilerini Oluştur
          </Button>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      {showRecommendations && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center">
            <h3 className="heading-medium mb-2">
              {carModel} için AI Önerileri
            </h3>
            <p className="text-muted-foreground">
              {style} tarzında, {budget === 'low' ? '₺5K-15K' : budget === 'medium' ? '₺15K-35K' : budget === 'high' ? '₺35K-75K' : '₺75K+'} bütçe ile
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="motor">Motor</TabsTrigger>
              <TabsTrigger value="suspansiyon">Süspansiyon</TabsTrigger>
              <TabsTrigger value="görsel">Görsel</TabsTrigger>
              <TabsTrigger value="egzoz">Egzoz</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((rec) => (
                  <Card key={rec.id} className="car-card">
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10">
                      <img 
                        src={rec.image}
                        alt={rec.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          {rec.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription>{rec.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Benefits */}
                        <div>
                          <p className="text-sm font-medium mb-2">Faydalar:</p>
                          <div className="flex flex-wrap gap-1">
                            {rec.benefits.map((benefit, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Price & Difficulty */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="font-medium">{rec.price}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wrench className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{rec.difficulty}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2 pt-4 border-t border-border">
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Heart className="w-4 h-4 mr-1" />
                            Kaydet
                          </Button>
                          <Button size="sm" className="btn-primary flex-1">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Detaylar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Other tab contents would filter recommendations by category */}
            <TabsContent value="motor" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.filter(r => r.category.includes("Motor")).map((rec) => (
                  <Card key={rec.id} className="car-card">
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10">
                      <img 
                        src={rec.image}
                        alt={rec.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          {rec.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription>{rec.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Benefits */}
                        <div>
                          <p className="text-sm font-medium mb-2">Faydalar:</p>
                          <div className="flex flex-wrap gap-1">
                            {rec.benefits.map((benefit, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Price & Difficulty */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span className="font-medium">{rec.price}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Wrench className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{rec.difficulty}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2 pt-4 border-t border-border">
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Heart className="w-4 h-4 mr-1" />
                            Kaydet
                          </Button>
                          <Button size="sm" className="btn-primary flex-1">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Detaylar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* AI Insights */}
          <Card className="garage-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-primary" />
                AI İçgörüleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Gauge className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">+45 HP</div>
                  <div className="text-sm text-muted-foreground">Tahmini Güç Artışı</div>
                </div>
                <div className="text-center p-4 bg-accent/5 rounded-lg">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="font-semibold">₺18,500</div>
                  <div className="text-sm text-muted-foreground">Ortalama Maliyet</div>
                </div>
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <Star className="w-8 h-8 mx-auto mb-2 text-foreground" />
                  <div className="font-semibold">8.5/10</div>
                  <div className="text-sm text-muted-foreground">Performans Skoru</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIModificationTool;
