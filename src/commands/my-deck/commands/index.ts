import { BaseCommand } from "src/commands/shared/base.command";
import { BackCommand } from "./back.command";
import { DelayCommand } from "./delay.command";
import { ToRootCommand } from "./to-root.command";
import { ToSpecificCommand } from "./to-specific.command";

export const commands: (typeof BaseCommand)[] = [
    ToRootCommand,
    BackCommand,
    ToSpecificCommand,
    DelayCommand,
];
