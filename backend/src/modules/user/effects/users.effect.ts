import { HttpEffect } from '@marblejs/core';
import { mergeMap, map, mapTo } from 'rxjs/operators';

import { rootRepositoryToken } from '@config/tokens';

export const getUsersEffect$: HttpEffect = (req$, _, { ask }) =>
    ask(rootRepositoryToken)
        .map(({ userRepository }) =>
            req$.pipe(
                mergeMap(userRepository.findAll),
                map(users => ({ body: JSON.stringify({ res: users }) })),
            ),
        )
        .getOrElse(req$.pipe(mapTo({ body: 'err' })));
