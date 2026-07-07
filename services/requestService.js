const axios = require("axios");
const sleep = require("../utils/sleep");
const config = require("../config/config");
const log = require("../utils/logger");

const client = axios.create({
    timeout: config.request.timeout,
    maxRedirects: 5,
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache"
    }
});

async function get(url, retries = 3) {

    for (let attempt = 1; attempt <= retries; attempt++) {

        try {

            const response = await client.get(url);

            return response.data;

        } catch (err) {

            console.log(
                `${err.code || err.response?.status} - Retry ${attempt}/${retries}`
            );

            if (attempt === retries)
                throw err;

            await sleep(2000);
        }

    }

}

module.exports = {
    get
};