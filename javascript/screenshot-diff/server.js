const express = require("express");

const app = express();
const screenshot = require("./src/backend/screenshot");

app.set("view engine", "pug");

app.get("/", (req, res) => {
  app.post("/v1/screenshot", function(req, res) {
    console.log("Reached");
    console.log(req.body);
  });
});

app.listen(process.env.PORT || 3000);
