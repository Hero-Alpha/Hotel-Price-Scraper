const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const cheerio = require("cheerio");

puppeteer.use(StealthPlugin());

module.exports = async function fetchTripComPrice({ hotelId, checkIn, checkOut, adult, children, ages }) {
    const baseUrl = "https://in.trip.com/hotels/detail/";
    const query = `?hotelId=${hotelId}&checkIn=${checkIn}&checkOut=${checkOut}&adult=${adult}&children=${children}&ages=${ages}&curr=INR`;
    const finalUrl = `${baseUrl}${query}`;

    const browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    console.log('page.waitForTimeout:', typeof page.waitForTimeout);


    // Anti-bot fingerprinting protection
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36");
    await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });

    console.log(`--Navigating to URL : [${finalUrl}]--`);
    await page.goto(finalUrl, { waitUntil: "networkidle2", timeout: 60000 });

    await new Promise(resolve => setTimeout(resolve, 3000));

    const content = await page.content();
    const $ = cheerio.load(content);

    const hotelName = $("[class*='title_nameA']").text().trim() || "Hotel name not found";
    const hotelAddress = $("[class*='address_text']").text().trim() || "Hotel address not found";
    const hotelPrice = $("[class*='priceExplain'] > div").first().text().trim() || "Hotel price not found";

    await browser.close();

    return {
        hotelName,
        hotelAddress,
        price: hotelPrice,
        hotelId,
        duration: [checkIn, checkOut],
        adult,
        children,
        url: finalUrl,
        fetchedAt: new Date().toISOString(),
    };
};
