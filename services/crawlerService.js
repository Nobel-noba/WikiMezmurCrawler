const cheerio = require("cheerio");

const request = require("./requestService");
const scraper = require("./scraperService");
const sleep = require("../utils/sleep");
const config = require("../config/config");
const log = require("../utils/logger");

const BASE = config.baseUrl;

async function getArtists() {

    log("Loading Gospel Singers page...");

    const html = await request.get(
        BASE + "/am/Gospel_Singers"
    );

    const $ = cheerio.load(html);

    const artists = [];

    $(".mw-parser-output a").each((i, el) => {

        const href = $(el).attr("href");

        if (!href)
            return;

        if (!href.startsWith("/am/"))
            return;

        const parts = href.split("/");

        if (parts.length !== 3)
            return;

        artists.push(BASE + href);

    });

    return [...new Set(artists)];

}

async function getAlbums(artistUrl) {

    log("Artist: " + artistUrl);

    const html = await request.get(artistUrl);

    const $ = cheerio.load(html);

    const albums = [];

    $(".mw-parser-output a").each((i, el) => {

        const href = $(el).attr("href");

        if (!href)
            return;

        if (!href.startsWith("/am/"))
            return;

        const parts = href.split("/");

        if (parts.length !== 4)
            return;

        albums.push(BASE + href);

    });

    return [...new Set(albums)];

}

async function getSongs(albumUrl) {

    log("Album: " + albumUrl);

    const html = await request.get(albumUrl);

    const $ = cheerio.load(html);

    const songs = [];

    $(".mw-parser-output a").each((i, el) => {

        const href = $(el).attr("href");

        if (!href)
            return;

        if (!href.startsWith("/am/"))
            return;

        const parts = href.split("/");

        if (parts.length !== 5)
            return;

        songs.push(BASE + href);

    });

    return [...new Set(songs)];

}

async function crawlAll() {

    const artists = await getArtists();

    log(`Found ${artists.length} artists`);

    for (const artist of artists) {

        await sleep(config.request.delay);

        const albums = await getAlbums(artist);

        log(`Albums: ${albums.length}`);

        for (const album of albums) {

            await sleep(config.request.delay);

            const songs = await getSongs(album);

            log(`Songs: ${songs.length}`);

            for (const song of songs) {

                await sleep(config.request.delay);

                try {

                    await scraper.scrapeSong(song);

                } catch (err) {

                    log(err.message);

                }

            }

        }

    }

}

module.exports = {

    crawlAll

};