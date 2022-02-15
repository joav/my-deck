import { ContextRepository } from "@interfaces/context.repository";
import { Command } from "@models/command";
import { getService } from "@services/services";
import { ROOT_ID } from "@utils/root-id";
import { BaseCommand } from "../../shared/base.command";
import { MyDeckContext } from "../context";

export class ToRootCommand extends BaseCommand {
    static definition: Command = {
        id: "to-root",
        name: "Tablero inicial",
        showCommand: true
    };
    async execute(): Promise<any> {
        const contextRepository = getService<ContextRepository>('context');
        const myDeckContext = new MyDeckContext(contextRepository);
        await Promise.all([
            myDeckContext.setCurrentBoard(ROOT_ID),
            myDeckContext.setHistory([ROOT_ID]),
        ]);
    }
}

export function getInstance() {
    return new ToRootCommand();
}
