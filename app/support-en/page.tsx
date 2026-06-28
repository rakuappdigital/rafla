export const metadata = {
  title: "Rafla — Support",
  description: "Rafla app support page",
};

export default function SupportEN() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 font-sans text-stone-800">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-1">Rafla</h1>
        <p className="text-stone-500 text-sm">Support Page</p>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">About the App</h2>
        <p className="text-stone-600 leading-relaxed">
          Rafla is a personal wishlist app that lets you save product links and buy them when the time is right. All data is stored only on your device — no account required.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Frequently Asked Questions</h2>
        <div className="space-y-5">
          <div>
            <p className="font-medium mb-1">Product info isn't loading automatically. What should I do?</p>
            <p className="text-stone-600 text-sm leading-relaxed">Some websites block automatic data fetching. In this case, you can enter the product name and price manually, and paste the image URL directly from the product page.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How do I use the Share Extension?</p>
            <p className="text-stone-600 text-sm leading-relaxed">Open a product page in any app or Safari, tap the Share button, and select "Add to Rafla" from the list. Product details will be filled in automatically.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Where is my data stored?</p>
            <p className="text-stone-600 text-sm leading-relaxed">All data is stored only on your device. There is no cloud backup or account system. If you delete the app, your data will be deleted as well.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How do I add the widget?</p>
            <p className="text-stone-600 text-sm leading-relaxed">Long press on the home screen → tap "Add Widget" → search for "Rafla" → choose small or medium size → tap Add.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How do I change the language?</p>
            <p className="text-stone-600 text-sm leading-relaxed">Tap the TR / EN toggle in the top right corner of the main screen to switch between Turkish and English.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Contact</h2>
        <p className="text-stone-600 leading-relaxed">
          If you're experiencing an issue or have a suggestion, feel free to reach out:
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
        <a href="/support-tr" className="underline underline-offset-2">Türkçe</a>
      </footer>
    </main>
  );
}
