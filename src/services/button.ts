import { ButtonRepository } from "@interfaces/button.repository";
import { Button } from "@models/button";
import uniqid from "uniqid";

export async function getAllButtons(buttonRepository: ButtonRepository) {
    return buttonRepository.getAll();
}

export async function createButton(buttonRepository: ButtonRepository, button: Button) {
    button.id = uniqid();
    return buttonRepository.save(button);
}

export async function getButton(buttonRepository: ButtonRepository, buttonId: string) {
    return buttonRepository.get(buttonId);
}

export async function updateButton(buttonRepository: ButtonRepository, button: Button) {
    return buttonRepository.updateButton(button);
}

export async function deleteButton(buttonRepository: ButtonRepository, buttonId: string) {
    return buttonRepository.delete(buttonId);
}
