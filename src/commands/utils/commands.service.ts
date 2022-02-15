import { Command } from "@models/command";
import { CommandsData } from "@models/commands-data";
import { CommandNotFoundError } from "@models/errors/command-not-found.error";
import { Group } from "@models/group";
import path from "path";
import { BaseCommand } from "../shared/base.command";
import { getJsonFile, setJsonFile } from "./files-functions";

const COMMANDS_DIR = path.resolve(__dirname, '../commands.json');

export class CommandsService {
    private static data: CommandsData = {
        groups: [],
        commands: {}
    };
    private static loaded = false;

    static async getCommandsData() {
        return getJsonFile<CommandsData>(COMMANDS_DIR, CommandsService.data);
    }

    static async loadData() {
        if (!CommandsService.loaded) {
            CommandsService.data = await CommandsService.getCommandsData();
        }
    }

    static async flushCommandsData() {
        await setJsonFile(COMMANDS_DIR, CommandsService.data);
    }

    static getData() {
        return CommandsService.data;
    }

    static async registerGroup(group: Group) {
        if (!CommandsService.loaded) {
            await CommandsService.loadData();
            CommandsService.loaded = true;
        }
        const groupIndex = CommandsService.data.groups.findIndex(g => g.id === group.id);
        if (groupIndex > -1) {
            CommandsService.data.groups[groupIndex] = group;
        }else {
            CommandsService.data.groups.push(group);
        }
    }

    static async registerComands(groupId: string, commands: Command[]) {
        const data = CommandsService.getData();
        const groupsIndex = data.groups.findIndex(g => g.id === groupId);
    
        for (const command of commands) {
            const realCommandId = `${groupId}__${command.id}`;
            data.commands[realCommandId] = {...command, id: realCommandId};
            
            if (!data.groups[groupsIndex].allCommands.includes(command.id)) {
                data.groups[groupsIndex].allCommands.push(command.id);
            }
    
            if (command.showCommand && !data.groups[groupsIndex].commandsToShow.includes(command.id)) {
                data.groups[groupsIndex].commandsToShow.push(command.id);
            }
        }
    }

    static async getCommand(groupId: string, commandId: string): Promise<BaseCommand> {
        try {
            const {getInstance} = require(__dirname+`/../${groupId}/commands/${commandId}.command`);
            return getInstance();
        } catch (error) {
            throw new CommandNotFoundError();
            
        }
    }
}
