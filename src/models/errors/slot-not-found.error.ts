import { NotFoundError } from "./not-found.error";

export class SlotNotFoundError extends NotFoundError {
    constructor() {
        super("Slot");
    }
};