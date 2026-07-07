const request = require("./services/requestService");
const parser = require("./services/parserService");

(async () => {

    const html = await request.get(
        "https://wikimezmur.org/am/Hana_Tekle/Meswaet/Bemaleda"
    );

    const song = parser.parseSong(
        html,
        "https://wikimezmur.org/am/Hana_Tekle/Meswaet/Bemaleda"
    );

    console.log(song);

})();