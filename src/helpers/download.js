import fs from 'fs';
import got from 'got';
import path from 'path';
import progress from './progress';

// For testing purpose
// import Puid from 'puid';
// const id = new Puid(false).generate();

export function filename(file) {
	return `files/${path.basename(file)}`;
}

export function download(file = '') {
	return new Promise((resolve, reject) => {
		got.stream(file).on('response', (res) => {
			const length = parseInt(res.headers['content-length'], 10);
			const bar = progress(filename(file), length);

			res.on('data', chunk => bar.tick(chunk.length));
			res.on('end', () => resolve('File downloaded successfully!'));
		})
		.on('error', err => reject(err))
		.pipe(fs.createWriteStream(filename(file)));
	});
}
