import { Router } from "express";
import { CommandsService } from "@commands/utils/commands.service";
import { NotFoundError } from "@models/errors/not-found.error";

export const commandsRouter = Router();

commandsRouter.get('', async (req, res) => {
    const commandsData = await CommandsService.getCommandsData();
    res.json(commandsData);
});

commandsRouter.get('/:groupCommandId/data', async (req, res) => {
    const commandsData = await CommandsService.getCommandsData();
    if (!commandsData.commands[req.params.groupCommandId]) res.status(404).json({code: 404, errorMessage: "Command not found"});
    else {
        const [groupId, commandId] = req.params.groupCommandId.split('__');
        try {
            const command = await CommandsService.getCommand(groupId, commandId);
            
            const data = await command.getData();
            res.json(data);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({code: 404, errorMessage: error.message});
            } else {
                res.status(500).json({code: 500, errorMessage: (error as any).message || "Internal server error"});
            }
        }
    }
});
