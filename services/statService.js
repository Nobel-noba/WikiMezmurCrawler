const db = require("../database/db");


async function getStats(){

    const [rows] = await db.query(`

        SELECT

        type,

        status,

        COUNT(*) AS total

        FROM crawl_queue

        GROUP BY type,status

    `);


    const stats = {

        artist:{
            pending:0,
            processing:0,
            done:0,
            failed:0
        },

        album:{
            pending:0,
            processing:0,
            done:0,
            failed:0
        },

        song:{
            pending:0,
            processing:0,
            done:0,
            failed:0
        }

    };


    rows.forEach(row=>{

        stats[row.type][row.status] =
            Number(row.total);

    });


    return stats;

}



function printStats(stats){


    console.log(`

==============================
 WikiMezmur Crawler Status
==============================

ARTISTS

 Pending:    ${stats.artist.pending}
 Processing: ${stats.artist.processing}
 Done:       ${stats.artist.done}
 Failed:     ${stats.artist.failed}


ALBUMS

 Pending:    ${stats.album.pending}
 Processing: ${stats.album.processing}
 Done:       ${stats.album.done}
 Failed:     ${stats.album.failed}


SONGS

 Pending:    ${stats.song.pending}
 Processing: ${stats.song.processing}
 Done:       ${stats.song.done}
 Failed:     ${stats.song.failed}


==============================

`);

}


module.exports={

    getStats,

    printStats

};