import { getMultiple, insert } from "@infrastructure/sqlite/db-functions";
import { FileRepository } from "@interfaces/file.repository";
import { File } from "@models/file";
import { getService } from "@services/services";
import { Database } from "sqlite3";

export class SqliteFileRepository implements FileRepository {
    private db: Database;
    private table = "files";

    constructor() {
        this.db = getService<Database>('sqlite');
        this.createTable();
    }

    createTable() {
        this.db.run(`CREATE TABLE IF NOT EXISTS ${this.table} (
            id text PRIMARY KEY,
            field text,
            name text
        )`, err => {
            if (!err) {
                this.db.run(`CREATE INDEX field_idx ON ${this.table} (field)`, errIndex => {
                    if  (!errIndex) {
                        console.log("Table: files created");
                    }
                })
            }
        });
    }

    async create(file: File) {
        await insert(this.db, this.table, this.toRow(file));
        return file;
    }

    async getByField(field: string) {
        const rows = await getMultiple(this.db, `SELECT * from ${this.table} WHERE field = ?`, [field]);

        return rows.map(this.parseRow);
    }

    private parseRow(row: any): File {
        return {
            id: row.id,
            field: row.field,
            name: row.name,
        };
    }

    private toRow(file: File): any[] {
        return [
            file.id,
            file.field,
            file.name
        ];
    }
}
