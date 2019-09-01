const Episode = require("./Episode")
const EpisodeRequester = require("./EpisodeRequester")
require("./util/testimports")(EpisodeRequester, Episode)

class EpisodeManager {
	/**
	 * @param {import("./Frisky")} frisky
	 */
	constructor(frisky) {
		this.frisky = frisky

		/**
		 * @type {Map<number, Episode>}
		 */
		this.store = new Map()

		this.episodeRequester = new EpisodeRequester()
	}
	addFromData(data) {
		let id = data.id
		if (this.store.has(id)) {
			this.store.get(id).setData(data)
		} else {
			let episode = new Episode(id)
			episode.setData(data)
			this.store.set(id, episode)
		}
	}
	getOrCreate(id) {
		if (this.store.has(id)) {
			return this.store.get(id)
		} else {
			let episode = new Episode(id)
			this.store.set(id, episode)
			this.episodeRequester.update(episode)
			return episode
		}
	}
}

module.exports = EpisodeManager
