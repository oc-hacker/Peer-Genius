import * as e from 'express';
import * as http from 'http';

declare namespace peer {
	interface ExpressPeerServerOptions {
		debug: boolean;
		timeout: number;
		key: string;
		ip_limit: number;
		concurrent_limit: number;
		allow_discovery: boolean;
		proxied: boolean;
	}
	
	type ExpressPeerServer = (server: http.Server, options: ExpressPeerServerOptions) => e.Express;
}
