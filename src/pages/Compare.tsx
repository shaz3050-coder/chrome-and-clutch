import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  X,
  Car,
  Zap,
  Gauge,
  Fuel,
  Calendar,
  DollarSign
} from "lucide-react";
import MetaTags from "@/components/ui/meta";

interface CarSpec {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  image: string;
  specs: {
    engine: string;
    horsepower: number;
    torque: number;
    acceleration: string;
    topSpeed: number;
    fuelConsumption: string;
    price: string;
    weight: number;
    drivetrain: string;
  };
}

const Compare = () => {
  const [selectedCars, setSelectedCars] = useState<CarSpec[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with real data
  const availableCars: CarSpec[] = [
    {
      id: "1",
      name: "Golf 7 GTI",
      brand: "Volkswagen",
      model: "Golf GTI",
      year: 2018,
      image: "/placeholder.svg",
      specs: {
        engine: "2.0L Turbo",
        horsepower: 230,
        torque: 350,
        acceleration: "6.2s",
        topSpeed: 250,
        fuelConsumption: "7.2L/100km",
        price: "450.000₺",
        weight: 1395,
        drivetrain: "FWD"
      }
    },
    {
      id: "2", 
      name: "BMW M3 F80",
      brand: "BMW",
      model: "M3",
      year: 2016,
      image: "/placeholder.svg",
      specs: {
        engine: "3.0L Twin Turbo",
        horsepower: 431,
        torque: 550,
        acceleration: "4.3s",
        topSpeed: 280,
        fuelConsumption: "10.8L/100km",
        price: "850.000₺",
        weight: 1655,
        drivetrain: "RWD"
      }
    }
  ];

  const filteredCars = availableCars.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addCarToComparison = (car: CarSpec) => {
    if (selectedCars.length < 2 && !selectedCars.find(c => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const removeCarFromComparison = (carId: string) => {
    setSelectedCars(selectedCars.filter(c => c.id !== carId));
  };

  const ComparisonRow = ({ label, icon: Icon, getValue }: { 
    label: string; 
    icon: any; 
    getValue: (car: CarSpec) => string | number;
  }) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-border">
      <div className="flex items-center space-x-2 font-medium">
        <Icon className="w-4 h-4 text-primary" />
        <span>{label}</span>
      </div>
      {selectedCars.map((car, index) => (
        <div key={car.id} className="text-center">
          {getValue(car)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="Araç Karşılaştırma - sonvites.net"
        description="İki aracı detaylı şekilde karşılaştırın. Performans, özellikler ve teknik veriler."
      />
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-large mb-4">
              Araç <span className="text-gradient">Karşılaştırma</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              İki aracı detaylı şekilde karşılaştırın ve hangi araç size daha uygun karar verin
            </p>
          </div>

          {/* Car Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Araç Seçimi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Araç ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCars.map((car) => (
                  <Card key={car.id} className="cursor-pointer hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <img 
                        src={car.image} 
                        alt={car.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold mb-1">{car.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {car.year} • {car.specs.horsepower} HP
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => addCarToComparison(car)}
                        disabled={selectedCars.length >= 2 || selectedCars.some(c => c.id === car.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Karşılaştırmaya Ekle
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          {selectedCars.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Karşılaştırma Tablosu</CardTitle>
              </CardHeader>
              <CardContent>
                
                {/* Selected Cars Header */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div></div>
                  {selectedCars.map((car) => (
                    <div key={car.id} className="text-center">
                      <div className="relative">
                        <img 
                          src={car.image} 
                          alt={car.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => removeCarFromComparison(car.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className="font-bold text-lg">{car.name}</h3>
                      <p className="text-muted-foreground">{car.year}</p>
                    </div>
                  ))}
                  {selectedCars.length === 1 && (
                    <div className="text-center border-2 border-dashed border-border rounded-lg p-8">
                      <Car className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">İkinci aracı seçin</p>
                    </div>
                  )}
                </div>

                {/* Comparison Rows */}
                {selectedCars.length === 2 && (
                  <div className="space-y-0">
                    <ComparisonRow 
                      label="Motor"
                      icon={Zap}
                      getValue={(car) => car.specs.engine}
                    />
                    <ComparisonRow 
                      label="Güç (HP)"
                      icon={Gauge}
                      getValue={(car) => `${car.specs.horsepower} HP`}
                    />
                    <ComparisonRow 
                      label="Tork (Nm)"
                      icon={Gauge}
                      getValue={(car) => `${car.specs.torque} Nm`}
                    />
                    <ComparisonRow 
                      label="0-100 km/h"
                      icon={Zap}
                      getValue={(car) => car.specs.acceleration}
                    />
                    <ComparisonRow 
                      label="Maksimum Hız"
                      icon={Gauge}
                      getValue={(car) => `${car.specs.topSpeed} km/h`}
                    />
                    <ComparisonRow 
                      label="Yakıt Tüketimi"
                      icon={Fuel}
                      getValue={(car) => car.specs.fuelConsumption}
                    />
                    <ComparisonRow 
                      label="Ağırlık"
                      icon={Car}
                      getValue={(car) => `${car.specs.weight} kg`}
                    />
                    <ComparisonRow 
                      label="Çekiş Sistemi"
                      icon={Car}
                      getValue={(car) => car.specs.drivetrain}
                    />
                    <ComparisonRow 
                      label="Fiyat"
                      icon={DollarSign}
                      getValue={(car) => car.specs.price}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;