import "reflect-metadata";
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import {useContainer, useExpressServer} from 'routing-controllers';
import {Container} from 'typedi';

import {UsersController} from "./controllers/users.controller";

useContainer(Container);

dotenv.config();

export class ServerApp {
    private readonly app: express.Application;
    private port = process.env['PORT'] || 5080;

    constructor() {
        this.app = express();
    }

    public async init(): Promise<void> {
        this.setupExpress();
        this.setupControllers();
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
            res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization');
            next();
        });
    }

    private setupControllers(): void {
        useExpressServer(this.app, {
            controllers: [UsersController]
        });
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port: ${this.port}`);
        });
    }
}
