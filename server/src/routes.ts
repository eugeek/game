import express, { IRouter, Request, Response } from 'express';
import { getAllUsers, signIn, signUp } from './dbMethods';

export const router: IRouter = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello!');
});

router.post('/signup', signUp);

router.post('/signin', signIn);

router.post('/users', getAllUsers);
