import { Router } from "express";
import { boardsRouter } from "./boards";
import { buttonsRouter } from "./buttons";
import { commandsRouter } from "./commands";

export const router = Router();

router.use('/commands', commandsRouter);
router.use('/boards', boardsRouter);
router.use('/buttons', buttonsRouter);