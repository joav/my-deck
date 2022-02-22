import os from "os";
import { BaseCommand, ExecuteParams } from "@commands/shared/base.command";
import { FileRepository } from "@interfaces/file.repository";
import { Command } from "@models/command";
import { ParamsData } from "@models/params-data";
import { getService } from "@services/services";
import { exec } from "child_process";
import path from "path";

type PlayAudioParams = ExecuteParams & {
    audio: string;
};

export class PlayAudioCommand extends BaseCommand {
    static definition: Command = {
        id: "play-audio",
        name: "Reproducir Sonido",
        showCommand: true,
        defaultParams: {
            audio: ""
        },
        params: [
            {
                key: "audio",
                label: "Audio",
                placeholder: "Seleccione un audio",
                type: "file",
                asyncLoadData: true,
            }
        ]
    };

    async execute(params: PlayAudioParams): Promise<any> {
        const sound = path.resolve(__dirname, `../../../../files/${params.audio}`);
        let script = "";
        const options:any = {};
        if (os.type() === 'Darwin') {
            script = "afplay";
        } else {
            script = path.resolve(__dirname, `../../../../bin/mplayer/mplayer`);
            options.shell = "powershell";
        }
        exec(`${script} ${sound}`, options, (error, stdout, stderr) => {
            if (error) {
                console.log(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        })
    }

    async getData(): Promise<ParamsData> {
        const fileRepository = getService<FileRepository>('file');
        const files = await fileRepository.getByField('media__play-audio__audio');

        return {audio: files};
    }
}

export function getInstance() {
    return new PlayAudioCommand();
}
