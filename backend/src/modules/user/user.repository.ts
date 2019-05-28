import { Connection, Repository } from 'typeorm';
import { from } from 'rxjs';

import { User } from '@modules/user/user.entity';

export class UserRepository {
    private readonly ctx: Repository<User>;

    constructor(connection: Connection) {
        this.ctx = connection.getRepository(User);
    }

    public findAll = () => from(this.ctx.find());
}
