import express, { Express, Request, Response } from 'express';
import bp from 'body-parser';
import { router } from './routes';

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3002;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/', router);

export default app.listen(PORT, () =>
    console.log(`> Server has started!\n> http://localhost:${PORT}`)
);
