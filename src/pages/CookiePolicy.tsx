const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-large mb-8">Çerez Politikası</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Çerez Nedir?</h2>
              <p className="text-muted-foreground mb-4">
                Çerezler, web sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen 
                küçük veri dosyalarıdır. Bu dosyalar site deneyiminizi iyileştirmek 
                ve kişiselleştirmek için kullanılır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Çerez Türleri</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">Zorunlu Çerezler</h3>
                <p className="text-muted-foreground mb-2">
                  Platform temel işlevlerinin çalışması için gereklidir:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Oturum yönetimi</li>
                  <li>Güvenlik</li>
                  <li>Kimlik doğrulama</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">Performans Çerezleri</h3>
                <p className="text-muted-foreground mb-2">
                  Site performansını ve kullanıcı deneyimini iyileştirmek için:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Sayfa yükleme süreleri</li>
                  <li>Kullanım istatistikleri</li>
                  <li>Hata raporlama</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">İşlevsel Çerezler</h3>
                <p className="text-muted-foreground mb-2">
                  Kişiselleştirilmiş deneyim için:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Dil tercihleri</li>
                  <li>Tema ayarları</li>
                  <li>Kullanıcı tercihleri</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Çerez Yönetimi</h2>
              <p className="text-muted-foreground mb-4">
                Tarayıcı ayarlarınızdan çerezleri yönetebilir, silebilir veya engelleyebilirsiniz. 
                Ancak bazı çerezleri devre dışı bırakmanız site işlevselliğini etkileyebilir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Üçüncü Taraf Çerezleri</h2>
              <p className="text-muted-foreground mb-4">
                Platformumuzda analitik ve sosyal medya entegrasyonları için 
                üçüncü taraf çerezleri kullanılabilir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. İletişim</h2>
              <p className="text-muted-foreground">
                Çerez politikası hakkında sorularınız için: info@sonvites.net
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;