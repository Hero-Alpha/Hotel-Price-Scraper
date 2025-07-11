require("dotenv").config();

const fs = require("fs");
const path = require("path");

const fetchTripComPrice = require("./scraper/tripCom");
const hotels = require("./hotel.json");

(async () => {
    const input = {
        // hotelId: process.env.HOTEL_ID, 
        // (use the .env hotel id in case of only 1 hotel)
        checkIn: process.env.CHECKIN,
        checkOut: process.env.CHECKOUT,
        adult: process.env.ADULT,
        children: process.env.CHILDREN || 0,
        ages: process.env.AGES || "",
    };

    try{
        const results = [];

        for(const hotelId of hotels){
            try{
                const result = await fetchTripComPrice({hotelId , ...input});
                results.push(result);
            }catch(err){
                console.error(`-##Failed to fetch for Hotel ID ${hotelId}##:`, err.message);
                results.push({
                    hotelId,
                    error:err.message,
                });
            }
        }

        const outputPath = path.join(__dirname, "data" , "output.json");
        fs.writeFileSync(outputPath , JSON.stringify(results , null , 2));

        console.log("----Price data saved to data/output.json----");
    }catch(err){
        console.error("##-Failed to fetch price-##:", err.message);
    }
})();