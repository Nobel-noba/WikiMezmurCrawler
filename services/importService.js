const scraperDb = require("../database/db");
const musicDb = require("../database/laravelDb");
const lookup = require("./lookupService");
const uniqueSlug = require("../utils/uniqueSlug");

async function songExists(url){

    const [rows] = await musicDb.execute(

        `
        SELECT id

        FROM songs

        WHERE scraped_from=?

        LIMIT 1
        `,

        [url]

    );

    return rows.length ? rows[0].id : null;

}

// async function getLookupId(table,name){

//     if(!name)
//         return null;

//     const [rows] = await musicDb.execute(

//         `SELECT id FROM ${table} WHERE name=? LIMIT 1`,

//         [name]

//     );

//     if(rows.length)
//         return rows[0].id;

//     const [result] = await musicDb.execute(
//         `INSERT INTO ${table}(name, slug) VALUES(?, ?)`,
//         [
//             name,
//             slugify(name)
//         ]
//     );

//     return result.insertId;

// }

// async function insertSong(song){

//     const genreId =
//     await lookup.getGenreId("Unknown");


//     const languageId =
//         await lookup.getLanguageId("Amharic");


//     const styleId =
//         await lookup.getStyleId("Unknown");

//     const [result] = await musicDb.execute(

// `
// INSERT INTO songs(

// title,

// artist,

// album,

// slug,

// genre_id,

// language_id,

// style_id,

// scraped_from

// )

// VALUES(?,?,?,?,?,?,?,?)

// `,

// [
//     song.title,

//     song.artist,

//     song.album,

//     slugify(song.title),

//     genreId,

//     languageId,

//     styleId,

//     song.url
// ]

//     );

//     return result.insertId;

// }


async function insertSong(song){

        const genreId =
            await lookup.getGenreId("Unknown");


        const languageId =
            await lookup.getLanguageId("Amharic");


        const styleId =
            await lookup.getStyleId("Unknown");


        const slug =
            await uniqueSlug(
                `${song.title}-${song.artist}`
            );


        const [result] = await musicDb.execute(

    `
    INSERT INTO songs
    (
        title,
        artist,
        slug,
        album,
        genre_id,
        language_id,
        style_id,
        status,
        scraped_from,
        created_by,
        created_at,
        updated_at

    )

    VALUES
    (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        NOW(),
        NOW()
    )

    `,

    [
        song.title,

        song.artist,

        slug,

        song.album || null,

        genreId,

        languageId,

        styleId,

        "published",

        song.url,

        1 // admin user id

    ]

    );


    return result.insertId;


}

async function insertLyrics(songId,lyrics){

    await musicDb.execute(

`
INSERT INTO lyrics(

song_id,

content,

version_label,

is_default

)

VALUES(?,?,?,?)

`,

[
    songId,

    lyrics,

    "Original",

    1
]

    );

}


async function importSongs(){

    const [songs] =
        await scraperDb.query(
            "SELECT * FROM songs"
        );

    let imported = 0;
    let skipped = 0;

    for(const song of songs){

        const exists =
            await songExists(song.url);

        if(exists){

            skipped++;

            continue;

        }

        const id =
            await insertSong(song);

        await insertLyrics(
            id,
            song.lyrics
        );

        imported++;

        console.log(
            `${imported}. ${song.title}`
        );

    }

    console.log("");

    console.log("Import Finished");

    console.log(
        `Imported : ${imported}`
    );

    console.log(
        `Skipped  : ${skipped}`
    );

}

// async function importSongs(){

//     const [songs] = await scraperDb.query(

//         `
//         SELECT *

//         FROM songs

//         ORDER BY id
//         `
//     );

//     console.log(`Found ${songs.length} songs`);

// }

module.exports = {

    importSongs

};