import { DataSourceOptions } from 'typeorm';
import { User } from './entities/user';

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true,
    logging: false,
};

export default config;
