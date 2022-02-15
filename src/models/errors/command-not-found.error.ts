import { NotFoundError } from "./not-found.error";

export class CommandNotFoundError extends NotFoundError {
    constructor() {
        super("Command");
    }
}
