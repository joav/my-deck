import { deleteOne, getMultiple, getOne, insert, update } from "@infrastructure/sqlite/db-functions";
import { ButtonRepository } from "@interfaces/button.repository";
import { Button } from "@models/button";
import { ButtonNotFoundError } from "@models/errors/button-not-found.error";
import { getService } from "@services/services";
import { Database } from "sqlite3";

export class SqliteButtonRepository implements ButtonRepository {
    private db: Database;
    private table = "buttons";

    constructor() {
        this.db = getService<Database>('sqlite');
        this.createTable();
    }

    createTable() {
        this.db.run(`CREATE TABLE IF NOT EXISTS ${this.table} (
            id text PRIMARY KEY,
            name text,
            icon text,
            color text,
            steps text
        )`, err => {
            if (!err) {
                console.log("Table: buttons created");
            }
        });
    }

    async getAll() {
        const rows = await getMultiple(this.db, "SELECT * from " + this.table);

        return rows.map(this.parseRow);
    }
    
    async save(button: Button) {
        const founded = await this.get(button?.id || "");
        if (founded) {
            await this.updateButton(button, founded);
        } else {
            await this.createButton(button);
        }

        return button;
    }

    async updateButton(buttonIn: Button, button?: Button) {
        if (!buttonIn.id) throw new ButtonNotFoundError();
        if (!button) button = await this.get(buttonIn.id);

        if (!button) throw new ButtonNotFoundError();

        await this.persistButton(button);

        return button;
    }

    async get(buttonId: string) {
        const row = await getOne(this.db, this.table, buttonId);
        return row?this.parseRow(row):undefined;
    }

    async delete(buttonId: string): Promise<void> {
        const founded = await this.get(buttonId);
        if (!founded) throw new ButtonNotFoundError();

        await deleteOne(this.db, this.table, buttonId);
    }

    private parseRow(row: any): Button {
        return {
            id: row.id,
            name: row.name,
            icon: row.icon,
            color: row.color,
            steps: JSON.parse(row.steps)
        };
    }

    private toRow(button: Button): any[] {
        return [
            button.id,
            button.name,
            button.icon,
            button.color,
            JSON.stringify(button.steps)
        ];
    }

    private async createButton(button: Button) {
        await insert(this.db, this.table, this.toRow(button));
    }

    private async persistButton(button: Button) {
        await update(this.db, this.table, ["name", "icon", "color", "steps"], this.toRow(button));
    }
}
