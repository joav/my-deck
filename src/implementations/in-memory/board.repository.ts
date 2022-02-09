import { BoardRepository } from "@interfaces/board.repository";
import { Board, Slot } from "@models/board";
import { BoardNotFoundError } from "@models/errors/board-not-found.error";
import { SlotNotFoundError } from "@models/errors/slot-not-found.error";
import { emptyBoard } from "@utils/empty-board";
import { ROOT_ID } from "@utils/root-id";


const boards: Board[] = [
    emptyBoard('Inicial', ROOT_ID)
];

export class InMemoryBoardRepository implements BoardRepository {
    async getAll() {
        return boards;
    }
    
    async save(board: Board) {
        const founded = boards.findIndex(b => b.id === board.id);
        if (founded > -1) {
            boards[founded] = board;
        } else {
            boards.push(board);
        }

        return board;
    }

    async updateBoard(boardId: string, name: string) {
        const board = await this.get(boardId);

        if (!board) throw new BoardNotFoundError();

        board.name = name;

        return board;
    }

    async setSlot(boardId: string, slotId: string, slot: Slot) {
        const board = await this.get(boardId);

        if (!board) throw new BoardNotFoundError();

        if (!(slotId in board.slots)) throw new SlotNotFoundError();
        
        (board.slots as any)[slotId] = slot;

        return board;
    }

    async get(boardId: string) {
        return boards.find(b => b.id === boardId);
    }

}
