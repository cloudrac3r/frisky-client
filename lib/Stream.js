/*
	Sample schema:
	{
		id: 29201,
		path: 'nomossessions/nomossessions_aug2019_SebDhajje.mp3',
		mixes_id: { id: 47080, model: 'Mixes', link: 'v3/mixes/47080' },
		station: 'chill',
		duration: 3603,
		premiere: 0,
		fixed: 0,
		skip_time: null,
		scheduled_start_time: new Date(Date.now()+10000).toJSON(),
		scheduled_end_time: new Date(Date.now()+60*60*1000+10000).toJSON(),
		air_start_time: null,
		air_end_time: null,
	}
*/

class Stream {
	/**
	 * @param {import("./types").StreamData} data
	 */
	constructor(data) {
		this.id = data.id

		this.data = null
		/**
		 * @type {import("./Mix")}
		 */
		this.mix = null

		this.setData(data)
	}
	/**
	 * @param {import("./types").StreamData} data
	 */
	setData(data) {
		this.data = data
		this.data.startTime = new Date(this.data.scheduled_start_time || this.data.air_start_time).getTime()
	}
	setMix(mix) {
		this.mix = mix
	}
	getTimeUntil(currentTime = Date.now()) {
		return this.data.startTime - currentTime
	}
}

module.exports = Stream
