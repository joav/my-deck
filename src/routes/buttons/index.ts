import { ButtonRepository } from "@interfaces/button.repository";
import { NotFoundError } from "@models/errors/not-found.error";
import { createButton, deleteButton, getAllButtons, getButton, updateButton } from "@services/button";
import { getService } from "@services/services";
import { Router } from "express";

export const buttonsRouter = Router();

const getButtonRepository = () => getService<ButtonRepository>('button');

// List buttons
buttonsRouter.get('', async (req, res) => {
    const buttonRepository = getButtonRepository();
    const boards = await getAllButtons(buttonRepository);
    res.json(boards);
});

// Create a button
buttonsRouter.post('', async (req, res) => {
    const buttonRepository = getButtonRepository();
    const board = await createButton(buttonRepository, req.body);
    res.json(board);
});

// Get a button
buttonsRouter.get('/:buttonId', async (req, res) => {
    const buttonRepository = getButtonRepository();
    const board = await getButton(buttonRepository, req.params.buttonId);
    if (board) {
        res.json(board);
    } else {
        res.status(404).json({code: 404, errorMessage: "Button not found"});
    }
});

// Update a button
buttonsRouter.put('/:buttonId', async (req, res) => {
    try {
        const buttonRepository = getButtonRepository();
        const board = await updateButton(buttonRepository, req.body);
        res.json(board);
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({code: 404, errorMessage: error.message});
        } else {
            res.status(500).json({code: 500, errorMessage: (error as any).message || "Internal server error"});
        }
    }
});

// Delete a button
buttonsRouter.put('/:buttonId', async (req, res) => {
    try {
        const buttonRepository = getButtonRepository();
        await deleteButton(buttonRepository, req.body);
        res.json({code: 200, message: "OK"});
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({code: 404, errorMessage: error.message});
        } else {
            res.status(500).json({code: 500, errorMessage: (error as any).message || "Internal server error"});
        }
    }
});
