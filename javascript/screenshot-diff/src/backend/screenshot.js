const puppeteer = require("puppeteer");
const psl = require("psl");

class Screenshot {
  constructor(url) {
    this._url = url;
  }

  async grabScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const hostname = psl.get(extractHostname(this._url));
    const date = Date.now();

    const fileName = hostname + date;

    await page.goto(this._url);
    await page.screenshot({
      path: `./screenshots/${hostname}/${fileName}.png`
    });

    await browser.close();
  }
}
