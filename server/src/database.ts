import { DataSource } from 'typeorm';
import dbConfig from './ormconfig';

const AppDataSource = new DataSource(dbConfig);

export default AppDataSource;
