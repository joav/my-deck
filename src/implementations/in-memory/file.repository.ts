import { FileRepository } from "@interfaces/file.repository";
import { File } from "@models/file";

const files: {[key: string]: File[]} = {};

export class InMemoryFileRepository implements FileRepository {
    async create(file: File) {
        if (!files[file.field]) files[file.field] = [];
        files[file.field].push(file);
        return file;
    }

    async getByField(field: string) {
        return files[field];
    }
}
