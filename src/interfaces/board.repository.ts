import { Board, Slot } from "@models/board";

export interface BoardRepository {
    getAll(): Promise<Board[]>;
    save(board: Board): Promise<Board>;
    updateBoard(boardId: string, name: string): Promise<Board>;
    setSlot(boardId: string, slotId: string, slot: Slot): Promise<Board>;
    get(boardId: string): Promise<Board|undefined>;
}
