import { Button } from "@models/button";

export interface ButtonRepository {
    getAll(): Promise<Button[]>;
    save(button: Button): Promise<Button>;
    updateButton(button: Button): Promise<Button>;
    get(buttonId: string): Promise<Button|undefined>;
    delete(buttonId: string): Promise<void>;
}
