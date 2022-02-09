export interface ContextRepository {
    set(key: string, value: string): Promise<void>;
    setFromJson(key: string, value: any): Promise<void>;
    get(key: string): Promise<string>;
    getFromJson<T = any>(key: string): Promise<T>;
}
