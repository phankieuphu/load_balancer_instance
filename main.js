const express = require("express");
const os = require("os");
const axios = require("axios"); // To get public IP

const app = express();

// Get the instance's private hostname (inside EC2)
const privateHostname = os.hostname();

// Get the public IP dynamically
let publicIP = "Fetching...";
axios.get("http://checkip.amazonaws.com")
  .then(response => { publicIP = response.data.trim(); })
  .catch(error => { console.error("Error fetching public IP:", error); });

app.get("/health-check", (req, res) => {
  res.status(200).json({
    message: "I am alive",
    privateHostname: privateHostname,
    publicIP: publicIP,
  });
});

app.get("/hello", (req, res) => {
  res.status(200).json({
    message: "Hello World",
    privateHostname: privateHostname,
    publicIP: publicIP,
  });
});

// Bind to all interfaces for public access
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
