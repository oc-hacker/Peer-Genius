console.log("Starting backup processes...");
import dbUtils from '../database/utils/dbUtils';

dbUtils.makeBackup();
setInterval(dbUtils.makeBackup, 86400000);