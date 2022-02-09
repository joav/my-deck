import { CommandsService } from "../utils/commands.service";
import { commands } from "./commands";

export async function install() {
    const groupId = "my-deck";
    await CommandsService.registerGroup({
        id: groupId,
        name: "My Deck",
        commandsToShow: [],
        allCommands: []
    });

    await CommandsService.registerComands(groupId, commands.filter(c => !!c).map(c => c.definition));

    await CommandsService.flushCommandsData();
}

(async () => {
    try {
        await install();
    } catch (error) {
        console.log(error);
    }
    process.exit();
})();
