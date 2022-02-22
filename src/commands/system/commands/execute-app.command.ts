import os from "os";
import { BaseCommand, ExecuteParams } from "@commands/shared/base.command";
import { Command } from "@models/command";
import { exec } from "child_process";
import path from "path";

type ExecuteAppParams = ExecuteParams & {
    app: string;
    params: string;
};

export class ExecuteAppCommand extends BaseCommand {
    static definition: Command = {
        id: "execute-app",
        name: "Ejecutar un programa",
        showCommand: true,
        defaultParams: {
            app: "code",
            params: "."
        },
        params: [
            {
                key: "app",
                label: "Programa",
                placeholder: "Ruta del programa o nombre. ej: code",
                type: "text",
            },
            {
                key: "params",
                label: "Parametros",
                placeholder: "Parametros de incio del programa. ej: .",
                type: "text",
            },
        ]
    };

    async execute({app, params}: ExecuteAppParams): Promise<any> {
        app = app.includes('/') || app.includes("\\")?path.resolve(app):app;
        params = params.trim();
        const options:any = {};
        if (os.type() !== 'Darwin') {
            options.shell = "powershell";
        }
        exec(`${app} ${params}`, options, (error, stdout, stderr) => {
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
    return new ExecuteAppCommand();
}
