import { MyDeckContext } from "@commands/my-deck/context";
import { ContextRepository } from "@interfaces/context.repository";
import { Board } from "@models/board";
import { Server } from "socket.io";
import { getService } from "./services";

export async function updateSocket(board: Board) {
    const contextRepository = getService<ContextRepository>('context');
    const context = new MyDeckContext(contextRepository);
    const currentBoardId = await context.getCurrentBoard();
    if (currentBoardId === board.id) {
        const socket = getService<Server>("socket");
        socket.emit("board", board);
    }
}
