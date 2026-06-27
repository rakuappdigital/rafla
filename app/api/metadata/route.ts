import { NextRequest, NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });

  try {
    const { result } = await ogs({
      url,
      fetchOptions: {
        headers: {
          "user-agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        },
      },
    });

    const image =
      result.ogImage?.[0]?.url ||
      result.twitterImage?.[0]?.url ||
      undefined;

    // basit fiyat tespiti — og:price:amount veya description içinden
    const priceAmount = (result as Record<string, unknown>)["ogPriceAmount"] as string | undefined;
    const priceCurrency = (result as Record<string, unknown>)["ogPriceCurrency"] as string | undefined;
    let price: string | undefined;
    if (priceAmount) {
      price = priceCurrency ? `${priceAmount} ${priceCurrency}` : priceAmount;
    }

    return NextResponse.json({
      title: result.ogTitle || result.dcTitle || "",
      image,
      price,
      siteName: result.ogSiteName || new URL(url).hostname,
    });
  } catch {
    return NextResponse.json({ title: "", image: undefined, price: undefined, siteName: "" });
  }
}
