const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const Screenshot = require("./src/backend/screenshot");
const puppeteer = require("puppeteer");
const psl = require("psl");

const app = express();
const port = 3000;

const staticPath = path.join(__dirname, "./dist");
app.use(express.static(staticPath));
app.use(bodyParser.json());

// start app
app.listen(port, () => {
  console.log("listening");
});

app.post("/v1/screenshot", function(req, res) {
  console.log("Reached");

  // Get the URL from the front end to screenshot
  const urlLocation = req.body.urlLocation;
  console.log(urlLocation);

  getScreenshot(urlLocation);
});

async function getScreenshot(urlLocation) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const hostname = psl.get(extractHostname(urlLocation));
  const date = Date.now();

  const fileName = hostname + date;
  const filePath = `./screenshots/${fileName}.png`;
  console.log(filePath);

  await page.goto(urlLocation);
  await page.screenshot({
    path: filePath
  });

  await browser.close();
}

function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
}
