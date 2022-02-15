import path from "path";
import { Database } from "sqlite3";
export const db = new Database(path.resolve(__dirname + "/my-deck.db"), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the my-deck database.');
});
