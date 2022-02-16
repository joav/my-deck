import { getCurrentBoard } from "@services/boards";
import { getService, registerService } from "@services/services";
import { Server } from "http";
import * as socketio from "socket.io";

export const socket = (server: Server, allowedOrigins: string[]) => {
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
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
