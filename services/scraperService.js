const request = require("./requestService");
const parser = require("./parserService");
const songService = require("./songService");
const log = require("../utils/logger");

async function scrapeSong(url) {

    log(`Downloading ${url}`);

    const html = await request.get(url);

    const song = parser.parseSong(html, url);

    await songService.saveSong(song);

    log(`Saved: ${song.title}`);

    return song;
}

module.exports = {
    scrapeSong
};