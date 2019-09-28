const ws = require("ws")

const StreamManager = require("./StreamManager")
const MixManager = require("./MixManager")
const EpisodeManager = require("./EpisodeManager")
const ReconnectingWebSocket = require("./ReconnectingWebSocket")
require("./util/testimports.js")(StreamManager, MixManager, EpisodeManager, ReconnectingWebSocket)

class Frisky {
	constructor() {
		this.managers = {
			stream: new StreamManager(this),
			mix: new MixManager(this),
			episode: new EpisodeManager(this)
		}

		this.socket = new ReconnectingWebSocket("wss://api.beta.frisky.fm/v3/stations/nowplaying")
		this.socket.on("data", data => {
			if (process.env.FRISKY_DEBUG) console.log("Frisky sent "+data.length+" streams")
			this.process(data)
		})
	}
	/**
	 * @param {import("./types").StreamData[]} data
	 */
	process(data) {
		data.forEach(item => {
			this.managers.stream.addData(item)
		})
	}
}

module.exports = Frisky
