const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// بيانات تجريبية (يمكنك توسيعها لاحقًا)
const hotels = [
  { id: 1, name: "Hilton New York", country: "USA", city: "New York" },
  { id: 2, name: "Marriott Paris", country: "France", city: "Paris" },
  { id: 3, name: "Ritz London", country: "UK", city: "London" },
  { id: 4, name: "Sheraton Berlin", country: "Germany", city: "Berlin" }
];

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Hotels API is running",
    endpoints: ["/hotels", "/hotels?country=USA&city=New York"]
  });
});

// API الفنادق مع فلترة
app.get("/hotels", (req, res) => {
  const { country, city } = req.query;

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

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
