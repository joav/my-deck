// import  { config } from "dotenv";
import express from "express";
// import { ApolloServer } from 'apollo-server-express';
// import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import winston from 'winston';
import expressWinston from 'express-winston';
import { router } from "./routes";
import { InMemoryBoardRepository } from "./implementations/in-memory/board.repository";
import { registerMultipleServices } from "@services/services";
import cors from "cors";
import { InMemoryContextRepository } from "./implementations/in-memory/context.repository";
import { InMemoryButtonRepository } from "./implementations/in-memory/button.repository";
// import db from './db';
// import schema from './schema';
// import Auth from './Auth'

const PORT = process.env.PORT || 3000;

// config();
// db();

registerMultipleServices([
    {
        key: 'board',
        service: new InMemoryBoardRepository()
    },
    {
        key: 'context',
        service: new InMemoryContextRepository()
    },
    {
        key: 'button',
        service: new InMemoryButtonRepository()
    },
]);

const allowedOrigins = [
    'http://localhost:3001',
    'http://localhost:3002',
];

const app = express();
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

app.listen(PORT, () => console.log(`MyDeck Server running on http://localhost:${PORT}`));
