const wumpfetch = require("wumpfetch")

const QSBuilder = require("./QSBuilder")
const Backoff = require("./Backoff")
require("./util/testimports.js")(QSBuilder, Backoff)

class JSONRequestError extends Error {
	/**
	 * @param {string} message
	 * @param {import("wumpfetch").WumpResponse} response
	 */
	constructor(message, response) {
		super(message)
		this.response = response
	}
}

class Requester {
	constructor() {
		this.queue = []
		this.inprogress = []
		this.requestingNow = false
		this.backoff = new Backoff()
	}

	request(req) {
		return new Promise(resolve => {
			req.resolve = resolve
			this.queue.push(req)
			this.scheduleQueue()
		})
	}

	scheduleQueue() {
		if (this.queue.length && !this.requestingNow) {
			this.requestingNow = true
			setImmediate(() => {
				this.execute()
			})
		}
	}

	execute() {
		let builder = new QSBuilder()
		while (this.queue.length && builder.getLength() < 2000) {
			let req = this.queue.shift()
			this.inprogress.push(req)
			builder.addLink(req.link)
		}
		this.try(builder)
	}

	try(builder) {
		if (process.env.FRISKY_DEBUG) console.log("Making request for "+this.inprogress.length+" items, "+this.queue.length+" still in queue")
		//console.log(JSON.stringify(builder.parts))
		let url = "https://api.beta.frisky.fm/v3/dispatch?models="+builder.getString()
		//console.log(url)
		wumpfetch
		.get(url)
		.header("Content-Type", "application/json")
		.send()
		.then(response => {
			let data
			try {
				data = response.json()
			} catch (e) {
				throw new JSONRequestError(e.message, response)
			}
			if (process.env.FRISKY_DEBUG) console.log("Received response with "+Object.values(data).reduce((acc, cur) => acc + cur.length, 0)+" items from models: "+Object.keys(data).join(", "))
			this.inprogress.forEach(req => {
				let item = data[req.model].find(i => i.id == req.id)
				req.resolve(item)
			})
			// Clean up
			this.inprogress = []
			this.requestingNow = false
			this.backoff.reportSuccess()
			this.scheduleQueue()
		})
		.catch(async rejection => {
			// Something bad happened. Dump the error details, wait a moment, and then retry
			console.error("Failed to request from Frisky\n", rejection)
			if (rejection instanceof JSONRequestError) {
				console.error("Status code:", rejection.response.statusCode)
				console.error("Body:\n", rejection.response.body.toString())
			}
			this.backoff.reportError()
			await this.backoff.wait()
			this.try(builder)
		})
	}
}

module.exports = Requester
