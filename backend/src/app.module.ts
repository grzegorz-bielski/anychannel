import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dbConfig } from '@config/dbConfig';

import { UsersModule } from './users/users.module';

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), UsersModule],
})
export class AppModule {}
