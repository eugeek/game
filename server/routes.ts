import express, { IRouter, Request, Response } from 'express';

export const router: IRouter = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello!');
});