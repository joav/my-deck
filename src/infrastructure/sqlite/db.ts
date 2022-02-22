import path from "path";
import { Database } from "sqlite3";

const dbPath = process.env.DB_PATH || path.resolve(__dirname + "/my-deck.db")

export const db = new Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the my-deck database.');
});
