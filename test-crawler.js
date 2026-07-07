const crawler = require("./services/crawlerService");

(async () => {

    const artists = await crawler.getArtists();

    console.log(artists);

})();