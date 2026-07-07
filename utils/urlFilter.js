const config = require("../config/config");

const BASE = config.baseUrl;

function normalize(url) {

    if (!url)
        return null;

    if (url.startsWith("/"))
        url = BASE + url;

    if (!url.startsWith(BASE))
        return null;

    url = url.split("#")[0];
    url = url.split("?")[0];

    return url;
}

function isWikiPage(url) {

    url = normalize(url);

    if (!url)
        return false;

    return url.startsWith(BASE + "/am/");
}

function isArtist(url) {

    url = normalize(url);

    if (!url)
        return false;

    const path = url.replace(BASE + "/am/", "");

    const parts = path.split("/");

    return parts.length === 1;
}

function isAlbum(url) {

    url = normalize(url);

    if (!url)
        return false;

    const path = url.replace(BASE + "/am/", "");

    const parts = path.split("/");

    return parts.length === 2;
}

function isSong(url) {

    url = normalize(url);

    if (!url)
        return false;

    const path = url.replace(BASE + "/am/", "");

    const parts = path.split("/");

    return parts.length === 3;
}

module.exports = {
    normalize,
    isWikiPage,
    isArtist,
    isAlbum,
    isSong
};