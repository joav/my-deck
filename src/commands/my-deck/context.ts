import { ROOT_ID } from "@utils/root-id";
import { BaseContext } from "../shared/base.context";
import { MyDeckContextVars } from "./my-deck-context-vars";

export class MyDeckContext extends BaseContext {
    async setCurrentBoard(boardId: string) {
        await this.contextRepository.set(MyDeckContextVars.CURRENT, boardId);
    }

    async getCurrentBoard() {
        let current = await this.contextRepository.get(MyDeckContextVars.CURRENT);
        if (!current) current = ROOT_ID;
        return current;
    }

    async setHistory(history: string[]) {
        await this.contextRepository.setFromJson(MyDeckContextVars.HISTORY, history);
    }

    async getHistory() {
        let history = await this.contextRepository.getFromJson<string[]>(MyDeckContextVars.HISTORY);
        if (!history) history = [ROOT_ID];
        return history;
    }
}
