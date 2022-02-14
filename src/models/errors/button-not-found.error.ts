import { NotFoundError } from "./not-found.error";

export class ButtonNotFoundError extends NotFoundError {
    constructor() {
        super("Button");
    }
}
