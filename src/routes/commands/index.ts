import { Router } from "express";

export const commandsRouter = Router();

commandsRouter.get('', (req, res) => {
    res.json([]);
});