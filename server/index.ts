import dotenv from 'dotenv';
dotenv.config();
import DataSource from './src/database';
import App from './src/app';

DataSource.initialize().then((conn) => App);
