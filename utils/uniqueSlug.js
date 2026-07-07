const musicDb = require("../database/laravelDb");
const slugify = require("./slugify");


async function uniqueSlug(text){

    let slug = slugify(text);

    let counter = 1;

    while(true){

        const [rows] =
            await musicDb.execute(
                `
                SELECT id
                FROM songs
                WHERE slug=?
                `,
                [slug]
            );


        if(!rows.length)
            return slug;


        slug = `${slug}-${counter}`;

        counter++;

    }

}


module.exports = uniqueSlug;