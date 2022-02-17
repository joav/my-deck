import { Command } from "@models/command";
import { getVolume, setVolume } from "loudness";
import { BaseCommand } from "../../shared/base.command";

export class VolumeUpCommand extends BaseCommand {
    static definition: Command = {
        id: "volume-up",
        name: "Subir el volúmen",
        showCommand: true
    };
    async execute(): Promise<any> {
        try {
            const volume = await getVolume();
            
            if (volume < 100) {
                await setVolume(volume + 1);
            }
        } catch (error) {
            console.log("VolumeUp error", error)
        }
    }
}

export function getInstance() {
    return new VolumeUpCommand();
}
