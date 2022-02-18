import { FileRepository } from "@interfaces/file.repository";
import { File } from "@models/file";

export async function createFile(fileRepository: FileRepository, id: string, field: string, name: string) {
    const file: File = {
        id,
        field,
        name
    };

    return fileRepository.create(file);
}

export async function getFilesByField(fileRepository: FileRepository, field: string) {
    return fileRepository.getByField(field);
}
