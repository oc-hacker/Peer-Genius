"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const config_1 = require("./config");
const mailer_1 = require("../email/mailer");
const utils_1 = require("../router/misc/utils");
const api_1 = require("../router/api");
const corsOptions = {
    origin: (origin, cb) => {
        // If origin is null or peergenius.io, it's good.
        if (!origin || origin === 'https://peergenius.io') {
            cb(null, true);
        }
        else if (config_1.default.devMode && origin === `http://localhost:${config_1.default.devServerPort}`) {
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
app.use(utils_1.logger);
// Assets
app.use(express.static('../public'));
app.use('/api', api_1.default);
// Send index
app.get(/^\/(?!api)/, utils_1.sendIndex);
// Ensure responses is ended
app.use(utils_1.endResponse);
// Errors
app.use(utils_1.errorHandler);
app.listen(config_1.default.serverPort, () => {
    console.log("Listening on port " + config_1.default.serverPort + "!");
});
//# sourceMappingURL=server.js.map