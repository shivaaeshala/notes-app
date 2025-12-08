import "dotenv/config";
import postgres from "postgres";
import { enableExtensions, users, sessions, accounts, verification, notes } from "./schema";

function getPostgreURL() {
    const url = process.env.POSTGRES_URL;
    if (!url) {
        throw new Error("POSTGRES_URL not defined");
    }
    return url;
}

export const sql = postgres(getPostgreURL(), {ssl: 'require'});

export async function initDb() {
    try {
        await sql.unsafe(enableExtensions);

        await sql.unsafe(users);
        await sql.unsafe(sessions);
        await sql.unsafe(accounts);
        await sql.unsafe(verification);
        await sql.unsafe(notes);

        console.log("Database initialised");
    }
    catch(error) {
        console.error("DB initialisation error", error);
        throw error;
    }
}