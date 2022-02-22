import os from "os";
import { BaseCommand, ExecuteParams } from "@commands/shared/base.command";
import { Command } from "@models/command";
import { exec } from "child_process";
import path from "path";

type OpenFolderParams = ExecuteParams & {
    folder: string;
};

export class OpenFolderCommand extends BaseCommand {
    static definition: Command = {
        id: "open-folder",
        name: "Abrir una carpeta",
        showCommand: true,
        defaultParams: {
            folder: ""
        },
        params: [
            {
                key: "folder",
                label: "Carpeta",
                placeholder: "Ruta de la carpeta. ej: C://users",
                type: "text",
            }
        ]
    };

    async execute({folder}: OpenFolderParams): Promise<any> {
        let script = "";
        folder = path.resolve(folder);
        const options:any = {};
        if (os.type() === 'Darwin') {
            script = "open";
        } else {
            script = "start";
            options.shell = "powershell";
        }
        exec(`${script} ${folder}`, options, (error, stdout, stderr) => {
            if (error) {
                console.log(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
}

export function getInstance() {
    return new OpenFolderCommand();
}
