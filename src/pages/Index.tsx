import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import RecentActivity from "@/components/RecentActivity";
import AIModificationTool from "@/components/AIModificationTool";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Hero />
        <FeaturedCars />
        
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