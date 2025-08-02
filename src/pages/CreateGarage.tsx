import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Upload, Save } from "lucide-react";

const CreateGarage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    carBrand: "",
    carModel: "",
    carYear: "",
    horsepower: "",
    torque: "",
    modificationType: "",
    priceRange: "",
    location: "",
    imageUrl: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Hata",
        description: "Garaj oluşturmak için giriş yapmalısınız.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      // Simulating API call - replace with actual Supabase integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Başarılı!",
        description: "Garajınız başarıyla oluşturuldu."
      });
      
      navigate("/garages");
    } catch (error) {
      toast({
        title: "Hata",
        description: "Garaj oluşturulurken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
              Garaj oluşturmak için önce giriş yapmalısınız.
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
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="heading-large mb-2">Yeni Garaj Oluştur</h1>
              <p className="text-muted-foreground">
                Aracınızın hikayesini paylaşın ve topluluğa katılın
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Garaj Bilgileri</CardTitle>
                <CardDescription>
                  Aracınız ve garajınız hakkında temel bilgileri girin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Garaj Adı */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Garaj Adı *</Label>
                    <Input
                      id="name"
                      placeholder="Örn: Speedhunter92'nin Garajı"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  {/* Açıklama */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      placeholder="Aracınız ve modifikasyonlarınız hakkında kısa bir açıklama..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Araç Bilgileri */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="carBrand">Araç Markası *</Label>
                      <Select onValueChange={(value) => handleInputChange("carBrand", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Marka seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bmw">BMW</SelectItem>
                          <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                          <SelectItem value="audi">Audi</SelectItem>
                          <SelectItem value="volkswagen">Volkswagen</SelectItem>
                          <SelectItem value="toyota">Toyota</SelectItem>
                          <SelectItem value="honda">Honda</SelectItem>
                          <SelectItem value="nissan">Nissan</SelectItem>
                          <SelectItem value="mazda">Mazda</SelectItem>
                          <SelectItem value="ford">Ford</SelectItem>
                          <SelectItem value="chevrolet">Chevrolet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="carModel">Model *</Label>
                      <Input
                        id="carModel"
                        placeholder="Örn: M3 Competition"
                        value={formData.carModel}
                        onChange={(e) => handleInputChange("carModel", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="carYear">Model Yılı</Label>
                      <Input
                        id="carYear"
                        type="number"
                        placeholder="2023"
                        value={formData.carYear}
                        onChange={(e) => handleInputChange("carYear", e.target.value)}
                        min="1900"
                        max="2024"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="horsepower">Beygir Gücü (HP)</Label>
                      <Input
                        id="horsepower"
                        type="number"
                        placeholder="510"
                        value={formData.horsepower}
                        onChange={(e) => handleInputChange("horsepower", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="torque">Tork (Nm)</Label>
                      <Input
                        id="torque"
                        type="number"
                        placeholder="650"
                        value={formData.torque}
                        onChange={(e) => handleInputChange("torque", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Modifikasyon Türü */}
                  <div className="space-y-2">
                    <Label htmlFor="modificationType">Modifikasyon Türü</Label>
                    <Select onValueChange={(value) => handleInputChange("modificationType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tür seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="stance">Stance</SelectItem>
                        <SelectItem value="drift">Drift</SelectItem>
                        <SelectItem value="track">Track</SelectItem>
                        <SelectItem value="street">Street</SelectItem>
                        <SelectItem value="show">Show</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fiyat Aralığı ve Konum */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priceRange">Fiyat Aralığı</Label>
                      <Select onValueChange={(value) => handleInputChange("priceRange", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Aralık seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-50k">0 - 50.000 TL</SelectItem>
                          <SelectItem value="50k-100k">50.000 - 100.000 TL</SelectItem>
                          <SelectItem value="100k-250k">100.000 - 250.000 TL</SelectItem>
                          <SelectItem value="250k-500k">250.000 - 500.000 TL</SelectItem>
                          <SelectItem value="500k+">500.000+ TL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Konum</Label>
                      <Input
                        id="location"
                        placeholder="Örn: İstanbul, Türkiye"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Fotoğraf URL */}
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Fotoğraf URL'si</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="imageUrl"
                        placeholder="https://example.com/car-photo.jpg"
                        value={formData.imageUrl}
                        onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/garages")}
                      className="flex-1"
                    >
                      İptal
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                          Oluşturuluyor...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Garaj Oluştur
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateGarage;