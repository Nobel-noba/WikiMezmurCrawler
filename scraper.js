const { scrapeSong } = require("./services/scraperService");

const mode = process.argv[2];
const value = process.argv[3];

(async () => {

    try {

        switch (mode) {

            case "single":

                if (!value) {
                    console.log("Usage:");
                    console.log("node scraper.js single <url>");
                    return;
                }

                await scrapeSong(value);

                break;

            case "all":

                const crawler =
                    require("./services/crawlerService");
            
                await crawler.crawlAll();
            
                break;
            case "discover":

                const discovery=require(
            
                    "./services/discoveryService"
            
                );
            
                await discovery.discoverArtists();
            
                break;
            case "crawl":

                const crawlerr =
                    require("./services/crawlerEngine");
            
            
                await crawlerr.startCrawler();
            
                break;
            case "status":

                const stats =
                    require("./services/statService");
            
            
                const data =
                    await stats.getStats();
            
            
                stats.printStats(data);
            
            
                break;
            case "resume":

                const queue =
                    require("./services/queueService");
            
            
                await queue.retryFailed();
            
            
                console.log(
                    "Failed jobs returned to queue"
                );
            
            
                break;

            default:

                console.log("Commands:");
                console.log("------------------------------");
                console.log("node scraper.js single <url>");
                console.log("node scraper.js all");
        }

    } catch (err) {

        console.error(err);

    }

})();