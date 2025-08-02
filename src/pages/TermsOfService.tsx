const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-large mb-8">Kullanım Şartları</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Genel Şartlar</h2>
              <p className="text-muted-foreground mb-4">
                sonvites.net platformunu kullanarak bu şartları kabul etmiş sayılırsınız. 
                Platformumuz araç tutkunları için bir topluluk platformudur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Kullanıcı Sorumlulukları</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Doğru ve güncel bilgiler paylaşmak</li>
                <li>Diğer kullanıcılara saygılı davranmak</li>
                <li>Telif haklarına uygun içerik paylaşmak</li>
                <li>Spam ve zararlı içerik paylaşmamak</li>
                <li>Platform kurallarına uymak</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. İçerik Politikası</h2>
              <p className="text-muted-foreground mb-4">
                Paylaştığınız içerikler:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Yasal ve uygun olmalı</li>
                <li>Araç teması ile ilgili olmalı</li>
                <li>Diğer kullanıcıları rahatsız etmemeli</li>
                <li>Ticari spam içermemeli</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Hesap Güvenliği</h2>
              <p className="text-muted-foreground mb-4">
                Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi güvenli tutun 
                ve şüpheli aktiviteleri bildirin.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Platform Kullanımı</h2>
              <p className="text-muted-foreground mb-4">
                Platform hizmetlerini kötüye kullanmak yasaktır. Bu durumda hesabınız 
                askıya alınabilir veya kapatılabilir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. İletişim</h2>
              <p className="text-muted-foreground">
                Kullanım şartları hakkında sorularınız için: info@sonvites.net
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;