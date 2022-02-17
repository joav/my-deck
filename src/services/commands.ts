import { BaseCommand, ExecuteParams } from "@commands/shared/base.command";
import { CommandsService } from "@commands/utils/commands.service";
import { BoardRepository } from "@interfaces/board.repository";
import { ContextRepository } from "@interfaces/context.repository";
import { Slot } from "@models/board";
import { getCurrentBoard, setSlotState } from "./boards";
import { getService } from "./services";
import { updateSocket } from "./socket";

export interface ExecuteCommandParams {
    boardId: string,
    slotId: string,
    slot: Slot
};

export async function executeCommand({
    boardId,
    slotId,
    slot
}: ExecuteCommandParams) {
    if (slot.button) {
        console.log(`Execute slot: ${boardId} - ${slotId} - ${slot.button.name}`);
        const boardRepository = getService<BoardRepository>('board');
        let lastBoardId = boardId;
        try {
            const contextRepository = getService<ContextRepository>('context');
            const boardIn = await setSlotState(boardRepository, boardId, slotId, slot.button, "EXECUTING");
            await updateSocket(boardIn);
            
            const commandsData = await CommandsService.getCommandsData();
            const commands: {[key: string]: BaseCommand} = {};
            let step = 0;
            for (const action of slot.button.steps) {
                if (commandsData.commands[action.commandId]) {
                    const [groupId, commandId] = action.commandId.split('__');
                    let command = commands[action.commandId];
                    if (!command) {
                        command = await CommandsService.getCommand(groupId, commandId);
                        commands[action.commandId] = command;
                    }

                    console.log(`Executing command: ${action.commandId}`);
                    const executeContext = {boardId, slotId, slot, step};
                    const params = action.params?{...action.params, executeContext}:{executeContext};
                    await command.execute(params);
                    console.log(`Execution complete`);
                    const currentBoard = await getCurrentBoard(contextRepository, boardRepository);
                    if (currentBoard) {
                        lastBoardId = currentBoard.id;
                        await updateSocket(currentBoard);
                    }
                }
                step++;
            }
        } catch (error) {
            console.log("Execute command error: ", (error as any).message);
            console.log(error);
        }

        const boardOut = await setSlotState(boardRepository, boardId, slotId, slot.button, "FULL");
        if (boardId === lastBoardId) {
            await updateSocket(boardOut);
        }
    }
}
