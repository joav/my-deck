import { BoardRepository } from "@interfaces/board.repository";
import { Slot } from "@models/board";
import { Button } from "@models/button";
import { emptyBoard } from "@utils/empty-board";

export async function getAllBoards(boardRepository: BoardRepository) {
    return boardRepository.getAll();
}

export async function createBoard(boardRepository: BoardRepository, name: string) {
    const board = emptyBoard(name);
    return boardRepository.save(board);
}

export async function getBoard(boardRepository: BoardRepository, boardId: string) {
    return boardRepository.get(boardId);
}

export async function updateBoard(boardRepository: BoardRepository, boardId: string, name: string) {
    return boardRepository.updateBoard(boardId, name);
}

export async function setBoardSlot(boardRepository: BoardRepository, boardId: string, slotId: string, button: Button) {
    const slot: Slot = {
        state: button?'FULL':'EMPTY',
        button
    };

    return boardRepository.setSlot(boardId, slotId, slot);
}
