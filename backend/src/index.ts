import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { tap, pluck } from 'rxjs/operators';
import {
    createServer,
    reader,
    bindTo,
    matchEvent,
    ServerEvent,
    HttpServerEffect,
} from '@marblejs/core';

import { app } from './app';
import { rootRepositoryFactory } from '@config/rootRepository';
import { connectionToken, rootRepositoryToken } from '@config/tokens';

const listening$: HttpServerEffect = event$ =>
    event$.pipe(
        matchEvent(ServerEvent.listening),
        pluck('payload'),
        tap(({ port, host }) =>
            // tslint:disable-next-line:no-console
            console.log(`Running @ http://${host}:${port}/`),
        ),
    );

const bootstrap = async () => {
    const connection = await createConnection();
    const connectionReader = reader.map(() => connection);
    const rootRepositoryReader = reader.map(() => rootRepositoryFactory(connection));

    const port = Number.parseInt(process.env.NODE_PORT!, 10);
    const server = createServer({
        port,
        httpListener: app,
        event$: listening$,
        dependencies: [
            bindTo(connectionToken)(connectionReader),
            bindTo(rootRepositoryToken)(rootRepositoryReader),
        ],
    });

    server.run();
};

bootstrap();
