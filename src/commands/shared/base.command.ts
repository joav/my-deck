import { Command } from "@models/command";
import { Params } from "@models/params";

export abstract class BaseCommand<T = any> {
    abstract execute(params?: Params): Promise<T>;
    async getData(): Promise<{id: string; name: string}[]> { return []; }
    static definition: Command;
}
