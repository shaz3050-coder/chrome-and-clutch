import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import RecentActivity from "@/components/RecentActivity";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Hero />
        <FeaturedCars />
        <RecentActivity />
      </main>
      <Footer />
    </div>
  );
};

export default Index;