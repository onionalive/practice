const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
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

// Get screenshot
app.post("/v1/screenshot", function(req, res) {
  console.log("Reached - take screenshot");

  // Get the URL from the front end to screenshot
  const urlLocation = req.body.urlLocation;
  console.log(urlLocation);

  // Get the device size from the front end
  let size = req.body.size;
  size = size.toLowerCase();
  console.log(size);

  getScreenshot(urlLocation, size);
});

// Get list of existing screenshots
app.get("/v1/get-files", async function(req, res) {
  console.log("Reached - get files");
  const data = await getFilesNames();
  console.log(data);
  res.status(200).send(data);
});

//////////////////////////
// Functions
//////////////////////////

async function getScreenshot(urlLocation, size) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const hostname = psl.get(extractHostname(urlLocation));
  const date = Date.now();

  const height = deviceSizes[size].height;
  const width = deviceSizes[size].width;
  const isMobile = deviceSizes[size].isMobile;

  const fileName = `${hostname}.${size}.${date}`;
  const filePath = `./screenshots/${fileName}.png`;
  console.log(`${fileName}.png`);

  await page.setViewport({
    width: width,
    height: height,
    deviceScaleFactor: 1,
    isMobile: isMobile
  });
  await page.goto(urlLocation);
  await page.screenshot({
    path: filePath
  });

  await browser.close();
}

function getFilesNames() {
  return new Promise(function(resolve, reject) {
    let listOfFiles = [];

    const directoryPath = path.join(__dirname, "screenshots");
    fs.readdir(directoryPath, async (err, files) => {
      if (err) {
        reject(new Error("Unable to scan directory:"));
      }

      files.forEach(function(file) {
        listOfFiles.push(file);
      });

      resolve(listOfFiles);
    });
  });
}

function extractHostname(url) {
  var hostname;

  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  hostname = hostname.split(":")[0];
  hostname = hostname.split("?")[0];

  return hostname;
}

//////////////////////////
// Data
//////////////////////////

const deviceSizes = {
  desktop: {
    height: 768,
    width: 1024,
    isMobile: false
  },
  laptop: {
    height: 812,
    width: 375,
    isMobile: false
  },
  ipad: {
    height: 1024,
    width: 768,
    isMobile: true
  },
  iphonex: {
    height: 812,
    width: 375,
    isMobile: true
  },
  iphone6: {
    height: 667,
    width: 375,
    isMobile: true
  }
};
