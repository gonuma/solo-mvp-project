const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/users", async (req, res) => {
  try {
    const users = await db.select().table("users");
    res.json(users);
  } catch (err) {
    console.error("Error loading users!", err);
    res.sendStatus(500);
  }
});

app.get("/songs", async (req, res) => {
  try {
    const songs = await db.select().table("songs");
    res.json(songs);
  } catch (err) {
    console.error("Error fetching songs", err);
    res.sendStatus(500);
  }
});

app.post("/song/:band/:song", async (req, res) => {
  try {
    await db("songs").insert({
      band_name: req.params.band,
      song_name: req.params.song,
    });
    // await console.log(req.params);
    res.send("Nice choice!");
  } catch (err) {
    console.error("Error adding song", err);
    res.sendStatus(500);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

module.exports = app;
