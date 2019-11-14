const puppeteer = require("puppeteer");
const psl = require("psl");

class Screenshot {
  constructor(url) {
    this._url = url;
    this._filePath = "";
  }

  getFilePath() {
    return this._filePath;
  }

  async grabScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const hostname = psl.get(extractHostname(this._url));
    const date = Date.now();

    const fileName = hostname + date;
    this._filePath = `./screenshots/${hostname}/${fileName}.${date}.png`;

    await page.goto(this._url);
    await page.screenshot({
      path: this._filePath
    });

    await browser.close();
  }
}
