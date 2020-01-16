const ws = require("ws")
const {EventEmitter} = require("events")
const Backoff = require("./Backoff")

class ReconnectingWebSocket extends EventEmitter {
	constructor(url) {
		super()
		this.url = url
		this.closedByUs = false
		this.backoff = new Backoff({ firstDelay: 0, maxDelay: 15e3 })
		this.connect()
	}

	connect() {
		this.closedByUs = false

		this.socket = new ws(this.url)

		this.socket.addEventListener("open", () => {
			console.log("Frisky: WS connected")
			this.backoff.reportSuccess()
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
			console.log(`Frisky: WS disconnected: wasClean: ${event.wasClean}, code: ${event.code}, reason: ${event.reason}`)
			this.emit("close", "close", event)
			this.socket.removeAllListeners()
			if (!this.closedByUs) {
				this._attemptReconnect()
			}
		})

		this.socket.addEventListener("error", event => {
			console.log(`Frisky: WS error: type: ${event.type}, error:\n`, event.error)
			this.emit("close", "error", event)
			this.socket.removeAllListeners()
			if (!this.closedByUs) {
				this._attemptReconnect()
			}
		})
	}

	disconnect() {
		this.closedByUs = true
		this.socket.close()
	}

	async _attemptReconnect(event) {
		this.backoff.reportError()
		await this.backoff.wait()
		this.connect()
	}
}

module.exports = ReconnectingWebSocket
