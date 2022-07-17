import express, { Express, Request, Response } from 'express';
import { router } from './routes';

const app: Express = express();
const PORT: number = 3002;

app.use('/', router);

app.listen(PORT, () => {
    console.log(`> Server has been started on ${PORT} port`);
});