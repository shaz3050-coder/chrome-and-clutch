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
import { supabase } from "@/integrations/supabase/client";
import { Car, Save, Upload, Camera } from "lucide-react";
import MetaTags from "@/components/ui/meta";

const CreateGarage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    car_brand: "",
    car_model: "",
    car_year: "",
    horsepower: "",
    torque: "",
    modification_type: "",
    price_range: "",
    location: "",
    image_url: "",
    is_for_sale: false,
    sale_price: ""
  });

  const carBrands = [
    "Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Toyota", "Honda", 
    "Ford", "Chevrolet", "Nissan", "Hyundai", "Kia", "Mazda", 
    "Subaru", "Volvo", "Porsche", "Lamborghini", "Ferrari", "Bentley",
    "Rolls-Royce", "Aston Martin", "McLaren", "Bugatti", "Koenigsegg",
    "Pagani", "Lotus", "Maserati", "Alfa Romeo", "Fiat", "Jeep",
    "Land Rover", "Range Rover", "Jaguar", "Mini", "Opel", "Peugeot",
    "Renault", "Citroën", "Škoda", "SEAT", "Suzuki", "Mitsubishi",
    "Lexus", "Infiniti", "Acura", "Cadillac", "Lincoln", "Genesis",
    "Tesla", "Lucid", "Rivian", "BYD", "NIO", "Xpeng", "Li Auto",
    "Dacia", "Lada", "Tata", "Mahindra", "Maruti Suzuki", "Geely",
    "Chery", "Great Wall", "MG", "Saic", "GAC", "Dongfeng",
    "Saab", "Hummer", "Pontiac", "Saturn", "Mercury", "Plymouth",
    "Isuzu", "Daewoo", "Proton", "Perodua", "Holden", "Vauxhall",
    "Zastava", "Yugo", "Lancia", "Dodge", "Chrysler", "Ram",
    "Buick", "GMC", "Oldsmobile", "Studebaker", "Packard", "Hudson",
    "Nash", "AMC", "DeSoto", "Edsel", "Imperial", "Eagle"
  ];

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Hata",
        description: "Dosya boyutu 10MB'dan büyük olamaz.",
        variant: "destructive"
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Hata", 
        description: "Sadece resim dosyaları yüklenebilir.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('garage-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({
          title: "Hata",
          description: "Dosya yüklenirken bir hata oluştu.",
          variant: "destructive"
        });
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('garage-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      
      toast({
        title: "Başarılı!",
        description: "Garaj fotoğrafı başarıyla yüklendi."
      });

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Hata",
        description: "Beklenmeyen bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
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

    if (!formData.name || !formData.car_brand || !formData.car_model) {
      toast({
        title: "Hata",
        description: "Zorunlu alanları doldurmanız gerekiyor.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('garages')
        .insert({
          user_id: user.id,
          name: formData.name,
          description: formData.description,
          car_brand: formData.car_brand,
          car_model: formData.car_model,
          car_year: formData.car_year ? parseInt(formData.car_year) : null,
          horsepower: formData.horsepower ? parseInt(formData.horsepower) : null,
          torque: formData.torque ? parseInt(formData.torque) : null,
          modification_type: formData.modification_type,
          price_range: formData.price_range,
          location: formData.location,
          image_url: formData.image_url,
          is_for_sale: formData.is_for_sale,
          sale_price: formData.sale_price
        });

      if (error) {
        console.error('Error creating garage:', error);
        toast({
          title: "Hata",
          description: "Garaj oluşturulurken bir hata oluştu.",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Başarılı!",
        description: "Garajınız başarıyla oluşturuldu."
      });
      
      navigate("/my-garage");
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
      <MetaTags 
        title="Yeni Garaj Oluştur - sonvites.net"
        description="Aracınızın hikayesini paylaşın ve topluluğa katılın."
      />
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 glow-yellow">
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
                      <Label htmlFor="car_brand">Araç Markası *</Label>
                      <Select onValueChange={(value) => handleInputChange("car_brand", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Marka seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {carBrands.map(brand => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="car_model">Model *</Label>
                      <Input
                        id="car_model"
                        placeholder="Örn: M3 Competition"
                        value={formData.car_model}
                        onChange={(e) => handleInputChange("car_model", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="car_year">Model Yılı</Label>
                      <Input
                        id="car_year"
                        type="number"
                        placeholder="2023"
                        value={formData.car_year}
                        onChange={(e) => handleInputChange("car_year", e.target.value)}
                        min="1900"
                        max="2025"
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
                    <Label htmlFor="modification_type">Modifikasyon Türü</Label>
                    <Select onValueChange={(value) => handleInputChange("modification_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tür seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Performance">Performance</SelectItem>
                        <SelectItem value="Stance">Stance</SelectItem>
                        <SelectItem value="Drift">Drift</SelectItem>
                        <SelectItem value="Track">Track</SelectItem>
                        <SelectItem value="Street">Street</SelectItem>
                        <SelectItem value="Show">Show</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fiyat Aralığı ve Konum */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price_range">Fiyat Aralığı</Label>
                      <Select onValueChange={(value) => handleInputChange("price_range", value)}>
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

                  {/* Sale Information */}
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="is_for_sale"
                        checked={formData.is_for_sale}
                        onChange={(e) => handleInputChange("is_for_sale", e.target.checked)}
                        className="rounded border-border"
                      />
                      <Label htmlFor="is_for_sale" className="font-medium">
                        Bu araç satılık
                      </Label>
                    </div>
                    
                    {formData.is_for_sale && (
                      <div className="space-y-2">
                        <Label htmlFor="sale_price">Satış Fiyatı</Label>
                        <Input
                          id="sale_price"
                          type="text"
                          placeholder="₺500,000"
                          value={formData.sale_price}
                          onChange={(e) => handleInputChange("sale_price", e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Garaj Fotoğrafı</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="image_url"
                        placeholder="https://example.com/garage-photo.jpg"
                        value={formData.image_url}
                        onChange={(e) => handleInputChange("image_url", e.target.value)}
                        className="flex-1"
                      />
                      <label htmlFor="image-upload">
                        <Button type="button" variant="outline" size="icon" asChild>
                          <span>
                            {isUploading ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                          </span>
                        </Button>
                      </label>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <p className="text-xs text-muted-foreground">
                      URL girebilir veya yükle butonunu kullanabilirsiniz (maks. 10MB)
                    </p>
                    {formData.image_url && (
                      <div className="mt-2">
                        <img 
                          src={formData.image_url} 
                          alt="Garaj önizleme" 
                          className="w-32 h-24 object-cover rounded-lg border"
                        />
                      </div>
                    )}
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
                      disabled={isLoading || isUploading}
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