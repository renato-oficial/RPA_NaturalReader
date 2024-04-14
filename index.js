import express from "express"
import { Bot } from "./bot.js";
const app = express()

const PORT = process.env.PORT || 4000;

app.get("/prompt", async (req, res) => {
    const { q } = req.query
    Bot.start(req, res)
})

app.get("/", (req, res) => {
    res.send("Render Puppeteer server is up and running!")
})
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})