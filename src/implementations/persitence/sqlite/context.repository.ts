import { getOne, insert, update } from "@infrastructure/sqlite/db-functions";
import { ContextRepository } from "@interfaces/context.repository";
import { getService } from "@services/services";
import { Database } from "sqlite3";

export class SqliteContextRepository implements ContextRepository {
    private db: Database;
    private table = "context";

    constructor() {
        this.db = getService<Database>('sqlite');
        this.createTable();
    }

    createTable() {
        this.db.run(`CREATE TABLE IF NOT EXISTS ${this.table} (
            id text PRIMARY KEY,
            value text
        )`, err => {
            if (!err) {
                console.log("Table: context created");
            }
        });
    }

    async set(key: string, value: string): Promise<void> {
        const founded = await getOne(this.db, this.table, key);
        if (founded) await update(this.db, this.table, ["value"], [key, value]);
        else await insert(this.db, this.table, [key, value]);
    }

    async setFromJson(key: string, value: any): Promise<void> {
        await this.set(key, JSON.stringify(value));
    }

    async get(key: string): Promise<string> {
        const founded = await getOne(this.db, this.table, key);
        return founded?.value || "";
    }

    async getFromJson<T = any>(key: string): Promise<T> {
        const value = await this.get(key);
        return JSON.parse(value || '""');
    }
}
