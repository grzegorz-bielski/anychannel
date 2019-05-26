import 'reflect-metadata';
import { createConnection, Connection, getRepository } from 'typeorm';
import { User } from './entity/User';
import {
    createServer,
    httpListener,
    HttpEffect,
    combineRoutes,
    r,
    createContextToken,
    reader,
    bindTo,
} from '@marblejs/core';
import { from } from 'rxjs';
import { mergeMap, map, mapTo } from 'rxjs/operators';

const connectionToken = createContextToken<Connection>();

// tslint:disable-next-line:no-unused-expression
(async () => {
    const connection = await createConnection();
    const connectionReader = reader.map(() => connection);

    const helloEffect$: HttpEffect = (req$, _, { ask }) =>
        ask(connectionToken)
            .map(conn => {
                const userRepository = conn.getRepository(User);

                return req$.pipe(
                    mergeMap(() => from(userRepository.find())),
                    map(users => ({ body: JSON.stringify({ res: users }) })),
                );
            })
            .getOrElse(req$.pipe(mapTo({ body: 'err' })));

    const hello$ = r.pipe(
        r.matchPath('/'),
        r.matchType('GET'),
        r.useEffect(helloEffect$),
    );

    const api$ = combineRoutes('/api', [hello$]);
    const effects = [api$];

    const port = 8000;
    const server = createServer({
        port,
        httpListener: httpListener({ effects }),
        dependencies: [bindTo(connectionToken)(connectionReader)],
    });

    server.run();
})();
