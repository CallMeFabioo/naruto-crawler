import Crawler from './Crawler';

const urls = [];

for (let i = 1; i <= 18; i++) {
	urls.push(`http://boruto.com.br/episodios/shippuuden${i}.html`);
}

new Crawler(urls).scrape();
