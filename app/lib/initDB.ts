import { initDb } from "./database";

async function init() {
    try {
        await initDb();
        process.exit(0);
    }
    catch(err) {
        console.error(err);
        process.exit(1);
    }
}

init();