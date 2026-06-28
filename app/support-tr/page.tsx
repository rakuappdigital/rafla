export const metadata = {
  title: "Rafla — Destek",
  description: "Rafla uygulaması destek sayfası",
};

export default function SupportTR() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 font-sans text-stone-800">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-1">Rafla</h1>
        <p className="text-stone-500 text-sm">Destek Sayfası</p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Uygulama Hakkında</h2>
        <p className="text-stone-600 leading-relaxed">
          Rafla, beğendiğin ürünlerin linkini kaydedip daha sonra satın almanı kolaylaştıran kişisel bir istek listesi uygulamasıdır. Tüm veriler yalnızca cihazında saklanır, hesap açmana gerek yoktur.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Sıkça Sorulan Sorular</h2>
        <div className="space-y-5">
          <div>
            <p className="font-medium mb-1">Ürün eklerken bilgiler otomatik gelmiyor, ne yapmalıyım?</p>
            <p className="text-stone-600 text-sm leading-relaxed">Bazı siteler (Trendyol gibi) otomatik bilgi çekmeyi engelleyebilir. Bu durumda ürün adı ve fiyatı manuel olarak girebilirsin. Görseli de ürün sayfasından kopyalayarak ekleyebilirsin.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Share Extension nasıl kullanılır?</p>
            <p className="text-stone-600 text-sm leading-relaxed">Herhangi bir uygulamada veya Safari'de ürün sayfasını açtıktan sonra "Paylaş" butonuna bas ve listeden "Rafla'ya Ekle"yi seç. Ürün bilgileri otomatik olarak doldurulur.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Verilerim nerede saklanıyor?</p>
            <p className="text-stone-600 text-sm leading-relaxed">Tüm veriler yalnızca kendi cihazında saklanır. Bulut yedeklemesi veya hesap sistemi yoktur. Uygulamayı silersen veriler de silinir.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Widget nasıl eklenir?</p>
            <p className="text-stone-600 text-sm leading-relaxed">Ana ekranda boş bir alana uzun bas → "Widget Ekle" → "Rafla" ara → küçük veya orta boyutu seç → Ekle.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Dili nasıl değiştirebilirim?</p>
            <p className="text-stone-600 text-sm leading-relaxed">Ana ekranın sağ üstündeki TR / EN butonuna basarak dili değiştirebilirsin.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">İletişim</h2>
        <p className="text-stone-600 leading-relaxed">
          Sorun yaşıyorsan veya öneride bulunmak istiyorsan bize ulaşabilirsin:
        </p>
        <a
          href="mailto:sivilpenguen@gmail.com"
          className="inline-block mt-3 text-stone-800 font-medium underline underline-offset-2"
        >
          sivilpenguen@gmail.com
        </a>
      </section>

      <footer className="pt-8 border-t border-stone-100 text-xs text-stone-400">
        © {new Date().getFullYear()} Raku App Digital · Rafla
        <span className="mx-2">·</span>
        <a href="/support-en" className="underline underline-offset-2">English</a>
      </footer>
    </main>
  );
}
