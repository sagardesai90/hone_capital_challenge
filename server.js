require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
