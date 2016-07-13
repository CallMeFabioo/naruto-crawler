import { green, red } from 'chalk';

export function success(message) {
	console.log(green(message));
}

export function error(message) {
	console.log(red(message));
}
