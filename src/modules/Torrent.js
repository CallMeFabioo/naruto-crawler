import { load } from 'cheerio';

export function parse(data) {
	const $ = load(data.body);
	const $item = $('head');
	const $regex = /(href=")(.*)(">)+/i;

	return $item.find('script').text().match($regex)[2];
}
