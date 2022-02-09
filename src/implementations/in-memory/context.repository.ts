import { ContextRepository } from "@interfaces/context.repository";

export class InMemoryContextRepository implements ContextRepository {
    private repo: Record<string, string> = {};

    async set(key: string, value: string): Promise<void> {
        this.repo[key] = value;
    }

    async setFromJson(key: string, value: any): Promise<void> {
        this.repo[key] = JSON.stringify(value);
    }

    async get(key: string): Promise<string> {
        return this.repo[key] || "";
    }

    async getFromJson<T = any>(key: string): Promise<T> {
        return JSON.parse(this.repo[key] || "");
    }
}
