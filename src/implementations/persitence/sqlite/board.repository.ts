import { getMultiple, getOne, insert, update } from "@infrastructure/sqlite/db-functions";
import { BoardRepository } from "@interfaces/board.repository";
import { Board, Slot } from "@models/board";
import { BoardNotFoundError } from "@models/errors/board-not-found.error";
import { SlotNotFoundError } from "@models/errors/slot-not-found.error";
import { getService } from "@services/services";
import { emptyBoard } from "@utils/empty-board";
import { ROOT_ID } from "@utils/root-id";
import { Database } from "sqlite3";

export class SqliteBoardRepository implements BoardRepository {
    private db: Database;
    private table = "boards";

    constructor() {
        this.db = getService<Database>('sqlite');
        this.createTable();
    }

    createTable() {
        this.db.run(`CREATE TABLE IF NOT EXISTS ${this.table} (
            id text PRIMARY KEY,
            name text,
            slots text
        )`, err => {
            if (!err) {
                console.log("Table: boards created");
                this.save(emptyBoard('Inicial', ROOT_ID)).then(() => console.log("Inserted first board"));
            }
        });
    }

    async getAll() {
        const rows = await getMultiple(this.db, "SELECT * from " + this.table);

        return rows.map(this.parseRow);
    }
    
    async save(board: Board) {
        const founded = await this.get(board.id);
        if (founded) {
            await this.updateBoard(board.id, board.name, founded);
        } else {
            await this.createBoard(board);
        }

        return board;
    }

    async updateBoard(boardId: string, name: string, board?: Board) {
        if (!board) board = await this.get(boardId);

        if (!board) throw new BoardNotFoundError();

        board.name = name;

        await this.persistBoard(board);

        return board;
    }

    async setSlot(boardId: string, slotId: string, slot: Slot) {
        const board = await this.get(boardId);

        if (!board) throw new BoardNotFoundError();

        if (!(slotId in board.slots)) throw new SlotNotFoundError();
        
        (board.slots as any)[slotId] = slot;

        await this.persistBoard(board);

        return board;
    }

    async get(boardId: string) {
        const row = await getOne(this.db, this.table, boardId);
        return row?this.parseRow(row):undefined;
    }

    private parseRow(row: any): Board {
        return {
            id: row.id,
            name: row.name,
            slots: JSON.parse(row.slots)
        };
    }

    private toRow(board: Board): any[] {
        return [
            board.id,
            board.name,
            JSON.stringify(board.slots)
        ];
    }

    private async createBoard(board: Board) {
        await insert(this.db, this.table, this.toRow(board));
    }

    private async persistBoard(board: Board) {
        await update(this.db, this.table, ["name", "slots"], this.toRow(board));
    }
}
