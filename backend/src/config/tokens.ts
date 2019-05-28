import { Connection } from 'typeorm';
import { createContextToken } from '@marblejs/core';

import { RootRepository } from './rootRepository';

export const connectionToken = createContextToken<Connection>();
export const rootRepositoryToken = createContextToken<RootRepository>();
