const db = require("../database/db");

async function saveSong(song) {

    const sql = `
        INSERT INTO songs
        (
            title,
            artist,
            album,
            url,
            lyrics
        )
        VALUES (?, ?, ?, ?, ?)

        ON DUPLICATE KEY UPDATE

            title = VALUES(title),
            artist = VALUES(artist),
            album = VALUES(album),
            lyrics = VALUES(lyrics)
    `;

    await db.execute(sql, [
        song.title,
        song.artist,
        song.album,
        song.url,
        song.lyrics
    ]);

}

module.exports = {
    saveSong
};