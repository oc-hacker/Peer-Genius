import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import config from './config';
import { initMailer } from '../email/mailer';
import { logger, sendIndex, endResponse, errorHandler } from '../router/misc/utils';
import apiRouter from '../router/api';

const corsOptions = {
	origin: 'https://peer-genius.io', // TODO confirm url
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
	credentials: true
};

const app = express();

initMailer();

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.get('*.js', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	next();
});

app.use(bodyParser.json());

app.use(cookieParser());

// Logger
app.use(logger);

// Assets
app.use(express.static('../public'));

app.use('/api', apiRouter);

// Send index
app.get(/^\/(?!api)/, sendIndex);

app.use(endResponse);

// Errors
app.use(errorHandler);

app.listen(config.serverPort, () => {
	console.log("Listening on port " + config.serverPort + "!");
});
