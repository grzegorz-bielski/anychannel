const env = val => process.env[val] || '';

const isProd = env('NODE_ENV') === 'prod';
const extension = isProd ? 'js' : 'ts';
const folder = isProd ? 'dist' : 'src';

module.exports = {
    type: 'postgres',
    host: env('PGHOST'),
    port: Number.parseInt(env('PGPORT'), 10),
    username: env('PGUSER'),
    password: env('PGPASSWORD'),
    database: env('PGDATABASE'),
    synchronize: true,
    migrationsRun: true,
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
