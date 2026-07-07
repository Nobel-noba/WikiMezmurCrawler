const readline = require("readline-sync");

const scraper = require("../services/scraperService");
const discovery = require("../services/discoveryService");
const crawler = require("../services/crawlerEngine");
const stats = require("../services/statService");
const queue = require("../services/queueService");
const db = require("../database/db");

async function singleSong(){

    const url = readline.question("\nSong URL: ");

    await scraper.scrapeSong(url);

}

async function discover(){

    await discovery.discoverArtists();

}

async function crawl(){

    await crawler.startCrawler();

}

async function resume(){

    await queue.retryFailed();

    console.log("Failed jobs moved back to pending.");

}

async function stats(){

    const data = await stats.getStats();

    stats.printStats(data);

}

async function clearQueue(){

    const answer = readline.question(
        "Delete all queue records? (y/n): "
    );

    if(answer.toLowerCase() !== "y")
        return;

    await db.query("TRUNCATE crawl_queue");

    console.log("Queue cleared.");

}

async function clearSongs(){

    const answer = readline.question(
        "Delete all songs? (y/n): "
    );

    if(answer.toLowerCase() !== "y")
        return;

    await db.query("TRUNCATE songs");

    console.log("Songs deleted.");

}

module.exports = {

    singleSong,
    discover,
    crawl,
    resume,
    stats,
    clearQueue,
    clearSongs

};