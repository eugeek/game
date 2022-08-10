import express, { Express } from 'express';
import bp from 'body-parser';
import cors from 'cors';
import { router } from './routes';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/', router);

export default app;
