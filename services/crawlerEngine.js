const queue = require("./queueService");
const request = require("./requestService");
const cheerio = require("cheerio");

const scraper = require("./scraperService");
const sleep = require("../utils/sleep");

const filter = require("../utils/urlFilter");
const config = require("../config/config");

const log = require("../utils/logger");


async function extractLinks(url, type) {

    const html = await request.get(url);

    const $ = cheerio.load(html);

    const links = new Set();


    $(".mw-parser-output a").each((i, el)=>{

        let href = $(el).attr("href");

        href = filter.normalize(href);


        if(!href)
            return;


        if(type === "artist" && filter.isAlbum(href)) {

            links.add(href);

        }


        if(type === "album" && filter.isSong(href)) {

            links.add(href);

        }

    });


    return [...links];

}



async function processArtist(job){

    log(`Processing artist ${job.url}`);


    const albums =
        await extractLinks(job.url,"artist");


    for(const album of albums){

        await queue.enqueue(
            album,
            "album"
        );

    }


    log(
        `Added ${albums.length} albums`
    );

}



async function processAlbum(job){

    log(`Processing album ${job.url}`);


    const songs =
        await extractLinks(job.url,"album");


    for(const song of songs){

        await queue.enqueue(
            song,
            "song"
        );

    }


    log(
        `Added ${songs.length} songs`
    );

}



async function processSong(job){

    log(`Scraping song ${job.url}`);


    await scraper.scrapeSong(
        job.url
    );

}



async function startCrawler(){

    log("Crawler started");


    while(true){


        const job =
            await queue.nextJob();


        if(!job){

            log(
                "Queue empty. Finished."
            );

            break;

        }


        try {


            await queue.markProcessing(
                job.id
            );


            if(job.type==="artist"){

                await processArtist(job);

            }


            if(job.type==="album"){

                await processAlbum(job);

            }


            if(job.type==="song"){

                await processSong(job);

            }



            await queue.markDone(
                job.id
            );


        }
        catch(error){


            log(
                error.message
            );


            await queue.markFailed(
                job.id,
                error.message
            );


        }



        await sleep(
            config.request.delay
        );


    }

}


module.exports={

    startCrawler

};