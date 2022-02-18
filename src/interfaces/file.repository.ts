import { File } from "@models/file";

export interface FileRepository {
    create(file: File): Promise<File>;
    getByField(field: string): Promise<File[]>;
}
