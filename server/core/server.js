import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import config from './config';

const corsOptions = {
	origin: 'https://peer-genius.io', // TODO
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
	credentials: true
};

const app = express();

// TODO initMailer();

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.get('*.js', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	next();
});

app.use(bodyParser.json());

app.use(cookieParser());

app.use((request, response, next) => {
	console.log(new Date().toUTCString() , "Request received at" , request.originalUrl);
	next();
});

app.use(express.static('./public'));

// TODO app.use('/api', api.router);

// TODO app.get(/^\/(?!api)/, sendIndex);

// TODO app.use(end);

// TODO app.use(errorHandler);

app.listen(config.serverPort, () => {
	console.log("Listening on port " + config.serverPort + "!");
});
