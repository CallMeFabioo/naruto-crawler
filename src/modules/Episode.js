import { load } from 'cheerio';

export function parse(data) {
	const $ = load(data.body);
	const $episodes = $('.divisao');
	const $results = [];

	$episodes.map((i, x) => {
		const $episode = $(x);
		const $regex = /(?![Show\('])([\w])+/i;
		const $quality = $episode.find(`.formatr img:first-child`).attr('onclick').match($regex)[0];

		$results.push({
			episode: $episode.find('.epitxt > span').text().trim().replace(/Episódio/, 'Episódio - '),
			title: $episode.find('.epitxt > div').text().trim(),
			url: $episode.find(`#${$quality} .mirrors .mirrorsd .mirrorlinks div`).last().find('a').attr('href').replace(/(.+dir=)/, ''),
			isCanon: $episode.find('.boxr > img').attr('src').includes('canon')
		});
	});

	return $results;
}
