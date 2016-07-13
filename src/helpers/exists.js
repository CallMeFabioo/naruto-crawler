import fs from 'fs';

export default function fileNotExists(file) {
	return new Promise((resolve, reject) => {
		return fs.stat(file, (err, fileStat) => {
			if(err) {
				if(err.code === 'ENOENT') {
					resolve();
				}
			} else {
				if(fileStat.isFile()) {
					reject(`${file} already exist`);
				}
			}
		});
	});
}
