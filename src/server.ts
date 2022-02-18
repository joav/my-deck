import { Server } from "http";
import express from "express";
import compression from 'compression';
import winston from 'winston';
import cors from "cors";
import expressWinston from 'express-winston';

import { router } from "./routes";
// import { InMemoryBoardRepository } from "./implementations/in-memory/board.repository";
import { registerMultipleServices, registerService } from "@services/services";
// import { InMemoryContextRepository } from "./implementations/in-memory/context.repository";
// import { InMemoryButtonRepository } from "./implementations/in-memory/button.repository";
import { db } from "./infrastructure/sqlite/db";
import { SqliteBoardRepository } from "./implementations/persitence/sqlite/board.repository";
import { SqliteButtonRepository } from "./implementations/persitence/sqlite/button.repository";
import { SqliteContextRepository } from "./implementations/persitence/sqlite/context.repository";
import { SqliteFileRepository } from "./implementations/persitence/sqlite/file.repository";
import { socket } from "./socket";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const allowedOrigins = '*';

const app = express();
const server = new Server(app);

socket(server, allowedOrigins);

registerService('sqlite', db);

registerMultipleServices([
    {
        key: 'board',
        service: new SqliteBoardRepository()
    },
    {
        key: 'context',
        service: new SqliteContextRepository()
    },
    {
        key: 'button',
        service: new SqliteButtonRepository()
    },
    {
        key: 'file',
        service: new SqliteFileRepository()
    },
]);

app.use(cors({
    origin: allowedOrigins
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(compression());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            format: winston.format.printf(log => log.message),
        })
    ],
    msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    colorize: true,
    // format: winston.format.combine(
    //     winston.format.colorize(),
    //     winston.format.json()
    // )
}));

app.use(express.static(__dirname + '/../public'));

app.use('/api', router);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

// @ts-ignore
server.listen(PORT, HOST, () => console.log(`MyDeck Server running on http://${HOST}:${PORT}`));
