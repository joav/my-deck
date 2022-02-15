import { ContextRepository } from "@interfaces/context.repository";
import { Command } from "@models/command";
import { getService } from "@services/services";
import { BaseCommand } from "../../shared/base.command";
import { MyDeckContext } from "../context";

export class BackCommand extends BaseCommand {
    static definition: Command = {
        id: "back",
        name: "Tablero anterior",
        showCommand: true
    };
    async execute(): Promise<any> {
        const contextRepository = getService<ContextRepository>('context');
        const myDeckContext = new MyDeckContext(contextRepository);
        const history = await myDeckContext.getHistory();
        history.pop();
        let current = history[0];
        if (history.length > 1) {
            current = history[history.length - 1];
        }
        await Promise.all([
            myDeckContext.setCurrentBoard(current),
            myDeckContext.setHistory(history),
        ]);
    }
}

export function getInstance() {
    return new BackCommand();
}
