console.log('Loading server...');
import express from 'express';
const app = express();
import cors from 'cors';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { serverPort } from './config.json';

import { logger, sendIndex, end } from '../functions/serverUtil.js';
import api from '../routers/apiRouter.js';

const corsOptions = {
	origin: 'http://peergenius.io',
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
	credentials: true
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(bodyParser.json());

app.use(cookieParser());

app.use(logger);

app.use(express.static('public'));

app.use('/api', api.router);

app.get(/^\/(?!api)/, sendIndex);

app.use(end);

app.listen(serverPort, function () {
	console.log("Listening on port " + serverPort + "!");
});