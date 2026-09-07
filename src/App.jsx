import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const planetDetails = {
  Merkür: {
    description: "Güneş'e en yakın ve Güneş Sistemi'nin en küçük gezegenidir.",
    diameter: "4.879 km",
    moons: "0",
  },
  Venüs: {
    description: "Kalın atmosferi ve yoğun sera etkisiyle Güneş Sistemi'nin en sıcak gezegenidir.",
    diameter: "12.104 km",
    moons: "0",
  },
  Dünya: {
    description: "Sıvı suyun yüzeyinde bulunduğu ve yaşamın bilindiği tek gezegendir.",
    diameter: "12.742 km",
    moons: "1",
  },
  Mars: {
    description: "Demir oksit nedeniyle kızıl görünen gezegendir.",
    diameter: "6.779 km",
    moons: "2",
  },
    Jüpiter: {
    description: "Güneş Sistemi'nin en büyük gezegeni ve dev bir gaz devidir.",
    diameter: "139.820 km",
    moons: "95+",
  },
  Satürn: {
    description: "Muhteşem halka sistemiyle tanınan büyük bir gaz devidir.",
    diameter: "116.460 km",
    moons: "140+",
  },
  Uranüs: {
    description: "Ekseninin büyük ölçüde yana yatık olmasıyla dikkat çeken buz devidir.",
    diameter: "50.724 km",
    moons: "28",
  },
  Neptün: {
    description: "Güneş Sistemi'nin en uzak gezegeni ve güçlü rüzgarlarıyla bilinen buz devidir.",
    diameter: "49.244 km",
    moons: "16",
  },
};
  const [apod, setApod] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [marsPhotos, setMarsPhotos] = useState([]);
const [marsLoading, setMarsLoading] = useState(true);
const [marsError, setMarsError] = useState("");
const [selectedRover, setSelectedRover] = useState("Curiosity");
const [asteroids, setAsteroids] = useState([]);
const [asteroidLoading, setAsteroidLoading] = useState(true);
const [asteroidError, setAsteroidError] = useState("");

useEffect(() => {
 fetch("https://nasa-space-explorer-ehcz.onrender.com/api/apod")
    .then((response) => {
      if (!response.ok) {
        throw new Error("NASA verisi alınamadı");
      }

      return response.json();
    })
    .then((data) => {
      setApod(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setError("NASA verisi yüklenirken bir hata oluştu.");
      setLoading(false);
    });
}, []);
useEffect(() => {
  setMarsLoading(true);
  setMarsError("");

  fetch(
  `https://nasa-space-explorer-ehcz.onrender.com/api/mars?rover=${selectedRover}`
)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Mars verileri alınamadı");
      }

      return response.json();
    })
    .then((data) => {
      setMarsPhotos(data);
      setMarsLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setMarsError(
        "Mars görüntüleri yüklenirken bir hata oluştu."
      );
      setMarsLoading(false);
    });
}, [selectedRover]);
useEffect(() => {
  fetch("https://nasa-space-explorer-ehcz.onrender.com/api/asteroids")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Asteroid verileri alınamadı");
      }

      return response.json();
    })
    .then((data) => {
      setAsteroids(data);
      setAsteroidLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setAsteroidError(
        "Asteroid verileri yüklenirken bir hata oluştu."
      );
      setAsteroidLoading(false);
    });
}, []);
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🚀 NASA SPACE</div>

        <div className="nav-links">
  <a href="#home">Ana Sayfa</a>
  <a href="#apod">Günün Fotoğrafı</a>
  <a href="#mars">Mars</a>
  <a href="#planets">Gezegenler</a>
  <a href="#asteroids">Asteroidler</a>
</div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="subtitle">NASA SPACE EXPLORER</p>

            <h1>
              Evreni
              <br />
              <span>Keşfet.</span>
            </h1>

            <p className="description">
              NASA'nın gerçek verileri ve uzay görüntüleriyle
              evreni keşfetmeye başla.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("apod")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Keşfet →
            </button>
          </div>
        </section>

        <section className="section" id="apod">
          <p className="section-label">NASA / APOD</p>
          <h2>Günün Fotoğrafı</h2>

          <div className="apod-card">
  {loading && <p>NASA verisi yükleniyor...</p>}

  {error && <p>{error}</p>}

  {apod && (
    <>
     <a
  href={apod.hdurl || apod.url}
  target="_blank"
  rel="noreferrer"
>
  <img
    src={apod.hdurl || apod.url}
    alt={apod.title}
    className="apod-image"
  />
</a>

      <div className="apod-content">
        <p className="apod-date">{apod.date}</p>

        <h3>{apod.title}</h3>

        <p>{apod.explanation}</p>

        {apod.copyright && (
          <small>© {apod.copyright}</small>
        )}
      </div>
    </>
  )}
</div>
        </section>

        <section className="section mars-section" id="mars">
          <p className="section-label">NASA / MARS ROVER</p>
          <h2>Mars'ı Keşfet</h2>
          <div className="rover-buttons">
  <button
    className={selectedRover === "Curiosity" ? "active" : ""}
    onClick={() => setSelectedRover("Curiosity")}
  >
    Curiosity
  </button>

  <button
    className={selectedRover === "Perseverance" ? "active" : ""}
    onClick={() => setSelectedRover("Perseverance")}
  >
    Perseverance
  </button>

  <button
    className={selectedRover === "Opportunity" ? "active" : ""}
    onClick={() => setSelectedRover("Opportunity")}
  >
    Opportunity
  </button>
</div>

          <div className="mars-gallery">
  {marsLoading && (
    <p className="loading-text">Mars görüntüleri yükleniyor...</p>
  )}

  {marsError && (
    <p className="loading-text">{marsError}</p>
  )}

  {!marsLoading &&
    !marsError &&
    marsPhotos.map((photo) => (
      <article className="mars-card" key={photo.nasa_id}>
        <img
          src={photo.image_url}
          alt={photo.title}
        />

        <div className="mars-card-content">
          <p className="mars-date">
            {new Date(photo.date_created).toLocaleDateString("tr-TR")}
          </p>

          <h3>{photo.title}</h3>

          <p>
            {photo.description
              ? photo.description.slice(0, 180)
              : "Mars görüntüsü"}
            ...
          </p>
        </div>
      </article>
    ))}
</div>
        </section>
        <section className="section planets-section" id="planets">
  <p className="section-label">SOLAR SYSTEM</p>
  <h2>Gezegenleri Keşfet</h2>

  <p className="planets-intro">
    Güneş Sistemi'ndeki gezegenleri keşfet ve temel özelliklerini öğren.
  </p>

  <div className="planet-grid">
    <article
  className="planet-card"
  onClick={() => setSelectedPlanet("Merkür")}
>
      <div className="planet-visual mercury"></div>
      <div className="planet-content">
        <span>01</span>
        <h3>Merkür</h3>
        <p>Güneş'e en yakın ve Güneş Sistemi'nin en küçük gezegeni.</p>
        <div className="planet-info">
          <div>
            <span>Çap</span>
            <strong>4.879 km</strong>
          </div>
          <div>
            <span>Uydu</span>
            <strong>0</strong>
          </div>
        </div>
      </div>
    </article>
  

    <article
  className="planet-card"
  onClick={() => setSelectedPlanet("Venüs")}
>
      <div className="planet-visual venus"></div>
      <div className="planet-content">
        <span>02</span>
        <h3>Venüs</h3>
        <p>Kalın atmosferi ve yoğun sera etkisiyle Güneş Sistemi'nin en sıcak gezegeni.</p>
        <div className="planet-info">
          <div>
            <span>Çap</span>
            <strong>12.104 km</strong>
          </div>
          <div>
            <span>Uydu</span>
            <strong>0</strong>
          </div>
        </div>
      </div>
    </article>

    <article
  className="planet-card"
  onClick={() => setSelectedPlanet("Dünya")}
>
      <div className="planet-visual earth"></div>
      <div className="planet-content">
        <span>03</span>
        <h3>Dünya</h3>
        <p>Sıvı suyun yüzeyinde bulunduğu ve yaşamın bilindiği tek gezegen.</p>
        <div className="planet-info">
          <div>
            <span>Çap</span>
            <strong>12.742 km</strong>
          </div>
          <div>
            <span>Uydu</span>
            <strong>1</strong>
          </div>
        </div>
      </div>
    </article>

    <article
  className="planet-card"
  onClick={() => setSelectedPlanet("Mars")}
>
      <div className="planet-visual mars"></div>
      <div className="planet-content">
        <span>04</span>
        <h3>Mars</h3>
        <p>Demir oksit nedeniyle kızıl görünen, Dünya'ya en çok benzeyen gezegenlerden biri.</p>
        <div className="planet-info">
          <div>
            <span>Çap</span>
            <strong>6.779 km</strong>
          </div>
          <div>
            <span>Uydu</span>
            <strong>2</strong>
          </div>
        </div>
      </div>
    </article>

   <article
  className="planet-card"
  onClick={() => setSelectedPlanet("Jüpiter")}
>
      <div className="planet-visual jupiter"></div>
      <div className="planet-content">
        <span>05</span>
        <h3>Jüpiter</h3>
        <p>Güneş Sistemi'nin en büyük gezegeni ve dev bir gaz devidir.</p>
        <div className="planet-info">
          <div>
            <span>Çap</span>
            <strong>139.820 km</strong>
          </div>
          <div>
            <span>Uydu</span>
            <strong>95+</strong>
          </div>
        </div>
      </div>
    </article>

    <article
  className="planet-card"
  onClick={() => setSelectedPlanet("Satürn")}
>
      <div className="planet-visual saturn"></div>
      <div className="planet-content">
        <span>06</span>
        <h3>Satürn</h3>
        <p>Muhteşem halka sistemiyle tanınan büyük bir gaz devidir.</p>
        <div className="planet-info">
          <div>
            <span>Çap</span>
            <strong>116.460 km</strong>
          </div>
          <div>
            <span>Uydu</span>
            <strong>140+</strong>
          </div>
        </div>
      </div>
    </article>

   <article
  className="planet-card"
  onClick={() => setSelectedPlanet("Uranüs")}
>
      <div className="planet-visual uranus"></div>
      <div className="planet-content">
        <span>07</span>
        <h3>Uranüs</h3>
        <p>Ekseninin büyük ölçüde yana yatık olmasıyla dikkat çeken buz devidir.</p>
        <div className="planet-info">
          <div>
            <span>Çap</span>
            <strong>50.724 km</strong>
          </div>
          <div>
            <span>Uydu</span>
            <strong>28</strong>
          </div>
        </div>
      </div>
    </article>

    <article
  className="planet-card"
  onClick={() => setSelectedPlanet("Neptün")}
>
      <div className="planet-visual neptune"></div>
      <div className="planet-content">
        <span>08</span>
        <h3>Neptün</h3>
        <p>Güneş Sistemi'nin en uzak gezegeni ve güçlü rüzgarlarıyla bilinen buz devidir.</p>
        <div className="planet-info">
          <div>
            <span>Çap</span>
            <strong>49.244 km</strong>
          </div>
          <div>
            <span>Uydu</span>
            <strong>16</strong>
          </div>
        </div>
      </div>
    </article>
  </div>
  {selectedPlanet && (
  <div className="planet-detail">
    <p className="section-label">PLANET DETAIL</p>

    <h3>{selectedPlanet}</h3>

    <p>{planetDetails[selectedPlanet]?.description}</p>

    <div className="planet-detail-grid">
      <div>
        <span>Çap</span>
        <strong>{planetDetails[selectedPlanet]?.diameter}</strong>
      </div>

      <div>
        <span>Uydu</span>
        <strong>{planetDetails[selectedPlanet]?.moons}</strong>
      </div>
    </div>
  </div>
)}
</section>
        <section className="section asteroid-section" id="asteroids">
  <p className="section-label">NASA / NEO</p>

  <h2>Asteroid Tracker</h2>

  <p className="asteroid-intro">
    Dünya'ya yakın geçen asteroidleri keşfet.
  </p>

  {asteroidLoading && (
    <p className="loading-text">
      Asteroid verileri yükleniyor...
    </p>
  )}

  {asteroidError && (
    <p className="loading-text">
      {asteroidError}
    </p>
  )}

  {!asteroidLoading &&
    !asteroidError &&
    asteroids.length === 0 && (
      <p className="loading-text">
        Seçilen tarih için asteroid bulunamadı.
      </p>
    )}

  <div className="asteroid-grid">
    {asteroids.map((asteroid) => (
      <article
        className={`asteroid-card ${
          asteroid.is_potentially_hazardous
            ? "hazardous"
            : ""
        }`}
        key={asteroid.id}
      >
        <div className="asteroid-header">
          <span className="asteroid-icon">☄️</span>

          {asteroid.is_potentially_hazardous && (
            <span className="hazard-badge">
              Potansiyel Tehlikeli
            </span>
          )}
        </div>

        <h3>{asteroid.name}</h3>

        <div className="asteroid-info">
          <div>
            <span>Çap</span>
            <strong>
              {asteroid.diameter_min_km.toFixed(2)} -{" "}
              {asteroid.diameter_max_km.toFixed(2)} km
            </strong>
          </div>

          <div>
            <span>Dünya'ya mesafe</span>
            <strong>
              {Number(
                asteroid.miss_distance_km
              ).toLocaleString("tr-TR", {
                maximumFractionDigits: 0,
              })}{" "}
              km
            </strong>
          </div>

          <div>
            <span>Hız</span>
            <strong>
              {Number(
                asteroid.relative_velocity_kmh
              ).toLocaleString("tr-TR", {
                maximumFractionDigits: 0,
              })}{" "}
              km/saat
            </strong>
          </div>

          <div>
            <span>Yaklaşma tarihi</span>
            <strong>
              {new Date(
                asteroid.close_approach_date
              ).toLocaleDateString("tr-TR")}
            </strong>
          </div>
        </div>

        <a
          href={asteroid.nasa_jpl_url}
          target="_blank"
          rel="noreferrer"
          className="asteroid-link"
        >
          NASA JPL'de görüntüle →
        </a>
      </article>
    ))}
  </div>
</section>
      </main>

      <footer>
        <p>NASA Space Explorer</p>
        <p>NASA API ile geliştirilmiştir 🚀</p>
      </footer>
    </div>
  );
}

export default App;