import { BaseCommand, ExecuteParams } from "@commands/shared/base.command";
import { FileRepository } from "@interfaces/file.repository";
import { Command } from "@models/command";
import { ParamsData } from "@models/params-data";
import { getService } from "@services/services";

type PlayAudioParams = ExecuteParams & {
    audio: string;
};

export class PlayAudioCommand extends BaseCommand {
    static definition: Command = {
        id: "play-audio",
        name: "Reproducir Sonido",
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
        console.log(params);
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
