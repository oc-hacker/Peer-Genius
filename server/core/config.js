"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
let config = {
    mysqlDatabase: '',
    mysqlUser: '',
    mysqlPassword: '',
    sessionJWTKey: '',
    sessionJWTExpire: '1d',
    serverPort: 80,
    devServerPort: 8081,
    backupPath: 'backup',
    devMode: false,
    mailerXOAuth2: {
        accessUrl: '',
        customHeaders: {},
        customParams: {}
    }
};
let configPath = path.resolve(__dirname, './config.json');
/**
 * Transfers data from <code>source</code> to <code>sink</code>.
 * @param source
 * @param sink
 * @return changed Whether the sink's expectations have changed.
 */
const transfer = (source, sink) => __awaiter(this, void 0, void 0, function* () {
    let changed = false;
    for (let key in sink) {
        if (sink.hasOwnProperty(key)) {
            if (key in source) {
                // Check for deep copy
                if (typeof sink[key] === 'object') {
                    if (typeof source[key] === 'object') {
                        changed = (yield transfer(source[key], sink[key])) || changed;
                    }
                    else {
                        changed = true;
                    }
                }
                else {
                    sink[key] = source[key];
                }
            }
            else {
                changed = true;
            }
        }
    }
    return changed;
});
exports.loadConfig = () => __awaiter(this, void 0, void 0, function* () {
    console.log(`Accessing config at path ${configPath}`);
    let fileReadSuccess = true;
    let importedConfig = {};
    try {
        // Load file
        yield fs.accessSync(configPath, fs.constants.R_OK | fs.constants.W_OK);
        importedConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }
    catch (error) {
        fileReadSuccess = false;
        console.log('Config file missing or corrupted. Resetting file...');
        fs.writeFile(configPath, yield JSON.stringify(config, null, '\t'));
    }
    if (fileReadSuccess) {
        let changed = yield transfer(importedConfig, config);
        if (changed) {
            // Save the config file again
            fs.writeFileSync(configPath, yield JSON.stringify(config, null, '\t'));
        }
        console.log('Config loaded.');
    }
});
exports.default = config;
//# sourceMappingURL=config.js.map