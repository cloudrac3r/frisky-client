const wumpfetch = require("wumpfetch")

const QSBuilder = require("./QSBuilder")

class Requester {
	constructor() {
		this.queue = []
		this.inprogress = []
		this.requestingNow = false
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
		if (process.env.FRISKY_DEBUG) console.log("Making request for "+this.inprogress.length+" items, "+this.queue.length+" still in queue")
		//console.log(JSON.stringify(builder.parts))
		let url = "https://api.beta.frisky.fm/v3/dispatch?models="+builder.getString()
		//console.log(url)
		wumpfetch
		.get(url)
		.header("Content-Type", "application/json")
		.send()
		.then(response => {
			let data = response.json()
			if (process.env.FRISKY_DEBUG) console.log("Received response with "+Object.values(data).reduce((acc, cur) => acc + cur.length, 0)+" items from models: "+Object.keys(data).join(", "))
			this.inprogress.forEach(req => {
				let item = data[req.model].find(i => i.id == req.id)
				req.resolve(item)
			})
			// Clean up
			this.inprogress = []
			this.requestingNow = false
			this.scheduleQueue()
		})
	}
}

module.exports = Requester
