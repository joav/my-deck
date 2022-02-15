import { Command } from "@models/command";
import { Params } from "@models/params";
import { ParamsData } from "@models/params-data";

export abstract class BaseCommand<T = any> {
    abstract execute(params?: Params): Promise<T>;
    async getData(): Promise<ParamsData> { return {}; }
    static definition: Command;
}
