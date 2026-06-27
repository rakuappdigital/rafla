import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

const UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });

  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": UA,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "tr-TR,tr;q=0.9,en;q=0.8",
      },
      redirect: "follow",
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const meta = (prop: string) =>
      $(`meta[property="${prop}"]`).attr("content") ||
      $(`meta[name="${prop}"]`).attr("content") ||
      undefined;

    const title =
      meta("og:title") ||
      meta("twitter:title") ||
      $("title").text().trim() ||
      "";

    const image =
      meta("og:image") ||
      meta("twitter:image") ||
      meta("og:image:url") ||
      undefined;

    const description =
      meta("og:description") ||
      meta("twitter:description") ||
      meta("description") ||
      undefined;

    const siteName =
      meta("og:site_name") ||
      new URL(url).hostname.replace(/^www\./, "");

    // fiyat: og:price:amount veya product:price:amount
    const priceAmount =
      meta("og:price:amount") ||
      meta("product:price:amount") ||
      undefined;
    const priceCurrency =
      meta("og:price:currency") ||
      meta("product:price:currency") ||
      undefined;
    let price: string | undefined;
    if (priceAmount) {
      price = priceCurrency ? `${priceAmount} ${priceCurrency}` : priceAmount;
    }

    return NextResponse.json({ title, image, description, price, siteName });
  } catch {
    return NextResponse.json({
      title: "",
      image: undefined,
      description: undefined,
      price: undefined,
      siteName: new URL(url).hostname.replace(/^www\./, ""),
    });
  }
}
