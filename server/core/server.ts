import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as serveStatic from 'serve-static';

import { initMailer } from '../email/mailer';
import { logger, sendIndex, endResponse, errorHandler } from '../router/misc/utils';
import apiRouter from '../router/api';

const { NODE_ENV, SERVER_PORT } = process.env;

const corsOptions = {
	origin: (origin: string, cb: (any, boolean?) => any) => {
		// console.log(origin);
		// If origin is null or peergenius.io, it's good.
		if (!origin || origin === 'https://peergenius.io') {
			cb(null, true);
		}
		else if (NODE_ENV === 'dev') {
			cb(null, true);
		}
		else {
			cb(`Request blocked by CORS.`);
		}
	},
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
	credentials: true
};

const app = express();

initMailer();

// Logger
app.use(logger);

// CORS
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.get('*.js', function (request, response, next) {
	request.url += '.gz';
	response.set('Content-Encoding', 'gzip');
	next();
});

app.use(bodyParser.json());

app.use(cookieParser());

// Assets
app.use(serveStatic(path.join(__dirname, '../../public')));

app.get(/^\/(?!api)/, sendIndex);

app.use('/api', apiRouter);

// Ensure responses is ended
app.use(endResponse);

// Errors
app.use(errorHandler);

export default app.listen(SERVER_PORT, () => {
	console.log('Listening on port ' + SERVER_PORT + '!');
});
