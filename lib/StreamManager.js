const Stream = require("./Stream")
const Station = require("./Station")
require("./util/testimports")(Stream, Station)

class StreamManager {
	/**
	 * @param {import("./Frisky")} frisky
	 */
	constructor(frisky) {
		this.frisky = frisky

		/**
		 * @type {Map<number, Stream>}
		 */
		this.store = new Map()
		/**
		 * @type {Map<string, import("./Station")>}
		 */
		this.stations = new Map()
	}
	/**
	 * @param {import("./types").StreamData} data
	 */
	addData(data) {
		let id = data.id
		if (this.store.has(id)) {
			this.store.get(id).setData(data)
		} else {
			// Make a stream
			let stream = new Stream(data)
			this.store.set(id, stream)
			// Make a mix
			let mixID = data.mixes_id.id
			stream.setMix(this.frisky.managers.mix.getOrCreate(mixID))
			// Make a station
			this.addToStation(data.station, id)
		}
	}
	addToStation(stationName, id) {
		let station = this.getOrCreateStation(stationName)
		station.addStream(id)
	}
	getOrCreateStation(stationName) {
		if (this.stations.has(stationName)) {
			return this.stations.get(stationName)
		} else {
			let station = new Station(this)
			this.stations.set(stationName, station)
			// this part shouldn't be required, but it can't hurt, right? :)
			this.store.forEach(stream => {
				if (stream.data.station == stationName) {
					station.addStream(stream.id)
				}
			})
			return station
		}
	}
}

module.exports = StreamManager
