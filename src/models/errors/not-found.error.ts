export class NotFoundError extends Error {
    constructor(who: string) {
        super(`${who} not found`);
    }
}