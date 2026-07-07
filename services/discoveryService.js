const cheerio=require("cheerio");

const request=require("./requestService");

const queue=require("./queueService");

const filter=require("../utils/urlFilter");

const config=require("../config/config");

async function discoverArtists(){

    const html=await request.get(

        config.baseUrl+"/am/Gospel_Singers"

    );

    const $=cheerio.load(html);

    let count=0;

    $(".mw-parser-output a").each(async(i,a)=>{

        const href=filter.normalize(

            $(a).attr("href")

        );

        if(!filter.isArtist(href))
            return;

        await queue.enqueue(href,"artist");

        count++;

    });

    console.log("Artists:",count);

}

module.exports={

    discoverArtists

};