import * as Nest from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersService } from '../services/users.service';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models';

@Nest.Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Nest.Get()
    getUsers(): Observable<UserEntity[]> {
        return this.usersService.getAll();
    }

    @Nest.Post('/signup')
    signUp(@Nest.Body() user: User): Observable<UserEntity> {
        return this.usersService.create(user);
    }
}
