import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import database from './database';
import { User } from './entities/user';

const hashPassword = (password: string) => {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash);
        })
    );
};

const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'));
        });
    });
};

const createUser = async (payload: {
    name: string;
    token: string;
    password_digest: string;
}) => {
    const userRepository = database.getRepository(User);
    const user = new User();
    return await userRepository.save({ ...user, ...payload });
};

export const signUp = async (req: Request, res: Response) => {
    const user = req.body;
    if (!user.password || !user.name)
        res.status(400).send({
            msg: 'Please enter email and password.',
        });

    user.password_digest = await hashPassword(user.password);
    user.token = await createToken();
    delete user.password;

    const newUser = await createUser(user);
    res.status(200).send(newUser);
};

export const getAllUsers = async (req: Request, res: Response) => {
    const userRepository = database.getRepository(User);
    const users = await userRepository.find();

    res.status(200).send(users);
};
