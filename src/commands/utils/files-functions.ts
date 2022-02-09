import { readFile, writeFile } from "fs/promises";

export async function getFileContents(path: string): Promise<string> {
    return readFile(path, "utf-8");
}

export async function getJsonFile<T = any>(path: string, initialData?: T): Promise<T> {
    let data = JSON.stringify(initialData);
    try {
        data = await getFileContents(path);
    } catch (error) {
        if ((error as any).code === 'ENOENT') {
            await setJsonFile(path, initialData);
        } else {
            throw error;
        }
    }
    return JSON.parse(data);
}

export async function setFileContents(path: string, content: string) {
    return writeFile(path, content);
}

export async function setJsonFile(path: string, data: any) {
    return setFileContents(path, JSON.stringify(data));
}
