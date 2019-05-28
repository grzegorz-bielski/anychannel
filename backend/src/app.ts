import { httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';

import { rootHttpController$ } from '@config/rootController';

const middlewares = [
    // cors$,
    // logger$,
    bodyParser$(),
];

const effects = [rootHttpController$];

export const app = httpListener({ middlewares, effects });
