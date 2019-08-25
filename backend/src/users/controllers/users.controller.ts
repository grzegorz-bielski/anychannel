import { Get, Post, Controller, Body } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersService } from '../services/users.service';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(): Observable<UserEntity[]> {
        return this.usersService.getAll();
    }

    @Post('/signup')
    signUp(@Body() user: User): Observable<UserEntity> {
        return this.usersService.create(user);
    }
}
