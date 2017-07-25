"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const config_1 = require("./config");
const mailer_1 = require("../email/mailer");
const utils_1 = require("../router/misc/utils");
const api_1 = require("../router/api");
const corsOptions = {
    origin: (origin, cb) => {
        // console.log(origin);
        // If origin is null or peergenius.io, it's good.
        if (!origin || origin === 'https://peergenius.io') {
            cb(null, true);
        }
        else if (config_1.default.devMode
            && (origin === `http://localhost${config_1.default.serverPort === 80 ? '' : `:${config_1.default.serverPort}`}`
                || origin === `http://localhost${config_1.default.devServerPort === 80 ? '' : `:${config_1.default.devServerPort}`}`)) {
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
mailer_1.initMailer();
// Logger
app.use(utils_1.logger);
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
app.get(/^\/(?!api)/, utils_1.sendIndex);
app.use('/api', api_1.default);
// Ensure responses is ended
app.use(utils_1.endResponse);
// Errors
app.use(utils_1.errorHandler);
app.listen(config_1.default.serverPort, () => {
    console.log('Listening on port ' + config_1.default.serverPort + '!');
});
//# sourceMappingURL=server.js.map