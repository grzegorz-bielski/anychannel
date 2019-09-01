import { Get, Post, Controller, Body, Req } from '@nestjs/common';
import { Request } from 'express';
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
        // console.log(request.body);
        return this.usersService.create(user);
    }
}
