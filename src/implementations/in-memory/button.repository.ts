import { ButtonRepository } from "@interfaces/button.repository";
import { Button } from "@models/button";
import { ButtonNotFoundError } from "@models/errors/button-not-found.error";

const buttons: Button[] = [];

export class InMemoryButtonRepository implements ButtonRepository {
    async getAll() {
        return buttons;
    }
    
    async save(button: Button) {
        const founded = buttons.findIndex(b => b.id === button.id);
        if (founded > -1) {
            buttons[founded] = button;
        } else {
            buttons.push(button);
        }

        return button;
    }

    async updateButton(buttonIn: Button) {
        if (!buttonIn.id) throw new ButtonNotFoundError();
        const button = await this.get(buttonIn.id);

        if (!button) throw new ButtonNotFoundError();

        return this.save(buttonIn);
    }

    async get(buttonId: string) {
        return buttons.find(b => b.id === buttonId);
    }

    async delete(buttonId: string): Promise<void> {
        const founded = buttons.findIndex(b => b.id === buttonId);
        if (founded === -1) throw new ButtonNotFoundError();

        buttons.splice(founded, 1);
    }
}
