import { Command } from "@models/command";
import { BaseCommand, ExecuteParams } from "../../shared/base.command";

type DelayParams = ExecuteParams & {
    delay: number;
};

export class DelayCommand extends BaseCommand {
    static definition: Command = {
        id: "delay",
        name: "Delay",
        defaultParams: {
            delay: 0
        },
        params: [
            {
                key: "delay",
                label: "Delay",
                type: "number",
            }
        ]
    };
    execute({delay}: DelayParams): Promise<any> {
        return new Promise((r) => setTimeout(r, +delay));
    }
}

export function getInstance() {
    return new DelayCommand();
}
