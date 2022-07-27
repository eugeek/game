import dotenv from 'dotenv';
dotenv.config();
import database from './src/database';
import expressApp from './src/app';

const PORT: number = Number(process.env.PORT) || 3002;

database
    .initialize()
    .then((conn) =>
        expressApp.listen(PORT, () =>
            console.log(`> Server has started!\n> http://localhost:${PORT}`)
        )
    );
