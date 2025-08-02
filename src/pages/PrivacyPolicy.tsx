const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-large mb-8">Gizlilik Politikası</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Genel Bilgiler</h2>
              <p className="text-muted-foreground mb-4">
                Bu gizlilik politikası, sonvites.net platformunu kullanırken kişisel verilerinizin 
                nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi vermektedir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Toplanan Bilgiler</h2>
              <p className="text-muted-foreground mb-4">
                Platformumuzu kullanırken aşağıdaki bilgileri toplayabiliriz:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Kayıt sırasında verdiğiniz kişisel bilgiler (e-posta, kullanıcı adı)</li>
                <li>Garaj ve araç bilgileri</li>
                <li>Platform kullanım verileri</li>
                <li>İletişim bilgileri</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Bilgilerin Kullanımı</h2>
              <p className="text-muted-foreground mb-4">
                Toplanan bilgiler aşağıdaki amaçlarla kullanılır:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Platform hizmetlerinin sağlanması</li>
                <li>Kullanıcı deneyiminin iyileştirilmesi</li>
                <li>Güvenlik önlemlerinin alınması</li>
                <li>İletişim ve destek hizmetleri</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Bilgi Güvenliği</h2>
              <p className="text-muted-foreground mb-4">
                Kişisel verilerinizi korumak için uygun teknik ve idari önlemler almaktayız. 
                Verileriniz şifreleme ve güvenli sunucular aracılığıyla korunmaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. İletişim</h2>
              <p className="text-muted-foreground">
                Gizlilik politikası hakkında sorularınız için: info@sonvites.net
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;