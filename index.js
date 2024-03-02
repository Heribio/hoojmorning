const puppeteer = require("puppeteer");
const date = require('date-and-time')
require('dotenv').config()

async function goodmorning() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto("https://discord.com")

    const discordToken = process.env.DISCORD_TOKEN
    const bypassLocalStorageOverride = (page) => page.evaluateOnNewDocument(() => {

        let __ls = localStorage

        Object.defineProperty(window, 'localStorage', { writable: false, configurable: false, value: __ls })

    })

    console.log("Redirecting to https://discord.com/app ... (May take a few seconds)")

    bypassLocalStorageOverride(page)

    await page.goto('https://discord.com/app');

    await page.evaluate((token) => {
        localStorage.setItem('token', `"${token}"`);
    }, discordToken);

    await page.goto("https://discord.com/channels/915336728707989534/1031557306460164138")
    await page.waitForSelector('form[class="form__13a2c"]')
    await page.type('div[class="textArea__74543 textAreaSlate_e0e383 slateContainer_b692b3"]', "/hooj good_morning")
    await page.keyboard.press("Enter")
    await page.keyboard.press("Enter")

}
function getTime() {
    const now = new Date();
    const pattern = date.compile('HH')

    return date.format(now, pattern)
}

function checkTime() {
    console.log("check")
    let hour = getTime()
    if (hour == 19) {
        goodmorning()
    } else {
        return
    }
}

setInterval(function() {checkTime()}, 1000 * 60 * 60 * 4)

