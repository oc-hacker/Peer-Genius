class ConsoleLogLevel {
	constructor(input) {
		if (typeof input == 'number') {
			this.priority = input;
			switch (input) {
				case 4:
					this.head = 'ERROR';
					this.printMethod = console.error;
					break;
				case 3:
					this.head = 'WARN';
					this.printMethod = console.warn;
					break;
				case 2:
					this.head = 'INFO';
					this.printMethod = console.info;
					break;
				case 1:
					this.head = 'DEBUG';
					this.printMethod = console.log;
					break;
				case 0:
					this.head = 'TRACE';
					this.printMethod = console.log;
					break;
				default:
					throw new RangeError("Log priority out of range.");
			}
		}
		else if (typeof input == 'string') {
			input = input.toUpperCase();
			this.head = input;
			
			switch (input) {
				case 'ERROR':
					this.priority = 4;
					this.printMethod = console.error;
					break;
				case 'WARN':
					this.priority = 3;
					this.printMethod = console.warn;
					break;
				case 'INFO':
					this.priority = 2;
					this.printMethod = console.info;
					break;
				case 'DEBUG':
					this.priority = 1;
					this.printMethod = console.log;
					break;
				case 'TRACE':
					this.priority = 0;
					this.printMethod = console.log;
					break;
				default:
					throw new RangeError("Log head not recognized.")
			}
		}
	}
	
	toString() {
		
	}
}

export class ConsoleLogger {
	constructor(level = 'INFO') {
		this.level = level;
	}
	
	get level() {
		return this._level;
	}
	
	set level(level) {
		this._level = new ConsoleLogLevel(level);
		console.log('Current log level: ' + this._level);
	}
	
	log(level, ...msg) {
		// Make sure that there is something to log
		let logLevel = new ConsoleLogLevel(level);
		
		if (this._level.priority <= logLevel.priority) {
			let now = new Date();
			
			// Format the time
			let hour = now.getHours();
			if (hour < 10) {
				hour = '0' + hour;
			}
			let minute = now.getMinutes();
			if (minute < 10) {
				minute = '0' + minute;
			}
			let second = now.getSeconds();
			if (second < 10) {
				second = '0' + second;
			}
			
			// Print the log
			logLevel.printMethod(`[${hour}:${minute}:${second}] [${logLevel.head}]`, msg.join(' '));
			return true;
		}
		return false;
	}
	
	trace(...msg) {
		return this.log(0, ...msg);
	}
	
	debug(...msg) {
		return this.log(1, ...msg);
	}
	
	info(...msg) {
		return this.log(2, ...msg);
	}
	
	warn(...msg) {
		return this.log(3, ...msg);
	}
	
	error(...msg) {
		return this.log(4, ...msg);
	}
}

// Create a single instance of our ConsoleLogger, this acts as a singleton.
const logger = new ConsoleLogger('INFO');

export default logger;