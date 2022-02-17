import { getCurrentBoard } from "@services/boards";
import { executeCommand } from "@services/commands";
import { getService, registerService } from "@services/services";
import { Server } from "http";
import * as socketio from "socket.io";

export const socket = (server: Server, allowedOrigins: string | string[]) => {
    const io = new socketio.Server(server, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST"]
        }
    });

    registerService('socket', io);

    io.on('connection', async (socket) => {
        console.log('a user connected');
        const currentBoard = await getCurrentBoard(getService('context'), getService('board'));
        socket.emit("board", currentBoard);
        socket.on("execute", async data => {
            await executeCommand(data);
        });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
