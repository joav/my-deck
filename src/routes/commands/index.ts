import { Router } from "express";
import { CommandsService } from "src/commands/utils/commands.service";

export const commandsRouter = Router();

commandsRouter.get('', async (req, res) => {
    const commandsData = await CommandsService.getCommandsData();
    res.json(commandsData);
});
