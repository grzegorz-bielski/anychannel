const env = val => process.env[val];

const isProd = env('NODE_ENV') === 'prod';
const extension = isProd ? 'js' : 'ts';
const folder = isProd ? 'build' : 'src';

module.exports = {
    type: 'postgres',
    host: env('POSTGRES_HOST'),
    port: env('POSTGRES_PORT'),
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
