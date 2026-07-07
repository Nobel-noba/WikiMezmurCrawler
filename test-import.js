const importer = require("./services/importService");

(async () => {
    try {
        await importer.importSongs();
    } catch (err) {
        console.error(err);
    }
})();