import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Clock, Users, TrendingUp, Pin, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Forum = () => {
  const categories = [
    {
      id: 1,
      title: "Genel Sohbet",
      description: "Araç hakkında genel konuşmalar ve tanışma",
      topics: 1247,
      posts: 8943,
      lastPost: {
        title: "Yeni üyelere hoş geldin mesajı",
        author: "admin",
        time: "5 dakika önce"
      },
      pinned: true
    },
    {
      id: 2,
      title: "Modifikasyon Tavsiyeleri",
      description: "Araç modifikasyonu, performans artırıcı öneriler",
      topics: 892,
      posts: 6534,
      lastPost: {
        title: "BMW E46 M3 turbo kiti deneyimleri",
        author: "speedhunter92",
        time: "2 saat önce"
      },
      pinned: false
    },
    {
      id: 3,
      title: "Drift & Track Day",
      description: "Drift teknikleri, pist günleri ve yarış deneyimleri",
      topics: 654,
      posts: 4321,
      lastPost: {
        title: "Intercity drift championship sonuçları",
        author: "driftking",
        time: "4 saat önce"
      },
      pinned: false
    },
    {
      id: 4,
      title: "Alım-Satım",
      description: "Araç, yedek parça ve aksesuar alım-satım ilanları",
      topics: 543,
      posts: 2876,
      lastPost: {
        title: "Temiz E36 M3 satılık - İstanbul",
        author: "cardealer23",
        time: "1 saat önce"
      },
      pinned: false
    },
    {
      id: 5,
      title: "Teknik Destek",
      description: "Araç arızaları, tamiri ve teknik sorular",
      topics: 789,
      posts: 5432,
      lastPost: {
        title: "N54 motor yakıt pompası sorunu",
        author: "mechanic_pro",
        time: "3 saat önce"
      },
      pinned: false
    }
  ];

  const recentTopics = [
    {
      id: 1,
      title: "2024 model BMW M4 Competition ilk izlenimler",
      author: "bmw_lover",
      replies: 23,
      views: 456,
      lastReply: "10 dakika önce",
      category: "Genel Sohbet",
      pinned: true
    },
    {
      id: 2,
      title: "Hangi lastik markası daha iyi performans veriyor?",
      author: "tire_expert",
      replies: 18,
      views: 289,
      lastReply: "25 dakika önce",
      category: "Modifikasyon",
      pinned: false
    },
    {
      id: 3,
      title: "Tuzla pisti drift deneyimi - Video içeride",
      author: "driftmaster",
      replies: 31,
      views: 567,
      lastReply: "1 saat önce",
      category: "Drift & Track",
      pinned: false
    },
    {
      id: 4,
      title: "E92 M3 V8 motor sesini nasıl iyileştirebilirim?",
      author: "v8_enthusiast",
      replies: 15,
      views: 198,
      lastReply: "2 saat önce",
      category: "Modifikasyon",
      pinned: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 px-4 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="heading-large mb-2">Forum</h1>
                <p className="text-muted-foreground text-lg">
                  Araç tutkunlarıyla deneyimlerini paylaş, sorularını sor, bilgini aktar
                </p>
              </div>
              <Button className="btn-primary" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Yeni Konu Aç
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Forum'da ara..." 
                className="pl-10"
              />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Forum Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageCircle className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold">4,325</div>
                <div className="text-sm text-muted-foreground">Toplam Konu</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold">28,106</div>
                <div className="text-sm text-muted-foreground">Toplam Mesaj</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Aktif Üye</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-muted-foreground">Çevrimiçi</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Forum Categories */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-medium">Forum Kategorileri</h2>
                <Badge variant="outline">5 kategori</Badge>
              </div>

              <div className="space-y-1">
                {categories.map((category) => (
                  <Card key={category.id} className="hover-glow cursor-pointer transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Category Icon */}
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                          {category.pinned && <Pin className="w-6 h-6 text-primary" />}
                          {!category.pinned && <MessageCircle className="w-6 h-6 text-primary" />}
                        </div>

                        {/* Category Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-lg">{category.title}</h3>
                                {category.pinned && (
                                  <Badge variant="secondary" className="text-xs">
                                    Sabitlenmiş
                                  </Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm mb-3">
                                {category.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>{category.topics} konu</span>
                                <span>{category.posts} mesaj</span>
                              </div>
                            </div>

                            {/* Last Post Info */}
                            <div className="text-right text-sm text-muted-foreground min-w-0 ml-4">
                              <div className="font-medium text-foreground truncate max-w-48 mb-1">
                                {category.lastPost.title}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Avatar className="w-5 h-5">
                                  <AvatarFallback className="text-xs">
                                    {category.lastPost.author[0].toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span>@{category.lastPost.author}</span>
                              </div>
                              <div className="text-xs mt-1">{category.lastPost.time}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Son Konular
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTopics.map((topic) => (
                    <div key={topic.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start space-x-3">
                        {topic.pinned && <Pin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm leading-tight mb-2 line-clamp-2">
                            {topic.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                            <Avatar className="w-4 h-4">
                              <AvatarFallback className="text-xs">
                                {topic.author[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>@{topic.author}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-3">
                              <span>{topic.replies} yanıt</span>
                              <span>{topic.views} görüntülenme</span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {topic.lastReply}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Online Users */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Çevrimiçi Kullanıcılar
                  </CardTitle>
                  <CardDescription>89 kullanıcı çevrimiçi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center flex-wrap gap-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <Avatar key={i} className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {String.fromCharCode(65 + i)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="text-sm text-muted-foreground">+77 diğer</div>
                  </div>
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

export default Forum;