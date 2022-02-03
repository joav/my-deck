import { Router } from "express";

export const buttonsRouter = Router();

buttonsRouter.get('', (req, res) => {
    res.json([]);
});