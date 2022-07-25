import express, { IRouter, Request, Response } from 'express';
import { getAllUsers, signUp } from './auth';

export const router: IRouter = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello!');
});

router.post('/signup', signUp);

router.post('/users', getAllUsers);
