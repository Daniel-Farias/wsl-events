const puppeteer = require('puppeteer-core');
const os = require('os');
const getEvents = require('./getEvents');
const platform = os.platform();
const executablePaths = {
  'linux': '/usr/bin/google-chrome',
  'darwin': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'win32': 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
};

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePaths[platform]
  });

  const page = await browser.newPage();

  const year = 2021; // year you want to get the information.
  const month = ''; // month you want to get the information.

  const url = `https://www.worldsurfleague.com/events?${month !== '' ? 'all=1' : 'month=' + month}&year=${year}`;
  console.log(await getEvents(page, url)); // retuns in JSON.

  process.exit();
})();