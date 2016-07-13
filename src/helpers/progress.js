import ProgressBar from 'progress';

export default function progress(file, contentLength) {
	const complete = '\u001b[42m \u001b[0m';
	const incomplete = '\u001b[41m \u001b[0m';
	const format = `${file} [:bar] :current of :total :percent :etas`;
	const options = {
		complete,
		incomplete,
		width: 20,
		total: contentLength
	};

	return new ProgressBar(format, options);
}
