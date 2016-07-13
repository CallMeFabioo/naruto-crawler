'use strict';

import got from 'got';
import fileNotExists from './helpers/exists';
import { yellow } from 'chalk';
import { success, error } from './helpers/message';
import { download, filename } from './helpers/download';
import * as Episode from './modules/Episode';
import * as Torrent from './modules/Torrent';

export default class Crawler {

	constructor(url) {
		this.url = url;
		this.episodes = [];
		this.torrents = [];
		this.promises = [];
	}

	scrape() {
		this.url.map((url) => {
			got(url)
			.then(res => this.episodes = Episode.parse(res))
			.then(res => this.startDownload())
			.then(res => this.getTorrentLinks())
			.catch(err => error(err));
		});
	}

	getTorrentLinks() {
		this.episodes.map((episode) => {
			if(episode.isCanon) {
				this.promises.push(
					got(episode.url).then((res) => {
						this.torrents.push(Torrent.parse(res));
					})
					.catch(err => error(err))
				);
			}
		});
	}

	startDownload() {
		Promise.all(this.promises).then(() => {
			this.torrents.map((torrent) => {
				fileNotExists(filename(torrent)).then(() => {
					download(torrent)
						.then(res => success(res))
						.catch(err => error(err));
				})
				.catch(err => error(err));
			});
		})
		.catch(err => error(err));
	}
}
