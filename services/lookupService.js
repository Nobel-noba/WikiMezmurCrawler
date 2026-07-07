const musicDb = require("../database/laravelDb");
const slugify = require("../utils/slugify");


async function getGenreId(name = "Unknown") {

    const [rows] = await musicDb.execute(
        `
        SELECT id 
        FROM genres
        WHERE name=?
        LIMIT 1
        `,
        [name]
    );


    if(rows.length)
        return rows[0].id;


    const [result] = await musicDb.execute(
        `
        INSERT INTO genres
        (
            name,
            slug
        )
        VALUES (?,?)
        `,
        [
            name,
            slugify(name)
        ]
    );


    return result.insertId;
}



async function getLanguageId(
    name="Amharic"
) {

    const [rows] = await musicDb.execute(
        `
        SELECT id
        FROM languages
        WHERE name=?
        LIMIT 1
        `,
        [name]
    );


    if(rows.length)
        return rows[0].id;


    const [result] = await musicDb.execute(
        `
        INSERT INTO languages
        (
            name,
            code
        )
        VALUES (?,?)
        `,
        [
            name,
            slugify(name)
        ]
    );


    return result.insertId;
}



async function getStyleId(
    name="Unknown"
){

    const [rows] = await musicDb.execute(
        `
        SELECT id
        FROM styles
        WHERE name=?
        LIMIT 1
        `,
        [name]
    );


    if(rows.length)
        return rows[0].id;



    const [result] = await musicDb.execute(
        `
        INSERT INTO styles
        (
            name,
            description
        )
        VALUES (?,?)
        `,
        [
            name,
            null
        ]
    );


    return result.insertId;

}



module.exports = {

    getGenreId,

    getLanguageId,

    getStyleId

};