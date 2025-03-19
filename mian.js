const express = require("express");

const app = express();

app.get("/health-check", (req, res) => {
  res.status(200).send("I am alive");
});

app.get("/hello", (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
