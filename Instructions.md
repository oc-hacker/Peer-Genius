# Creating a MySQL server
### Get started
- Download the dmg file from [here](https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.26-macos10.14-x86_64.dmg)
- IMPORTANT: Copy the password that the installation pkg gave you
- Go to System Preferences > MySQL > Start MySQL Server
- Open a new Terminal window and type ```mysql -u root -p``` (root as username)
- Type the password you copied from the installation pkg when it asks for it
### MySQL server commands
- Type ```ALTER USER 'root'@'localhost' IDENTIFIED BY 'pass';```
- Type ```USE mysql```
  
# Running Yarn
### Get started
- Open two new terminal windows
- ```cd {location of Peer Genius}```
- ```cd client```
- ```yarn dev``` 
You should get a message like this:
```Hash: fc758cfb6b08b0c2e39c
Version: webpack 3.7.1
Time: 10696ms
     Asset     Size  Chunks                    Chunk Names
    app.js  4.83 MB       0  [emitted]  [big]  main
app.js.map  5.31 MB       0  [emitted]         main
   [0] multi babel-polyfill react-hot-loader/patch webpack-hot-middleware/client?quiet=true ./index.dev.js 64 bytes {0} {0}
   [3] ./node_modules/react/react.js 56 bytes {0} {0} [built]
  [11] (webpack)/buildin/global.js 509 bytes {0} {0} [built]
  [43] ./node_modules/react-dom/index.js 59 bytes {0} {0} [built]
 [115] (webpack)/buildin/module.js 517 bytes {0} {0} [built]
 [301] ./react/main.js 3.31 kB {0} {0} [built]
 [614] ./node_modules/babel-polyfill/lib/index.js 833 bytes {0} {0} [built]
 [816] ./node_modules/react-hot-loader/patch.js 40 bytes {0} {0} [built]
 [935] (webpack)-hot-middleware/client.js?quiet=true 7.04 kB {0} {0} [built]
 [936] ./node_modules/querystring-es3/index.js 127 bytes {0} {0} [built]
 [939] ./node_modules/strip-ansi/index.js 161 bytes {0} {0} [built]
 [941] (webpack)-hot-middleware/client-overlay.js 1.82 kB {0} {0} [built]
 [946] (webpack)-hot-middleware/process-update.js 3.87 kB {0} {0} [built]
 [947] ./index.dev.js 1.08 kB {0} {0} [built]
[1033] ./node_modules/react-hot-loader/index.js 40 bytes {0} {0} [built]
    + 1680 hidden modules
webpack: Compiled successfully.
webpack: Compiling...
webpack building...
webpack built ae919bfea13f3c84babc in 1036ms
Hash: ae919bfea13f3c84babc
Version: webpack 3.7.1
Time: 1036ms
                                   Asset      Size  Chunks                    Chunk Names
                                  app.js   4.86 MB       0  [emitted]  [big]  main
    0.fc758cfb6b08b0c2e39c.hot-update.js   4.83 MB       0  [emitted]  [big]  main
    fc758cfb6b08b0c2e39c.hot-update.json  43 bytes          [emitted]         
                              app.js.map   5.31 MB       0  [emitted]         main
0.fc758cfb6b08b0c2e39c.hot-update.js.map   5.28 MB       0  [emitted]         main
   [0] multi babel-polyfill react-hot-loader/patch webpack-hot-middleware/client?quiet=true ./index.dev.js 64 bytes {0}
   [3] ./node_modules/react/react.js 56 bytes {0}
  [43] ./node_modules/react-dom/index.js 59 bytes {0}
 [115] (webpack)/buildin/module.js 517 bytes {0}
 [301] ./react/main.js 3.31 kB {0}
 [614] ./node_modules/babel-polyfill/lib/index.js 833 bytes {0}
 [615] ./node_modules/core-js/shim.js 8.18 kB {0}
 [816] ./node_modules/react-hot-loader/patch.js 40 bytes {0}
 [935] (webpack)-hot-middleware/client.js?quiet=true 7.04 kB {0}
 [936] ./node_modules/querystring-es3/index.js 127 bytes {0}
 [939] ./node_modules/strip-ansi/index.js 161 bytes {0}
 [941] (webpack)-hot-middleware/client-overlay.js 1.82 kB {0}
 [946] (webpack)-hot-middleware/process-update.js 3.87 kB {0}
 [947] ./index.dev.js 1.08 kB {0}
[1033] ./node_modules/react-hot-loader/index.js 40 bytes {0}
    + 1680 hidden modules
webpack: Compiled successfully.
```
- Open the other terminal window
- ```cd {location of Peer Genius}```
- ```cd server```
- ```yarn dev```
You should get a message like this:
```yarn run v1.13.0
warning ../package.json: No license field
$ nodemon ./entry.ts
[nodemon] 1.18.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `ts-node ./entry.ts`
sequelize deprecated String based operators are now deprecated. Please use Symbol based operators for better security, read more at http://docs.sequelizejs.com/manual/tutorial/querying.html#operators node_modules/sequelize/lib/sequelize.js:242:13
Mailer initialized.
Beginning database sync.
(node:64232) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
Listening on port 8080!
Creating backup: backup-20190627T223937198Z.sql
Unexpected error when creating backup:
 { Error: Command failed: mysqldump --user=root --password=pass --databases mysql > /Users/briansong/Desktop/Peer-Genius/server/backups/backup-20190627T223937198Z.sql
/bin/sh: mysqldump: command not found

    at ChildProcess.exithandler (child_process.js:294:12)
    at ChildProcess.emit (events.js:198:13)
    at ChildProcess.EventEmitter.emit (domain.js:448:20)
    at maybeClose (internal/child_process.js:982:16)
    at Socket.stream.socket.on (internal/child_process.js:389:11)
    at Socket.emit (events.js:198:13)
    at Socket.EventEmitter.emit (domain.js:448:20)
    at Pipe._handle.close (net.js:606:12)
  killed: false,
  code: 127,
  signal: null,
  cmd:
   'mysqldump --user=root --password=pass --databases mysql > /Users/briansong/Desktop/Peer-Genius/server/backups/backup-20190627T223937198Z.sql' }
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` CHAR(36) BINARY , `firstName` VARCHAR(255) NOT NULL DEFAULT '', `lastName` VARCHAR(255) NOT NULL DEFAULT '', `birthday` DATE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;
Executing (default): SHOW INDEX FROM `users`
Executing (default): CREATE TABLE IF NOT EXISTS `accounts` (`userId` CHAR(36) BINARY , `email` VARCHAR(255) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, `verified` TINYINT(1) DEFAULT false, `time` BIGINT DEFAULT 0, `voluntuEmail` VARCHAR(255), `voluntuPassword` VARCHAR(255), `profilePicture` MEDIUMTEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `id` CHAR(36) BINARY, PRIMARY KEY (`userId`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;
Executing (default): SHOW INDEX FROM `accounts`
Executing (default): CREATE TABLE IF NOT EXISTS `courses` (`id` CHAR(36) BINARY , `name` VARCHAR(255) NOT NULL DEFAULT '', `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;
Executing (default): SHOW INDEX FROM `courses`
Executing (default): CREATE TABLE IF NOT EXISTS `sessions` (`id` CHAR(36) BINARY , `newbieId` CHAR(36) BINARY NOT NULL, `guruId` CHAR(36) BINARY, `courseId` CHAR(36) BINARY NOT NULL, `scheduledStart` DATETIME NOT NULL, `scheduledEnd` DATETIME NOT NULL, `startTime` DATETIME DEFAULT NULL, `endTime` DATETIME DEFAULT NULL, `rating` INTEGER DEFAULT NULL, `comment` VARCHAR(255) DEFAULT NULL, `assignment` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`newbieId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`guruId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;
Executing (default): SHOW INDEX FROM `sessions`
Executing (default): CREATE TABLE IF NOT EXISTS `messages` (`id` CHAR(36) BINARY , `senderId` CHAR(36) BINARY, `sessionId` CHAR(36) BINARY, `message` MEDIUMTEXT NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`senderId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`sessionId`) REFERENCES `sessions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;
Executing (default): SHOW INDEX FROM `messages`
Executing (default): CREATE TABLE IF NOT EXISTS `keys` (`userId` CHAR(36) BINARY , `verifyEmailKey` CHAR(32) UNIQUE, `nextEmail` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`userId`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;
Executing (default): SHOW INDEX FROM `keys`
Executing (default): CREATE TABLE IF NOT EXISTS `gurus` (`id` INTEGER NOT NULL auto_increment , `userId` CHAR(36) BINARY NOT NULL, `courseId` CHAR(36) BINARY NOT NULL, `enabled` TINYINT(1) NOT NULL DEFAULT false, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, UNIQUE `guru` (`userId`, `courseId`), PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;
Executing (default): SHOW INDEX FROM `gurus`
Database sync complete.
```

## Go to localhost:8081 and observe!
