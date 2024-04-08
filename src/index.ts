import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import routers from './routers';
import { connection } from './config/database';
const app = express();

require('dotenv').config();
app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', routers());
app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res
            .status(500)
            .json({ message: err.message })
    }
)

connection
    .sync()
    .then(() => {
        console.log('Database successfully connected');
    })
    .catch((err) => {
        console.log('Error', err);
    })

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server started on port 8080');
})
