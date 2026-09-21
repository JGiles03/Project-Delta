require('dotenv').config();

const API_KEY = process.env.API_KEY 

const url = new URL("https://api.geoapify.com/v2/places");

url.searchParams.append("categories", "catering.cafe");

url.searchParams.append("filter", "circle:-0.1276,51.5072,1000");

url.searchParams.append("limit", "20");
url.searchParams.append("apiKey", API_KEY);

async function getPlaces() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        console.log("Places returned:", data.features.length);

        // Look at the first venue
        console.log(data.features[0]);

    } catch (error) {
        console.error("Error:", error);
    }
}

getPlaces();