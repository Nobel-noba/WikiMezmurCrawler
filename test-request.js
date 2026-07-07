const request = require("./services/requestService");

(async () => {

    try {

        const html = await request.get(
            "https://wikimezmur.org/am/Hana_Tekle/Meswaet/Bemaleda"
        );

        console.log(html.substring(0,500));

    } catch(err) {

        console.error(err.message);

    }

})();