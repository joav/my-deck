import { BaseCommand } from "@commands/shared/base.command";
import { MuteToggleCommand } from "./mute-toggle.command";
import { VolumeDownCommand } from "./volume-down.command";
import { VolumeUpCommand } from "./volume-up.command";

export const commands: (typeof BaseCommand)[] = [
    MuteToggleCommand,
    VolumeUpCommand,
    VolumeDownCommand,
];
