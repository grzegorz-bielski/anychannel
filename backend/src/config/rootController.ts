import { combineRoutes } from '@marblejs/core';
import { users$ } from '@modules/user/user.controller';

export const rootHttpController$ = combineRoutes('/api', [users$]);
