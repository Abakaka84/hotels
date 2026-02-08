const express = require("express");
const app = express();

app.get("/cities", (req, res) => {
  res.json({
    status: "success",
    cities: [
      { name: "New York", country: "USA" },
      { name: "London", country: "UK" },
      { name: "Paris", country: "France" },
      { name: "Tokyo", country: "Japan" }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running");
});
