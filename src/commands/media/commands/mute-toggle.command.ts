import { Command } from "@models/command";
import { getMuted, setMuted } from "loudness";
import { BaseCommand } from "../../shared/base.command";

export class MuteToggleCommand extends BaseCommand {
    static definition: Command = {
        id: "mute-toggle",
        name: "Toggle Mute",
        showCommand: true
    };
    async execute(): Promise<any> {
        try {
            const isMute = await getMuted();
            
            await setMuted(!isMute);
        } catch (error) {
            console.log("MuteToggle error", error)
        }
    }
}

export function getInstance() {
    return new MuteToggleCommand();
}
