import { ROOT_ID } from "@utils/root-id";
import { BaseContext } from "../shared/base.context";

const MY_DECK_BASE_KEY = 'my-deck';
const HISTORY = `${MY_DECK_BASE_KEY}__history`;
const CURRENT = `${MY_DECK_BASE_KEY}__current`;
const PREVIOUS = `${MY_DECK_BASE_KEY}__previous`;

export class MyDeckContext extends BaseContext {
    async setCurrentBoard(boardId: string) {
        await this.contextRepository.set(CURRENT, boardId);
    }

    async getCurrentBoard() {
        let current = await this.contextRepository.get(CURRENT);
        if (!current) current = ROOT_ID;
        return current;
    }

    async setHistory(history: string[]) {
        await this.contextRepository.setFromJson(PREVIOUS, history);
    }

    async getHistory() {
        let history = await this.contextRepository.getFromJson<string[]>(HISTORY);
        if (!history) history = [ROOT_ID];
        return history;
    }
}
