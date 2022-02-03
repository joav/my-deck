import { NotFoundError } from "./not-found.error";

export class BoardNotFoundError extends NotFoundError {
    constructor() {
        super("Board");
    }
}