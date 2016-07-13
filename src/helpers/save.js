import fs from 'fs';

export default function save(path, data, pretty = true) {
	data = pretty ? JSON.stringify(data, null, 2) : data;

	return fs.writeFile(path, data, (err) => {
		if(err) throw err;
	});
}
