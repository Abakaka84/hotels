const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const hotels = [
  { id: 1, name: "Hilton New York", country: "USA", city: "New York", stars: 5 },
  { id: 2, name: "Marriott Los Angeles", country: "USA", city: "Los Angeles", stars: 4 },
  { id: 3, name: "Ritz Paris", country: "France", city: "Paris", stars: 5 },
  { id: 4, name: "Ibis Berlin", country: "Germany", city: "Berlin", stars: 3 },
  { id: 5, name: "Sheraton Rome", country: "Italy", city: "Rome", stars: 4 },
  { id: 6, name: "Hilton London", country: "UK", city: "London", stars: 5 }
];

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "Hotels API",
    version: "v1",
    endpoints: ["/api/v1/hotels"]
  });
});

// API الفنادق
app.get("/api/v1/hotels", (req, res) => {
  const { country, city, page = 1, limit = 10 } = req.query;

  let result = hotels;

  if (country) {
    result = result.filter(h =>
      h.country.toLowerCase() === country.toLowerCase()
    );
  }

  if (city) {
    result = result.filter(h =>
      h.city.toLowerCase() === city.toLowerCase()
    );
  }

  const start = (page - 1) * limit;
  const end = start + Number(limit);

  res.json({
    success: true,
    total: result.length,
    page: Number(page),
    limit: Number(limit),
    data: result.slice(start, end)
  });
});

app.listen(PORT, () => {
  console.log(`Hotels API running on port ${PORT}`);
});
