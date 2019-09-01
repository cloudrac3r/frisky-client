const Requester = require("./Requester")
require("./util/testimports.js")(Requester)

class MixRequester {
	constructor() {
		this.requester = new Requester()
	}
	request(id) {
		return this.requester.request({
			link: "v3/mixes/"+id,
			model: "Mixes",
			id: id
		})
	}
	/**
	 * @param {import("./Mix")} mix
	 */
	update(mix) {
		return this.request(mix.id).then(data => {
			mix.setData(data)
		})
	}
}

module.exports = MixRequester
