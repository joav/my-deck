import { Command } from "@models/command";
import { getVolume, setVolume } from "loudness";
import { BaseCommand } from "../../shared/base.command";

export class VolumeDownCommand extends BaseCommand {
    static definition: Command = {
        id: "volume-down",
        name: "Bajar el volúmen",
        showCommand: true
    };
    async execute(): Promise<any> {
        try {
            const volume = await getVolume();
            
            if (volume > 0) {
                await setVolume(volume - 1);
            }
        } catch (error) {
            console.log("VolumeDown error", error)
        }
    }
}

export function getInstance() {
    return new VolumeDownCommand();
}
