import { BaseCommand } from "@commands/shared/base.command";
import { ExecuteAppCommand } from "./execute-app.command";
import { HotkeyCommand } from "./hotkey.command";
import { OpenFolderCommand } from "./open-folder.command";

export const commands: (typeof BaseCommand)[] = [
    OpenFolderCommand,
    ExecuteAppCommand,
    HotkeyCommand,
];
