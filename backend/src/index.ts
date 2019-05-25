import {
    createServer,
    httpListener,
    HttpEffect,
    combineRoutes,
    EffectFactory,
    HttpResponse,
    r,
    reader,
} from '@marblejs/core';
import { mapTo } from 'rxjs/operators';

const helloEffect$: HttpEffect = req$ =>
    req$.pipe(mapTo({ body: JSON.stringify({ res: 'Hello, world!!!!!' }) }));

const hello$ = r.pipe(
    r.matchPath('/'),
    r.matchType('GET'),
    r.useEffect(helloEffect$),
);

// const hello$ = EffectFactory.matchPath('*')
//     .matchType('GET')
//     .use(helloEffect$);

const api$ = combineRoutes('/api', [hello$]);
const effects = [api$];

const port = 8000;
const server = createServer({
    port,
    httpListener: httpListener({ effects }),
});

server.run();
console.log(`Listening on the port ${port}`);
