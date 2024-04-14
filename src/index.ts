import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import routers from './routers';
import expressListEndpoints from "express-list-endpoints";
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as _config from "./config";
import * as _utils from "./utils";

const app = express();

require('dotenv').config();
app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(_utils.rateLimiter);
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Booking hotel (API)',
            version: '1.0.0',
        },
    },
    apis: ['./*.yaml'],
};
const openapiSpecification = swaggerJsdoc(options);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
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

_config.connection
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
    const endpoints = expressListEndpoints(app);
    console.log('Endpoints:', endpoints);
})
