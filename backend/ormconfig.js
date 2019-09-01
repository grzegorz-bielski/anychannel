const env = val => process.env[val] || '';

const isProd = env('NODE_ENV') === 'prod';
const extension = isProd ? 'js' : 'ts';
const folder = isProd ? 'dist' : 'src';

module.exports = {
    type: 'postgres',
    host: env('POSTGRES_HOST'),
    port: env('POSTGRES_PORT'),
    username: env('POSTGRES_USER'),
    password: env('POSTGRES_PASSWORD'),
    database: env('POSTGRES_DB'),
    // synchronize: true,
    logging: false,
    entities: [`${folder}/**/*.entity.${extension}`],
    migrations: [`${folder}/**/migration/**/*.${extension}`],
    subscribers: [`${folder}/**/*.subscriber.${extension}`],
    cli: {
        entitiesDir: `${folder}/entity`,
        migrationsDir: `${folder}/migration`,
        subscribersDir: `${folder}/subscriber`,
    },
};
