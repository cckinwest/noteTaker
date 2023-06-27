const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

const noteRoute = require("./router/notes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.use("/api/notes", noteRoute);

app.listen(
  PORT,
  console.log(`The server is now listening to http://localhost:${PORT}`)
);
