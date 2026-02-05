const express = require("express");
const app = express();

app.use(express.json());

// بيانات فنادق (أمريكا + أوروبا)
const hotels = [
  {
    id: 1,
    name: "Hilton New York",
    city: "New York",
    country: "USA",
    price_per_night: 180
  },
  {
    id: 2,
    name: "Marriott Los Angeles",
    city: "Los Angeles",
    country: "USA",
    price_per_night: 200
  },
  {
    id: 3,
    name: "Hotel Paris Centre",
    city: "Paris",
    country: "France",
    price_per_night: 220
  },
  {
    id: 4,
    name: "Berlin Grand Hotel",
    city: "Berlin",
    country: "Germany",
    price_per_night: 150
  },
  {
    id: 5,
    name: "Rome Luxury Stay",
    city: "Rome",
    country: "Italy",
    price_per_night: 170
  }
];

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("Hotels API is running 🚀");
});

// كل الفنادق
app.get("/hotels", (req, res) => {
  res.json(hotels);
});

// فلترة حسب الدولة
app.get("/hotels/country/:country", (req, res) => {
  const country = req.params.country.toLowerCase();
  const result = hotels.filter(
    h => h.country.toLowerCase() === country
  );
  res.json(result);
});

// فلترة حسب المدينة
app.get("/hotels/city/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  const result = hotels.filter(
    h => h.city.toLowerCase() === city
  );
  res.json(result);
});

// تشغيل السيرفر (مهم لـ Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
