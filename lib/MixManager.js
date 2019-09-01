const Mix = require("./Mix")
const MixRequester = require("./MixRequester")
require("./util/testimports")(MixRequester, Mix)

class MixManager {
	/**
	 * @param {import("./Frisky")} frisky
	 */
	constructor(frisky) {
		this.frisky = frisky

		/**
		 * @type {Map<number, Mix>}
		 */
		this.store = new Map()

		this.mixRequester = new MixRequester()
	}
	addFromData(data) {
		let id = data.id
		if (this.store.has(id)) {
			this.store.get(id).setData(data)
		} else {
			let mix = new Mix(id)
			mix.setData(data)
			this.store.set(id, mix)
			mix.setEpisode(this.frisky.managers.episode.getOrCreate(mix.data.episode_id.id))
		}
	}
	getOrCreate(id) {
		if (this.store.has(id)) {
			return this.store.get(id)
		} else {
			let mix = new Mix(id)
			this.store.set(id, mix)
			this.mixRequester.update(mix).then(() => {
				mix.setEpisode(this.frisky.managers.episode.getOrCreate(mix.data.episode_id.id))
			})
			return mix
		}
	}
}

module.exports = MixManager
