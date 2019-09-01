const Requester = require("./Requester")
require("./util/testimports.js")(Requester)

class EpisodeRequester {
	constructor() {
		this.requester = new Requester()
	}
	request(id) {
		return this.requester.request({
			link: "v3/episodes/"+id,
			model: "Episodes",
			id: id
		})
	}
	/**
	 * @param {import("./Episode")} episode
	 */
	update(episode) {
		return this.request(episode.id).then(data => {
			episode.setData(data)
		})
	}
}

module.exports = EpisodeRequester
