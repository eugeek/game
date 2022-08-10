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

const checkPassword = (reqPassword: string, foundUser: User) => {
    return new Promise((resolve, reject) =>
        bcrypt.compare(
            reqPassword,
            foundUser.password_digest,
            (err, response) => {
                if (err) {
                    reject(err);
                } else if (response) {
                    resolve(response);
                } else {
                    reject(new Error('Passwords do not match.'));
                }
            }
        )
    );
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

const updateUserToken = async (token: string, user: User) => {
    const userRepository = database.getRepository(User);
    return await userRepository.save({ ...user, token });
};

export const signUp = async (req: Request, res: Response) => {
    const user = req.body;
    if (!user.password || !user.name || !user.email) return res.status(400).send({
        msg: 'Please enter name, email and password.',
    });
    try {
        user.password_digest = await hashPassword(user.password);
        user.token = await createToken();
        delete user.password;
        const newUser: { id: number; name: string; token: string; password_digest?: string; created_at: Date } = await createUser(user);

        delete newUser.password_digest;
        return res.status(200).send(newUser);
    } catch (error) {
        console.error(error);
        return res.status(400);
    }

};

export const signIn = async (req: Request, res: Response) => {
    const user = req.body;
    if (!user.password || !user.name) return res.status(400).send({
        msg: 'Please enter name and password.',
    });
    try {
        const userRepository = database.getRepository(User);
        const foundUser = await userRepository.findOne({ where: { name: user.name } });
        if (!foundUser) return res.status(400).send({
            msg: 'User not found.',
        });
        const checkedPassword = await checkPassword(user.password, foundUser);
        if (!checkedPassword) return res.status(400).send({ msg: 'Password is not current.' });
        const token = await createToken();
        if (typeof token !== 'string') return;
        const loggedInUser: { id: number; name: string; token: string; password_digest?: string; created_at: Date } = await updateUserToken(token, foundUser);
        delete loggedInUser.password_digest;
        return res.status(200).send(loggedInUser);
    } catch (error) {
        console.error(error);
        return res.status(400);
    }

};

export const getAllUsers = async (req: Request, res: Response) => {
    const userRepository = database.getRepository(User);
    const users = await userRepository.find();

    return res.status(200).send(users);
};
