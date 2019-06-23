import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import * as R from 'ramda';

import { UserEntity } from '../entities/user.entity';
import { User } from './../models';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) {}

    getAll(): Observable<UserEntity[]> {
        return from(this.usersRepository.find());
    }

    // create(user: User): Observable<UserEntity> {
    //     // const usr = Object.assign(new UserEntity(), user)
    //     // return from(this.usersRepository.save(usr));
    //     return R.compose(
    //         from,
    //         this.usersRepository.save,
    //         a => Object.assign(new UserEntity(), a),
    //     )(user);
    // }

    create: (a: User) => Observable<UserEntity> = R.compose(
        from,
        this.usersRepository.save,
        R.merge(new UserEntity()),
    );
}
