import { ContextRepository } from "@interfaces/context.repository";

export abstract class BaseContext {
    constructor(protected contextRepository: ContextRepository) { }
}
