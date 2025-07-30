import { Heart, Eye, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import carProfile from "@/assets/car-profile.jpg";

const FeaturedCars = () => {
  const featuredCars = [
    {
      id: 1,
      title: "BMW M3 Competition",
      owner: "speedhunter92",
      image: carProfile,
      description: "750hp'lik canavar. Turbo upgrade, exhaust, remap...",
      likes: 342,
      views: 1250,
      comments: 28,
      tags: ["BMW", "M3", "Turbo", "Modified"]
    },
    {
      id: 2,
      title: "Audi RS6 Avant",
      owner: "wagonlover",
      image: carProfile,
      description: "Ailesiz değil, hızlı. RS6 ile günlük kullanım keyfi.",
      likes: 567,
      views: 2100,
      comments: 45,
      tags: ["Audi", "RS6", "Wagon", "Daily"]
    },
    {
      id: 3,
      title: "Mercedes C63 AMG",
      owner: "amgpower",
      image: carProfile,
      description: "V8'in son nefesi. Doğal emişli güzellik.",
      likes: 289,
      views: 890,
      comments: 19,
      tags: ["Mercedes", "AMG", "V8", "Exhaust"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-medium mb-4 animate-fade-in">
            Öne Çıkan <span className="text-gradient">Garajlar</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in">
            Topluluğumuzun en beğenilen araçları ve hikayelerini keşfet. 
            Her garajın kendine özgü bir karakteri var.
          </p>
        </div>

        {/* Featured Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCars.map((car, index) => (
            <div 
              key={car.id} 
              className="car-card animate-fade-in group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={car.image} 
                  alt={car.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Heart Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <Heart className="w-5 h-5" />
                </button>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-4 text-white text-sm">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{car.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{car.comments}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Owner */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">
                      {car.owner.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">@{car.owner}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {car.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {car.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-muted text-xs rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="font-medium">{car.likes}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs hover:text-primary">
                    Garajı Gör
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in">
          <Button size="lg" className="btn-primary">
            Tüm Garajları Keşfet
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;