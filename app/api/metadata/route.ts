import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function scrapeOwn(url: string) {
  const res = await fetch(url, {
    headers: {
      "user-agent": UA,
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "accept-language": "tr-TR,tr;q=0.9,en;q=0.8",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) return null;

  const html = await res.text();
  const $ = cheerio.load(html);

  const meta = (prop: string) =>
    $(`meta[property="${prop}"]`).attr("content") ||
    $(`meta[name="${prop}"]`).attr("content") ||
    undefined;

  const title =
    meta("og:title") || meta("twitter:title") || $("title").text().trim() || "";
  const image =
    meta("og:image") || meta("twitter:image") || meta("og:image:url") || undefined;
  const description =
    meta("og:description") || meta("twitter:description") || meta("description") || undefined;
  const siteName =
    meta("og:site_name") || new URL(url).hostname.replace(/^www\./, "");
  const priceAmount = meta("og:price:amount") || meta("product:price:amount");
  const priceCurrency = meta("og:price:currency") || meta("product:price:currency");
  const price = priceAmount
    ? priceCurrency ? `${priceAmount} ${priceCurrency}` : priceAmount
    : undefined;

  return { title, image, description, price, siteName };
}

async function scrapeViaMicrolink(url: string) {
  const res = await fetch(
    `https://api.microlink.io?url=${encodeURIComponent(url)}&audio=false&video=false`,
    { signal: AbortSignal.timeout(10000) }
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (data.status !== "success") return null;
  const d = data.data;
  return {
    title: d.title || "",
    image: d.image?.url || undefined,
    description: d.description || undefined,
    price: undefined,
    siteName: d.publisher || new URL(url).hostname.replace(/^www\./, ""),
  };
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });

  try {
    // 1. Kendi scraper'ımız
    const own = await scrapeOwn(url).catch(() => null);
    if (own && own.title && own.image) {
      return NextResponse.json(own);
    }

    // 2. Microlink fallback (title veya image eksikse)
    const ml = await scrapeViaMicrolink(url).catch(() => null);
    if (ml && ml.title) {
      return NextResponse.json({
        title: ml.title || own?.title || "",
        image: ml.image || own?.image || undefined,
        description: ml.description || own?.description || undefined,
        price: own?.price || undefined,
        siteName: ml.siteName || own?.siteName || new URL(url).hostname.replace(/^www\./, ""),
      });
    }

    // 3. En azından kendi scraper'ından ne geldiyse dön
    return NextResponse.json(
      own ?? { title: "", image: undefined, description: undefined, price: undefined, siteName: new URL(url).hostname.replace(/^www\./, "") }
    );
  } catch {
    return NextResponse.json({
      title: "",
      image: undefined,
      description: undefined,
      price: undefined,
      siteName: "",
    });
  }
}
