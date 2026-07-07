const readline = require("readline-sync");
const actions = require("./actions");

async function startMenu() {

    while (true) {

        console.clear();

        console.log("========================================");
        console.log("      WikiMezmur Scraper v1.0");
        console.log("========================================");
        console.log("");

        console.log("1. Scrape Single Song");
        console.log("2. Discover Artists");
        console.log("3. Start Crawl");
        console.log("4. Resume Failed Jobs");
        console.log("5. Statistics");
        console.log("6. Clear Queue");
        console.log("7. Clear Songs");
        console.log("8. Exit");
        console.log("9. Import to Laravel Music App");
        

        console.log("");

        const choice = readline.question("Choose an option: ");

        switch(choice){

            case "1":
                await actions.singleSong();
                break;

            case "2":
                await actions.discover();
                break;

            case "3":
                await actions.crawl();
                break;

            case "4":
                await actions.resume();
                break;

            case "5":
                await actions.stats();
                break;

            case "6":
                await actions.clearQueue();
                break;

            case "7":
                await actions.clearSongs();
                break;

            case "8":
                process.exit();
            case "9":
                await actions.importToLaravel();
                break;
            default:
                console.log("Invalid option.");
        }

        readline.question("\nPress ENTER to continue...");
    }

}

module.exports = startMenu;