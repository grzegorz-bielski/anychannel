import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = (val: string) => process.env[val] || '';

const isProd = env('NODE_ENV') === 'prod';
const extension = isProd ? 'js' : 'ts';
const folder = isProd ? 'build' : 'src';

export const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: env('PGHOST'),
    port: Number.parseInt(env('PGPORT'), 10),
    username: env('PGUSER'),
    password: env('PGPASSWORD'),
    database: env('PGDATABASE'),
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
