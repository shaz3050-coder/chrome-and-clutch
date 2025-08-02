import { Clock, TrendingUp, Users, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "new_garage",
      user: "mustafa_ankara",
      action: "yeni garaj oluşturdu",
      target: "Renault Megane RS",
      time: "2 saat önce",
      icon: Camera,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "modification",
      user: "can_bursa",
      action: "modifikasyon ekledi",
      target: "Seat Leon FR - Exhaust Upgrade",
      time: "4 saat önce", 
      icon: TrendingUp,
      color: "text-blue-500"
    },
    {
      id: 3,
      type: "join",
      user: "ahmet_adana",
      action: "topluluğa katıldı",
      target: "",
      time: "6 saat önce",
      icon: Users,
      color: "text-primary"
    },
    {
      id: 4,
      type: "garage_update",
      user: "kemal_trabzon",
      action: "garajını güncelledi",
      target: "Peugeot 208 GTI",
      time: "1 gün önce",
      icon: Camera,
      color: "text-purple-500"
    },
    {
      id: 5,
      type: "new_garage",
      user: "omer_antalya",
      action: "yeni garaj oluşturdu",
      target: "Opel Astra OPC",
      time: "2 gün önce",
      icon: Camera,
      color: "text-green-500"
    }
  ];

  const popularUsers = [
    {
      username: "mustafa_ankara",
      garages: 8,
      followers: 420,
      avatar: "M"
    },
    {
      username: "zeynep_istanbul",
      garages: 5,
      followers: 380,
      avatar: "Z"
    },
    {
      username: "can_bursa",
      garages: 12,
      followers: 650,
      avatar: "C"
    },
    {
      username: "ayse_izmir",
      garages: 6,
      followers: 290,
      avatar: "A"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="heading-medium animate-fade-in">
                Son <span className="text-gradient">Aktiviteler</span>
              </h2>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                Tümünü Gör
              </Button>
            </div>

            <div className="space-y-6">
              {activities.map((activity, index) => (
                <div 
                  key={activity.id}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
                      <activity.icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-primary">@{activity.user}</span>
                        <span className="text-muted-foreground">{activity.action}</span>
                      </div>
                      
                      {activity.target && (
                        <div className="text-foreground font-medium mb-2">
                          {activity.target}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Users Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="heading-small mb-6 animate-fade-in">
              Popüler <span className="text-gradient">Kullanıcılar</span>
            </h3>

            <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
              <div className="space-y-4">
                {popularUsers.map((user, index) => (
                  <div 
                    key={user.username}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-bold text-primary-foreground">
                      {user.avatar}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">@{user.username}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.garages} garaj • {user.followers} takipçi
                      </div>
                    </div>

                    {/* Follow Button */}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-xs hover:text-primary"
                      asChild
                    >
                      <a href={`/profile/${user.username}`}>Profil</a>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  className="w-full text-primary hover:text-primary"
                  asChild
                >
                  <a href="/community">Tüm Kullanıcıları Gör</a>
                </Button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 mt-6 animate-fade-in">
              <h4 className="font-semibold text-foreground mb-4">Platform İstatistikleri</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Toplam Üye</span>
                  <span className="font-bold text-primary">4,580</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Aktif Garaj</span>
                  <span className="font-bold text-primary">1,240</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Bu Hafta</span>
                  <span className="font-bold text-green-500">+56</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;