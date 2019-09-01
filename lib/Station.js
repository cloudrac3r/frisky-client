const events = require("events")

class Station {
	/**
	 * @param {import("./StreamManager")} streamManager
	 */
	constructor(streamManager) {
		this.streamManager = streamManager

		/**
		 * @type {Set<number>}
		 */
		this.streams = new Set()
		this.timeout = null
		this.events = new events.EventEmitter()
		this.previousNowPlayingID = null
	}
	/**
	 * @param {number} streamID
	 */
	addStream(streamID) {
		this.streams.add(streamID)
		this.recomputeTimeout()
	}
	recomputeTimeout() {
		clearTimeout(this.timeout)
		let upNext = this.findUpNext()
		if (upNext) {
			this.timeout = setTimeout(() => {
				if (process.env.FRISKY_DEBUG) {
					console.log("STREAM CHANGED")
					console.log("Current time: "+Date.now())
					console.log(this.getSchedule().slice(0, 3))
				}
				this.events.emit("changed")
				this.recomputeTimeout()
			}, upNext.getTimeUntil()+1500) // just to be safe (and also to give the mix a chance to appear I guess, but don't rely on this)
			if (process.env.FRISKY_DEBUG) console.log(`${this.streams.size} Set timer for ${upNext.getTimeUntil()}`)
		} else {
			let nowPlayingIndex = this.findNowPlayingIndex()
			if (nowPlayingIndex != null) {
				let nowPlayingID = this.getSchedule()[nowPlayingIndex].id
				if (this.previousNowPlayingID != null && nowPlayingID != this.previousNowPlayingID) {
					// song has changed
					setTimeout(() => {
						if (process.env.FRISKY_DEBUG) {
							console.log("STREAM CHANGED")
							console.log("Current time: "+Date.now())
							console.log(this.getSchedule().slice(0, 3))
						}
						this.events.emit("changed")
						this.recomputeTimeout()
					}, 1500) // give the mix a chance to appear I guess, but don't rely on this
				}
				this.previousNowPlayingID = nowPlayingID
				if (process.env.FRISKY_DEBUG) console.log(`(no up next? falling back to now playing ID: ${this.previousNowPlayingID})`)
			} else {
				if (process.env.FRISKY_DEBUG) console.log(`(no up next, and no now playing???? that's wack.)`)
			}
		}
	}
	getSchedule() {
		let streams = [...this.streams.values()]
		.map(id => this.streamManager.store.get(id))
		.sort((a, b) => (a.data.startTime - b.data.startTime))
		return streams
	}
	/**
	 * Return the last index where the time until is negative.
	 * Can return null.
	 * @returns {number|null}
	 */
	findNowPlayingIndex() {
		//
		let currentTime = Date.now()
		let schedule = this.getSchedule()
		let i;
		for (i = 0; i < schedule.length; i++) {
			let stream = schedule[i]
			let timeUntil = stream.getTimeUntil(currentTime)
			// find a positive time until
			if (timeUntil > 0) {
				if (i == 0) {
					// first item is in the future, so we don't know what is playing now
					return null
				} else {
					// hurrah! found where it was positive, so return the item before
					return i-1
				}
			}
		}
		// reached the end but all items were in the past
		// presumably the last item is the current one
		return schedule.length-1
	}
	findUpNext() {
		let currentTime = Date.now()
		return this.getSchedule().find(stream => stream.getTimeUntil(currentTime) > 0)
	}
}

module.exports = Station
