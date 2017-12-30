import * as path from 'path';
import * as express from 'express';
import * as sio from 'socket.io';
import { onConnect } from './socket';

import { createServer, Server } from 'http';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as serveStatic from 'serve-static';

import { initMailer } from '../email/mailer';
import { logger, sendIndex, notFound, errorHandler } from '../router/misc/utils';
import apiRouter from '../router/api';

const { NODE_ENV, SERVER_PORT } = process.env;

type CORSCallback = (error: any, allowed?: boolean) => void;

const corsOptions = {
	origin: (origin: string, cb: CORSCallback) => {
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

// Listen; also get the server.
const server = createServer(app);
server.listen(SERVER_PORT, () => {
	console.log('Listening on port ' + SERVER_PORT + '!');
});
export const seio = sio(server);
seio.on('connection', onConnect);
// Logger
app.use(logger);

// CORS
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.get('*.js', (request, response, next) => {
	request.url += '.gz';
	response.set('Content-Encoding', 'gzip');
	next();
});

app.use(bodyParser.json());

app.use(cookieParser());

// Assets
app.use(serveStatic(path.join(__dirname, '../../public')));

app.use('/api', apiRouter);

app.get(/^\/(?!api)/, sendIndex);

// If none of the above match, 404 not found.
app.use(notFound);

// Errors
app.use(errorHandler);

export default server;
