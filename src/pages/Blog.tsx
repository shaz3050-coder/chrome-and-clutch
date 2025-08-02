import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, Clock, Search, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import blogTech from "@/assets/blog-tech.jpg";
import blogJdm from "@/assets/blog-jdm.jpg";
import blogDrift from "@/assets/blog-drift.jpg";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const posts = [
    {
      id: 1,
      title: "Turbo Sistemlerinde Dikkat Edilmesi Gerekenler",
      excerpt: "Aracınıza turbo sistemi eklerken hangi noktalara dikkat etmeniz gerektiğini ve en iyi uygulamaları öğrenin.",
      author: "Murat Yılmaz",
      date: "2024-01-15",
      readTime: "8 dakika",
      category: "Modifikasyon",
      image: blogTech,
      featured: true,
      tags: ["turbo", "modification", "engine"]
    },
    {
      id: 2,
      title: "JDM Kültürünün Türkiye'deki Yeri",
      excerpt: "Japonya'dan çıkan JDM akımının Türkiye'de nasıl karşılık bulduğunu ve en popüler JDM araçları keşfedin.",
      author: "Ahmet Kaya",
      date: "2024-01-12",
      readTime: "6 dakika",
      category: "Kültür",
      image: blogJdm,
      featured: false,
      tags: ["jdm", "culture", "japanese"]
    },
    {
      id: 3,
      title: "Drift İçin En İyi Araç Seçimi",
      excerpt: "Drift sporuna başlamak isteyenler için uygun araç seçimi ve temel modifikasyon önerileri.",
      author: "Serkan Demir",
      date: "2024-01-10",
      readTime: "10 dakika",
      category: "Drift",
      image: blogDrift,
      featured: false,
      tags: ["drift", "racing", "cars"]
    }
  ];

  const categories = ["Tümü", "Modifikasyon", "Kültür", "Drift", "Teknoloji", "Yarış"];
  const popularTags = ["turbo", "jdm", "drift", "stance", "modification", "engine"];

  useEffect(() => {
    if (selectedCategory === "Tümü") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleTagClick = (tag) => {
    const filtered = posts.filter(post => post.tags.includes(tag));
    setFilteredPosts(filtered);
    setSelectedCategory("Tümü");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="heading-large mb-4">Blog</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Otomobil dünyasından son haberler, ipuçları ve topluluk hikayelerini keşfedin
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Blog yazılarında ara..."
                className="pl-12 bg-background/50"
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === selectedCategory ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Blog Posts */}
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className={`overflow-hidden hover-glow ${post.featured ? 'border-primary' : ''}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="relative h-48 md:h-full bg-gradient-to-br from-primary/20 to-primary/5">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        {post.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-primary text-primary-foreground">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Öne Çıkan
                            </Badge>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 p-6">
                        <CardHeader className="p-0 space-y-3">
                          <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="p-0 mt-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                              </span>
                            </div>
                            <Button variant="ghost" size="sm">
                              Devamını Oku
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popüler Etiketler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleTagClick(tag)}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bülten</CardTitle>
                  <CardDescription>
                    Yeni yazılardan haberdar olmak için abone olun
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input type="email" placeholder="E-posta adresiniz" />
                  <Button className="w-full btn-primary">
                    Abone Ol
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;