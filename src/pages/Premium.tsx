import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Crown, Zap, Shield, Camera, Users, TrendingUp } from "lucide-react";

const Premium = () => {
  const features = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Sınırsız Fotoğraf",
      description: "Garajınıza istediğiniz kadar fotoğraf ekleyin"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Öne Çıkan Garaj",
      description: "Garajınız ana sayfada öne çıkan bölümde görünür"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Öncelikli Destek",
      description: "7/24 öncelikli müşteri desteği"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Özel Topluluk",
      description: "Premium üyeler için özel Discord sunucusu"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Detaylı Analitikler",
      description: "Garaj görüntüleme ve etkileşim istatistikleri"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Erken Erişim",
      description: "Yeni özelliklere ilk erişim hakkı"
    }
  ];

  const plans = [
    {
      name: "Basic",
      price: "0",
      period: "Ücretsiz",
      description: "Başlamak için ideal",
      features: [
        "5 fotoğrafa kadar",
        "Temel garaj özellikleri",
        "Topluluk erişimi",
        "E-posta desteği"
      ],
      cta: "Ücretsiz Başla",
      popular: false
    },
    {
      name: "Premium",
      price: "29",
      period: "aylık",
      description: "Ciddi otomobil severlere",
      features: [
        "Sınırsız fotoğraf",
        "Öne çıkan garaj",
        "Öncelikli destek",
        "Özel topluluk",
        "Detaylı analitikler",
        "Erken erişim"
      ],
      cta: "Premium'a Geç",
      popular: true
    },
    {
      name: "Pro",
      price: "79",
      period: "aylık",
      description: "Profesyonel kullanıcılar için",
      features: [
        "Tüm Premium özellikler",
        "Özel rozet",
        "API erişimi",
        "Özel alan adı",
        "Reklamsız deneyim",
        "Kişisel hesap yöneticisi"
      ],
      cta: "Pro'ya Geç",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Crown className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Premium Üyelik</span>
            </div>
            
            <h1 className="heading-large mb-6">
              Tutkunu <span className="text-primary">Sonraki Seviyeye</span><br />
              Taşı
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Premium üyelikle otomobil tutkunuzu en üst seviyede yaşayın. 
              Özel özellikler, öncelikli destek ve daha fazlası.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Premium Üye</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Memnuniyet Oranı</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5★</div>
                <div className="text-sm text-muted-foreground">Ortalama Değerlendirme</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-medium mb-4">Premium Özellikler</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Premium üyelikle elde edeceğiniz tüm avantajları keşfedin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover-glow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-medium mb-4">Planlar ve Fiyatlar</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Size en uygun planı seçin ve premium deneyime başlayın
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''} hover-glow`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        En Popüler
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="my-4">
                      <span className="text-4xl font-bold">₺{plan.price}</span>
                      {plan.price !== "0" && <span className="text-muted-foreground">/{plan.period}</span>}
                    </div>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Sorularınız mı var? 
              </p>
              <Button variant="outline">
                Bizimle İletişime Geçin
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="text-center py-12">
                <Crown className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="heading-medium mb-4">Premium Deneyimi Başlatın</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  İlk 7 gün ücretsiz deneyin. İstediğiniz zaman iptal edebilirsiniz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-primary">
                    Ücretsiz Deneme Başlat
                  </Button>
                  <Button size="lg" variant="outline">
                    Daha Fazla Bilgi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Premium;