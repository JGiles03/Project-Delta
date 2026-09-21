# Backend

## Geoapify Places API

We use the Geoapify Places API to retrieve venue data such as cafes, restaurants, parks and other points of interest.
API documentation: https://apidocs.geoapify.com/docs/places/#api 

### Base Endpoint

```javascript
https://api.geoapify.com/v2/places
```

### Search Around a Location

Use a circle filter:

filter=circle:LONGITUDE,LATITUDE,RADIUS

Example: cafés within 1 km:

```javascript
const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${longitude},${latitude},${radius}&limit=${limit}&apiKey=${API_KEY}`;
```

```javascript
const url = new URL("https://api.geoapify.com/v2/places");

url.searchParams.append("categories", "catering.cafe");
url.searchParams.append("filter", "circle:-0.1276,51.5072,1000");
url.searchParams.append("limit", "20");
url.searchParams.append("apiKey", API_KEY);

const response = await fetch(url);
const data = await response.json();
```


### Categories

catering.cafe
catering.restaurant
entertainment.museum
leisure.playground
commercial.supermarket
commercial.shopping_mall

### Query Parameters

- categories - type of place
- filter - Filters by search area
- conditions - e.g. wheelchair access
- limit - maximum results
- apiKey 

### Reading Results

Places are returned inside:

```javascript
data = response.json()
data.features 
```

Useful values are inside each feature's `properties`:

```javascript
const place = feature.properties;

place.place_id
place.name
place.categories
place.formatted
place.postcode
place.district
place.lat
place.lon
place.website
place.opening_hours
```


### Place Details

For more information about a specific place:

```text
https://api.geoapify.com/v2/place-details
```

Use the `place_id` returned by the Places API:

```javascript
url.searchParams.append("id", placeId);
url.searchParams.append("apiKey", API_KEY);
```

### Data flow

Geoapify Places API -> JSON responses of venues -> Clean / select required fields -> PostgreSQL -> Add collected data -> Frontend map

