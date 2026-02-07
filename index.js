const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// بيانات تجريبية
const hotels = [
  { id: 1, name: "Grand Hotel", city: "Paris", stars: 5 },
  { id: 2, name: "Blue Sky Inn", city: "New York", stars: 4 },
  { id: 3, name: "Sunrise Hotel", city: "London", stars: 3 }
];

// صفحة رئيسية
app.get("/", (req, res) => {
  res.send("Hotels API is running");
});

// كل الفنادق
app.get("/hotels", (req, res) => {
  res.json(hotels);
});

// حسب المدينة
app.get("/hotels/:city", (req, res) => {
  const city = req.params.city.toLowerCase();
  res.json(hotels.filter(h => h.city.toLowerCase() === city));
});

app.listen(PORT, () => {
  console.log("API running");
});
app.get("/hotels/filter", (req, res) => {
  let result = hotels;

  if (req.query.city) {
    result = result.filter(h =>
      h.city.toLowerCase() === req.query.city.toLowerCase()
    );
  }

  if (req.query.stars) {
    result = result.filter(h =>
      h.stars == req.query.stars
    );
  }

  res.json(result);
});
