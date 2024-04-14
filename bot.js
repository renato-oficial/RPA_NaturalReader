import puppeteer from "puppeteer-extra";
import fs from "node:fs/promises"
import path from "path"

import { executablePath } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth"
puppeteer.use(StealthPlugin())
import EventEmitter from 'node:events'
const eventEmitter = new EventEmitter();

const args = process.argv
const extractPhrase = args.slice(2, args.length)
const phrase = extractPhrase.join(" ")


export const Bot = {
    async start(req, res) {
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-sandbox',
                '--disable-web-security',
                '--disable-features=IsolateOrigins',
                '--disable-site-isolation-trials',
                '--disable-features=BlockInsecurePrivateNetworkRequests',
            ],
        })

        try {
            const page = (await browser.pages())[0];

            await page.goto("https://screenrant.com/dc-keanu-reeves-batman-movie-role-art/")
            const header = await page.$('body > main > article > header > h1')
            const content = await page.evaluate((el) => el.textContent, header)
            await header.dispose();

            return res.send(content)

        } catch (e) {
            res.status(500).send(`Something went wrong while running Puppeteer: ${e}`)
        } finally {
            await browser.close()
        }

    }
}