const db = require("../database/db");

async function enqueue(url, type) {

    await db.execute(
        `
        INSERT IGNORE INTO crawl_queue(url,type)
        VALUES(?,?)
        `,
        [url, type]
    );

}

async function nextJob() {

    const [rows] = await db.query(
        `
        SELECT *

        FROM crawl_queue

        WHERE status='pending'

        ORDER BY id

        LIMIT 1
        `
    );

    if (!rows.length)
        return null;

    return rows[0];

}

async function markProcessing(id){

    await db.execute(

        `
        UPDATE crawl_queue

        SET status='processing',
            attempts=attempts+1

        WHERE id=?
        `,

        [id]

    );

}

async function markDone(id){

    await db.execute(

        `
        UPDATE crawl_queue

        SET status='done'

        WHERE id=?
        `,

        [id]

    );

}

async function markFailed(id,error){

    await db.execute(

        `
        UPDATE crawl_queue

        SET

        status='failed',

        error=?

        WHERE id=?

        `,

        [error,id]

    );

}

async function retryFailed(){

    await db.execute(`

        UPDATE crawl_queue

        SET status='pending'

        WHERE status='failed'

        AND attempts < 3

    `);

}



module.exports={

    enqueue,

    nextJob,

    markProcessing,

    markDone,

    markFailed,

    retryFailed

};
