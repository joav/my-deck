import { BoardRepository } from "@interfaces/board.repository";
import { ContextRepository } from "@interfaces/context.repository";
import { Board } from "@models/board";
import { Command } from "@models/command";
import { getService } from "@services/services";
import { ROOT_ID } from "@utils/root-id";
import { BaseCommand } from "../../shared/base.command";
import { MyDeckContext } from "../context";

type ToSpecificParams = {
    boardId: string;
};

export class ToSpecificCommand extends BaseCommand {
    static definition: Command = {
        id: "to-specific",
        name: "Tablero específico",
        defaultParams: {
            boardId: ROOT_ID
        },
        params: [
            {
                key: "boardId",
                label: "Tablero",
                placeholder: "Seleccione el tablero",
                type: "select",
                asyncLoadData: true,
            }
        ]
    };

    async execute({ boardId }: ToSpecificParams): Promise<any> {
        const contextRepository = getService<ContextRepository>('context');
        const myDeckContext = new MyDeckContext(contextRepository);
        const history = await myDeckContext.getHistory();
        history.push(boardId);
        await Promise.all([
            myDeckContext.setCurrentBoard(boardId),
            myDeckContext.setHistory(history),
        ]);
    }

    async getData() {
        const boardRepository = getService<BoardRepository>('board');
        const boards = await boardRepository.getAll();

        return boards.map(b => ({id: b.id, name: b.name}));
    }
}

export function getInstance() {
    return new ToSpecificCommand();
}
