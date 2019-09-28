const ws = require("ws")
const {EventEmitter} = require("events")

class ReconnectingWebSocket extends EventEmitter {
	constructor(url) {
		super()
		this.url = url
		this.closedByUs = false
		this.connect()
	}

	connect() {
		this.socket = new ws(this.url)

		this.socket.addEventListener("open", () => {
			console.log("Frisky: WS connected")
			this.emit("open")
		})

		this.socket.addEventListener("message", message => {
			this.emit("message", message)
			try {
				let data = JSON.parse(message.data)
				this.emit("data", data)
			} catch (e) {
				console.error(e)
			}
		})

		this.socket.addEventListener("close", event => {
			this.emit("close", event)
			console.log(`Frisky: WS disconnected: wasClean: ${event.wasClean}, code: ${event.code}, reason: ${event.reason}`)
			this.socket.removeAllListeners()
			if (!this.closedByUs) {
				this.connect()
			}
		})
	}

	disconnect() {
		this.closedByUs = true
		this.socket.close()
	}
}

module.exports = ReconnectingWebSocket
