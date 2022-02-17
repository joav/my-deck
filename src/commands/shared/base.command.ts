import { Slot } from "@models/board";
import { Command } from "@models/command";
import { Params } from "@models/params";
import { ParamsData } from "@models/params-data";

export type ExecuteParams = {
    executeContext: {
        boardId: string;
        slotId: string;
        slot: Slot;
        step: number;
    };
};

export abstract class BaseCommand<T = any> {
    abstract execute(params?: Params & ExecuteParams): Promise<T>;
    async getData(): Promise<ParamsData> { return {}; }
    static definition: Command;
}
