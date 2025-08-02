import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageCircle, TrendingUp, Calendar, MapPin, Star, Plus } from "lucide-react";

const Community = () => {
  const events = [
    {
      id: 1,
      title: "İstanbul Drift Buluşması",
      date: "2024-02-15",
      location: "Tuzla Circuit",
      participants: 45,
      image: "/placeholder.svg",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Ankara JDM Toplantısı",
      date: "2024-02-20",
      location: "Anfa Meydanı",
      participants: 32,
      image: "/placeholder.svg",
      status: "upcoming"
    }
  ];

  const forums = [
    {
      id: 1,
      title: "Modifikasyon Tavsiyeleri",
      description: "Araç modifikasyonu hakkında soru, öneri ve deneyim paylaşımları",
      posts: 1247,
      members: 3421,
      lastPost: "2 saat önce",
      category: "modification"
    },
    {
      id: 2,
      title: "Drift & Track Day",
      description: "Drift teknikleri, pist günleri ve yarış deneyimleri",
      posts: 892,
      members: 2156,
      lastPost: "5 saat önce",
      category: "racing"
    },
    {
      id: 3,
      title: "Alım-Satım",
      description: "Araç, yedek parça ve aksesuar alım-satım ilanları",
      posts: 654,
      members: 1876,
      lastPost: "1 saat önce",
      category: "marketplace"
    }
  ];

  const topMembers = [
    {
      id: 1,
      username: "speedmaster",
      avatar: "/placeholder.svg",
      points: 2840,
      title: "Drift Ustası",
      posts: 156
    },
    {
      id: 2,
      username: "jdm_expert",
      avatar: "/placeholder.svg",
      points: 2195,
      title: "JDM Uzmanı",
      posts: 143
    },
    {
      id: 3,
      username: "turbo_king",
      avatar: "/placeholder.svg",
      points: 1876,
      title: "Modifikasyon Gurusu",
      posts: 128
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="heading-large mb-4">Topluluk</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Otomobil tutkunlarıyla buluşun, deneyimlerinizi paylaşın, etkinliklere katılın
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button className="btn-primary" size="lg" asChild>
                <a href="/register">
                  <Plus className="w-5 h-5 mr-2" />
                  Topluluğa Katıl
                </a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '#events'}>
                <Calendar className="w-5 h-5 mr-2" />
                Etkinliklere Bak
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold">5,247</div>
                <div className="text-sm text-muted-foreground">Aktif Üye</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageCircle className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold">12,843</div>
                <div className="text-sm text-muted-foreground">Forum Gönderisi</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold">47</div>
                <div className="text-sm text-muted-foreground">Bu Ay Etkinlik</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold">892</div>
                <div className="text-sm text-muted-foreground">Günlük Aktiflik</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Events */}
              <section id="events">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-medium">Yaklaşan Etkinlikler</h2>
                  <Button variant="outline" size="sm">Tümünü Gör</Button>
                </div>
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover-glow">
                      <div className="flex">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(event.date).toLocaleDateString('tr-TR')}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Users className="w-4 h-4" />
                                  <span>{event.participants} kişi</span>
                                </span>
                              </div>
                            </div>
                            <Button size="sm">Katıl</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Forum Categories */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-medium">Forum Kategorileri</h2>
                  <Button variant="outline" size="sm">Tümünü Gör</Button>
                </div>
                <div className="space-y-4">
                  {forums.map((forum) => (
                    <Card key={forum.id} className="hover-glow cursor-pointer" onClick={() => window.location.href = '/forum'}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{forum.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {forum.description}
                            </CardDescription>
                          </div>
                          <Badge variant="outline">
                            {forum.category === 'modification' && 'Modifikasyon'}
                            {forum.category === 'racing' && 'Yarış'}
                            {forum.category === 'marketplace' && 'Pazar'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span>{forum.posts} gönderi</span>
                            <span>{forum.members} üye</span>
                          </div>
                          <span>Son: {forum.lastPost}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Star className="w-5 h-5 mr-2 text-primary" />
                    En Aktif Üyeler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topMembers.map((member, index) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">@{member.username}</div>
                        <div className="text-sm text-muted-foreground">{member.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {member.points} puan • {member.posts} gönderi
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Join */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hızlı Katılım</CardTitle>
                  <CardDescription>
                    Topluluğa katılın ve deneyimlerinizi paylaşmaya başlayın
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full btn-primary" asChild>
                    <a href="/register">
                      <Users className="w-4 h-4 mr-2" />
                      Topluluğa Katıl
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/forum">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Forum'a Git
                    </a>
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

export default Community;