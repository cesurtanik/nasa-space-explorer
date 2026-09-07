import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// NASA API KEY kontrolü
console.log(
  "NASA KEY DURUMU:",
  process.env.NASA_API_KEY ? "VAR" : "YOK"
);


// ====================
// APOD
// ====================

app.get("/api/apod", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    );

    const responseText = await response.text();

    console.log("NASA APOD STATUS:", response.status);

    if (!response.ok) {
      console.error("NASA APOD RESPONSE:", responseText);
      throw new Error(`NASA API ${response.status} hatası`);
    }

    const data = JSON.parse(responseText);

    res.json(data);
  } catch (error) {
    console.error("APOD HATASI:", error);

    res.status(500).json({
      error: "NASA verisi alınamadı",
    });
  }
});


// ====================
// MARS
// ====================

app.get("/api/mars", async (req, res) => {
  try {
    const rover = req.query.rover || "Curiosity";

    const allowedRovers = [
      "Curiosity",
      "Perseverance",
      "Opportunity",
    ];

    if (!allowedRovers.includes(rover)) {
      return res.status(400).json({
        error: "Geçersiz rover seçimi",
      });
    }

    const response = await fetch(
      `https://images-api.nasa.gov/search?q=Mars%20${rover}&media_type=image`
    );

    if (!response.ok) {
      throw new Error("NASA Mars API isteği başarısız oldu");
    }

    const data = await response.json();

    const items = data.collection.items
      .filter((item) => item.links?.[0]?.href)
      .slice(0, 12)
      .map((item) => ({
        nasa_id: item.data[0].nasa_id,
        title: item.data[0].title,
        description: item.data[0].description,
        date_created: item.data[0].date_created,
        image_url: item.links[0].href,
      }));

    res.json(items);
  } catch (error) {
    console.error("MARS HATASI:", error);

    res.status(500).json({
      error: "Mars görüntüleri alınamadı",
    });
  }
});


// ====================
// ASTEROIDS
// ====================

app.get("/api/asteroids", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const startDate = req.query.start_date || today;
    const endDate = req.query.end_date || startDate;

    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`
    );

    const responseText = await response.text();

    if (!response.ok) {
      console.error("NASA ASTEROID RESPONSE:", responseText);
      throw new Error(`NASA Asteroid API ${response.status} hatası`);
    }

    const data = JSON.parse(responseText);

    const asteroids = [];

    Object.values(data.near_earth_objects).forEach((dayAsteroids) => {
      dayAsteroids.forEach((asteroid) => {
        const approach = asteroid.close_approach_data?.[0];

        asteroids.push({
          id: asteroid.id,
          name: asteroid.name,
          nasa_jpl_url: asteroid.nasa_jpl_url,
          is_potentially_hazardous:
            asteroid.is_potentially_hazardous_asteroid,
          diameter_min_km:
            asteroid.estimated_diameter?.kilometers
              ?.estimated_diameter_min,
          diameter_max_km:
            asteroid.estimated_diameter?.kilometers
              ?.estimated_diameter_max,
          close_approach_date:
            approach?.close_approach_date,
          miss_distance_km:
            approach?.miss_distance?.kilometers,
          relative_velocity_kmh:
            approach?.relative_velocity?.kilometers_per_hour,
        });
      });
    });

    res.json(asteroids);
  } catch (error) {
    console.error("ASTEROID HATASI:", error);

    res.status(500).json({
      error: "Asteroid verileri alınamadı",
    });
  }
});


// ====================
// SERVER
// ====================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`NASA backend çalışıyor: ${PORT}`);
});

setInterval(() => {
  console.log("Backend çalışıyor...");
}, 10000);