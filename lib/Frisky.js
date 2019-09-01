const ws = require("ws")

const StreamManager = require("./StreamManager")
const MixManager = require("./MixManager")
const EpisodeManager = require("./EpisodeManager")
require("./util/testimports.js")(StreamManager, MixManager, EpisodeManager)

class Frisky {
	constructor() {
		this.managers = {
			stream: new StreamManager(this),
			mix: new MixManager(this),
			episode: new EpisodeManager(this)
		}

		this.socket = new ws("wss://api.beta.frisky.fm/v3/stations/nowplaying")
		this.socket.addEventListener("open", () => {
			if (process.env.FRISKY_DEBUG) console.log("Frisky WebSocket open")
			/*this.process([
				{
					id: 29201,
					path: 'nomossessions/nomossessions_aug2019_SebDhajje.mp3',
					mixes_id: { id: 47080, model: 'Mixes', link: 'v3/mixes/47080' },
					station: 'chill',
					duration: 3603,
					premiere: 0,
					fixed: 0,
					skip_time: null,
					scheduled_start_time: new Date(Date.now()-60*60*1000).toJSON(),
					scheduled_end_time: new Date(Date.now()+10000).toJSON(),
					air_start_time: null,
					air_end_time: null,
				},
				{
					id: 29222,
					path: 'channelnine/channelnine_july2013.mp3',
					mixes_id: { id: 21722, model: 'Mixes', link: 'v3/mixes/21722' },
					station: 'chill', // formerly 'classics'
					duration: 3622,
					premiere: 0,
					fixed: 0,
					skip_time: null,
					scheduled_start_time: '2019-09-01T15:25:58.000Z',
					scheduled_end_time: '2019-09-01T16:26:20.000Z',
					air_start_time: null,
					air_end_time: null,
					startTime: 1567351558000
				}
			])*/
		})
		this.socket.addEventListener("message", response => {
			try {
				let data = JSON.parse(response.data)
				if (process.env.FRISKY_DEBUG) console.log("Frisky sent "+data.length+" streams")
				this.process(data)
			} catch (e) {
				console.error(e)
			}
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
