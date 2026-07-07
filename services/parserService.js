const cheerio = require("cheerio");

function clean(text = "") {
    return text
        .replace(/\r/g, "")
        .replace(/\t/g, "")
        .replace(/\u00a0/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

function parseSong(html, url) {

    const $ = cheerio.load(html);

    // Page title
    const heading = $("#firstHeading").text().trim();

    // Song title (Amharic + English)
    const title = heading;

    // Artist
    const artist = $("table")
        .first()
        .find("tr")
        .eq(1)
        .find("a")
        .first()
        .text()
        .trim();

    // Album
    const album = $("#contentSub a")
        .last()
        .text()
        .trim();

    // Lyrics
    const lyrics = clean(
        $(".poem")
            .text()
    );

    // Year
    let year = "";

    $("tr").each((i, row) => {

        const first = $(row).find("td").first().text();

        if(first.includes("Year"))
            year = $(row).find("td").last().text().trim();

    });

    // Track
    let track = "";

    $("tr").each((i,row)=>{

        const first = $(row).find("td").first().text();

        if(first.includes("Track"))
            track = $(row).find("td").last().text().trim();

    });

    // Length
    let length = "";

    $("tr").each((i,row)=>{

        const first = $(row).find("td").first().text();

        if(first.includes("Len"))
            length = $(row).find("td").last().text().trim();

    });

    return {

        title,

        artist,

        album,

        year,

        track,

        length,

        lyrics,

        url

    };

}

module.exports = {

    parseSong

};