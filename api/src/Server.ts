import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import cors from 'cors'

import BaseRouter from './routes';
import logger from '@shared/Logger';

const app = express();
const { BAD_REQUEST } = StatusCodes;



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:2048",
    methods: "POST",
    allowedHeaders: ["Content-Type"],
    maxAge: 86400,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== "test") {
        logger.err(err, true);
    }
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});



/************************************************************************************
 *                 Serve an HTML notice for anything not an API
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.status(418).sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;
