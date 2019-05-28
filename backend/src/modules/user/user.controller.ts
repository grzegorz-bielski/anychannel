import { combineRoutes, r } from '@marblejs/core';

import { getUsersEffect$ } from '@modules/user/effects';

const getUsers$ = r.pipe(
    r.matchPath('/'),
    r.matchType('GET'),
    r.useEffect(getUsersEffect$),
);

export const users$ = combineRoutes('/users', {
    effects: [getUsers$],
    //   middlewares: [authorize$],
});
