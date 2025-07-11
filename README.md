# Trip.com Hotel Price Fetcher

This is a Node.js based website scraper, used to scrape the price of hotel stay from the website *Trip.com*. The price is calculated by the website when passed multiple parameters such as:

- Hotel ID  
- Dates [Check-in, Check-out]  
- Adults  
- Children (Ages of children if any)

---

## Features

- Accepts hotel ID, dates, and guest count as input  
- Supports scraping prices for multiple hotels using `hotels.json`  
- Uses Puppeteer + Stealth to bypass bot detection (Normal puppeteer was getting caught and redirected by the website tracker)  
- Extracts hotel name, address, and price  
- Exports data into a structured JSON file  
- Easily configurable via `.env`

---

## Tech Stack

- Node.js  
- Puppeteer (with `puppeteer-extra` and stealth plugin)  
- Cheerio (for HTML parsing)  
- dotenv (for input config)

---

## Setup Instructions

```bash
1. Install dependencies:
   npm install

2. Configure input in .env:
   CHECKIN=2025-07-15
   CHECKOUT=2025-07-17
   ADULT=2
   CHILDREN=1
   AGES=5

   Note:
   - For a single hotel: add HOTEL_ID in .env
   - For multiple hotels: add all hotel IDs to hotels.json like:
     ["122411997", "121719289", "12052984"]

3. Run the scraper:
   node fetchPrice.js

4. Output:
   data/output.json
