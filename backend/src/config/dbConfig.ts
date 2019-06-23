import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = (val: string) => process.env[val] || '';

const isProd = env('NODE_ENV') === 'prod';
const extension = isProd ? 'js' : 'ts';
const folder = isProd ? 'build' : 'src';

export const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: env('POSTGRES_HOST'),
    port: Number.parseInt(env('POSTGRES_PORT'), 10),
    username: env('POSTGRES_USER'),
    password: env('POSTGRES_PASSWORD'),
    database: env('POSTGRES_DB'),
    synchronize: false,
    migrationsRun: true,
    logging: false,
    entities: [`${folder}/**/*.entity.${extension}`],
    migrations: [`${folder}/**/migrations/**/*.${extension}`],
    subscribers: [`${folder}/**/*.subscriber.${extension}`],
    cli: {
        entitiesDir: `${folder}/entity`,
        migrationsDir: `${folder}/migration`,
        subscribersDir: `${folder}/subscriber`,
    },
};
