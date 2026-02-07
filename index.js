const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// بيانات تجريبية
const hotels = [
  { id: 1, name: "Grand Hotel", city: "Paris", stars: 5 },
  { id: 2, name: "Blue Sky Inn", city: "New York", stars: 4 },
  { id: 3, name: "Sunrise Hotel", city: "London", stars: 3 }
];

// ✅ صفحة رئيسية بدون حماية (لازم تفتح في المتصفح)
app.get("/", (req, res) => {
  res.send("Hotels API is running");
});

// 🔐 حماية (بعد الصفحة الرئيسية فقط)
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key) {
    return res.status(401).json({ error: "API key missing" });
  }

  if (key !== API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
});

// ✅ كل الفنادق
app.get("/hotels", (req, res) => {
  res.json(hotels);
});

// ✅ حسب المدينة
app.get("/hotels/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  const result = hotels.filter(
    h => h.city.toLowerCase() === city
  );
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
