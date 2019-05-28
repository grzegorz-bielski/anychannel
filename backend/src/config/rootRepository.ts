import { UserRepository } from '@modules/user/user.repository';
import { Connection } from 'typeorm';

export const rootRepositoryFactory = (connection: Connection) => ({
    userRepository: new UserRepository(connection),
});

export type RootRepository = ReturnType<typeof rootRepositoryFactory>;
