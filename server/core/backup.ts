import { readdirSync, statSync, unlink } from 'fs';
import { resolve, join } from 'path';
import { exec } from 'child_process';

const {
	BACKUP_PATH = 'backups',
	DB_NAME,
	DB_ADMIN_USER,
	DB_ADMIN_PASS
} = process.env;

const asyncExec = (command: string): Promise<[string, string]> => {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			}
			else {
				resolve([stdout, stderr]);
			}
		});
	});
};

const backupRE = /^backup-\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z.sql$/;

const backup = async () => {
	try {
		try {
			// Ensure directory exists.
			await asyncExec(`mkdir ${BACKUP_PATH}`);
		}
		catch (_) {
		}
		
		const now = new Date();
		const timestamp = now.toISOString().replace(/[:\-.]/g, '');
		const fileName = `backup-${timestamp}.sql`;
		console.log(`Creating backup: ${fileName}`);
		
		await asyncExec(`mysqldump --user=${DB_ADMIN_USER} --password=${DB_ADMIN_PASS} --databases ${DB_NAME} > ${resolve(__dirname, '..', BACKUP_PATH, fileName)}`);
		
		console.log('Cleaning old backups...');
		let mostRecent = now.getTime();
		const day = 86400000;
		let { remove } = readdirSync(BACKUP_PATH)
			.filter(file => backupRE.test(file))
			.map(file => ({
				file,
				stats: statSync(file)
			}))
			.sort((left, right) => right.stats.mtimeMs - left.stats.mtimeMs)
			.reduce(({ keep, remove }: { keep: number; remove: string[]; }, { file, stats }) => {
				if (now.getTime() - stats.mtimeMs < day) { // Keep all backups in 1 day
					keep++;
					mostRecent = stats.mtimeMs;
				}
				else if (keep > 30) { // Keep at most 30 backups
					remove.push(file);
				}
				else if (mostRecent - stats.mtimeMs >= day) { // Keep at most 1 backup per day
					keep++;
					mostRecent = stats.mtimeMs;
				}
				else { // Otherwise, remove.
					remove.push(file);
				}
				return { keep, remove };
			}, { keep: 0, remove: [] });
		
		console.log(`Removing ${remove.length} backups.`);
		remove.forEach(file => unlink(resolve(BACKUP_PATH, file), error => {
			if (error) {
				console.error(`Error when removing backup ${file}:\n`, error);
				return;
			}
			
			console.log(`Removed ${file}`);
		}));
	}
	catch (error) {
		console.error('Unexpected error when creating backup:\n', error);
	}
};

const runBackup = () => {
	backup();
	setTimeout(runBackup, 86400000);
};

runBackup();
