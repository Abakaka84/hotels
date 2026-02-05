import express from "express";
import fs from "fs";

const app = express();

// 🔐 مفتاح الحماية
const API_KEY = process.env.API_KEY;

app.use((req, res, next) => {
  const userKey = req.headers["x-api-key"];

  if (!userKey || userKey !== API_KEY) {
    return res.status(401).json({
      error: "Unauthorized - Invalid API Key"
    });
  }
  next();
});
const express = require('express');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

// 🔐 API KEY من Render
const API_KEY = process.env.API_KEY;

// 🔐 حماية
app.use((req, res, next) => {
    const key = req.headers['x-api-key'];

    if (!key) {
        return res.status(401).json({ error: "API key missing" });
    }

    if (key !== API_KEY) {
        return res.status(403).json({ error: "Invalid API key" });
    }

    next();
});

// بيانات تجريبية (Render سيعمل بدون Python)
const hotels = [
  { id: 1, name: "Grand Hotel", city: "Paris", stars: 5 },
  { id: 2, name: "Blue Sky Inn", city: "New York", stars: 4 },
  { id: 3, name: "Sunrise Hotel", city: "London", stars: 3 }
];

// كل الفنادق
app.get('/hotels', (req, res) => {
    res.json(hotels);
});

// حسب المدينة
app.get('/hotels/:city', (req, res) => {
    const city = req.params.city.toLowerCase();
    const result = hotels.filter(h =>
        h.city.toLowerCase() === city
    );
    res.json(result);
});

app.listen(PORT, () => {
    console.log("API running");
});
