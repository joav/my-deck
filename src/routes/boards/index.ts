import { BoardRepository } from "@interfaces/board.repository";
import { NotFoundError } from "@models/errors/not-found.error";
import { createBoard, getAllBoards, getBoard, getCurrentBoard, setBoardSlot, updateBoard } from "@services/boards";
import { getService } from "@services/services";
import { updateSocket } from "@services/socket";
import { Router } from "express";

export const boardsRouter = Router();

const getBoardRepository = () => getService<BoardRepository>('board');

// List boards
boardsRouter.get('', async (req, res) => {
    const boardRepository = getBoardRepository();
    const boards = await getAllBoards(boardRepository);
    res.json(boards);
});

// Create a board
boardsRouter.post('', async (req, res) => {
    const boardRepository = getBoardRepository();
    const board = await createBoard(boardRepository, req.body.name);
    res.json(board);
});

// Get a board
boardsRouter.get('/:boardId', async (req, res) => {
    const boardRepository = getBoardRepository();
    const board = await getBoard(boardRepository, req.params.boardId);
    if (board) {
        res.json(board);
    } else {
        res.status(404).json({code: 404, errorMessage: "Board not found"});
    }
});

// Update a board
boardsRouter.put('/:boardId', async (req, res) => {
    try {
        const boardRepository = getBoardRepository();
        const board = await updateBoard(boardRepository, req.params.boardId, req.body.name);
        updateSocket(board);
        res.json(board);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({code: 404, errorMessage: error.message});
        } else {
            res.status(500).json({code: 500, errorMessage: (error as any).message || "Internal server error"});
        }
    }
});

// Update a slot in a board
boardsRouter.put('/:boardId/slots/:slotId', async (req, res) => {
    try {
        const boardRepository = getBoardRepository();
        const board = await setBoardSlot(boardRepository, req.params.boardId, req.params.slotId, req.body.button);
        updateSocket(board);
        res.json(board);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({code: 404, errorMessage: error.message});
        } else {
            res.status(500).json({code: 500, errorMessage: (error as any).message || "Internal server error"});
        }
    }
});
