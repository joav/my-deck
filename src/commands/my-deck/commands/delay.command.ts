import { Command } from "@models/command";
import { BaseCommand } from "../../shared/base.command";

type DelayParams = {
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
