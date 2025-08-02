import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import RecentActivity from "@/components/RecentActivity";
import AIModificationTool from "@/components/AIModificationTool";
import Footer from "@/components/Footer";
import MetaTags from "@/components/ui/meta";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="sonvites.net - Sanal Garajını Oluştur"
        description="Araç tutkunlarının buluşma noktası. Sanal garajını oluştur, modifiyelerini paylaş, hikayeni anlat."
        url="https://sonvites.net"
      />
      <Header />
      <main className="pt-16">
        <Hero />
        <FeaturedCars />
        
        {/* Premium Teaser Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Crown className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Premium Özellikler</span>
              </div>
              <h2 className="heading-medium mb-4">Daha Fazlasını Keşfet</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Premium üyelikle sınırsız garaj oluşturma, gelişmiş modifikasyon araçları ve özel topluluk ayrıcalıklarından faydalanın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-primary group" asChild>
                  <Link to="/premium">
                    <Crown className="w-4 h-4 mr-2" />
                    Premium'u Keşfet
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group">
                  <Zap className="w-4 h-4 mr-2" />
                  Özellikler
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Modifikasyon Aracı */}
        <section className="py-16 px-4 bg-garage-dark">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-medium mb-4">AI Modifikasyon Danışmanı</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Yapay zeka destekli sistemimizle aracınıza en uygun modifikasyon önerilerini alın
              </p>
            </div>
            <AIModificationTool />
          </div>
        </section>
        
        <RecentActivity />
      </main>
      <Footer />
    </div>
  );
};

export default Index;