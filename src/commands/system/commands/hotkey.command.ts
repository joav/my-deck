import os from "os";
import { BaseCommand, ExecuteParams } from "@commands/shared/base.command";
import { getMacKeys, getWindowsKeys, hitHotkey } from "@commands/utils/keyboard";
import { Command } from "@models/command";
import { ParamData, ParamsData } from "@models/params-data";

type HotkeyParams = ExecuteParams & {
    modifier1: string;
    modifier2: string;
    modifier3: string;
    key: string;
};

export class HotkeyCommand extends BaseCommand {
    static definition: Command = {
        id: "hotkey",
        name: "Tecla o combinación de teclas",
        showCommand: true,
        defaultParams: {
            modifier1: "",
            modifier2: "",
            modifier3: "",
            key: "f5",
        },
        params: [
            {
                key: "modifier1",
                label: "Modificador 1",
                placeholder: "",
                type: "select",
                asyncLoadData: true,
            },
            {
                key: "modifier2",
                label: "Modificador 2",
                placeholder: "",
                type: "select",
                asyncLoadData: true,
            },
            {
                key: "modifier3",
                label: "Modificador 3",
                placeholder: "",
                type: "select",
                asyncLoadData: true,
            },
            {
                key: "key",
                label: "Tecla",
                placeholder: "",
                type: "select",
                asyncLoadData: true,
            },
        ],
        
    };

    async execute({
        modifier1,
        modifier2,
        modifier3,
        key,
    }: HotkeyParams): Promise<any> {
        console.log(`key: ${key}`, `modifier1: ${modifier1}`, `modifier2: ${modifier2}`, `modifier3: ${modifier3}`)
        await hitHotkey(key, modifier1, modifier2, modifier3);
    }

    async getData(): Promise<ParamsData> {
        const modifiersMap: Record<string, string> = {
            "": "",
            "Shift": "shift",
            "Control": "control",
        };

        let keys: ParamData[];
        
        if (os.type() === 'Darwin') {
            modifiersMap["Option"] = "option";
            modifiersMap["Command"] = "command";
            keys = getMacKeys();
        } else {
            modifiersMap["Alt"] = "alt";
            modifiersMap["Windows"] = "windows";
            keys = getWindowsKeys();
        }



        const modifiers: ParamData[] = Array.from(Object.entries(modifiersMap), v => ({id: v[1], name: v[0]}));
        
        keys.unshift(...modifiers);

        return {
            modifier1: modifiers,
            modifier2: modifiers,
            modifier3: modifiers,
            key: keys,
        };
    }
}

export function getInstance() {
    return new HotkeyCommand();
}
