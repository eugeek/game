import express, { Express, Request, Response } from 'express';
import bp from 'body-parser';
import { router } from './routes';

const app: Express = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/', router);

export default app;
