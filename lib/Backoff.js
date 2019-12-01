/**
 * @typedef {(n: number) => number} NextDelay
 */

void 0

/**
 * @type {NextDelay}
 */
function defaultNextDelay(n) {
	return n + 3e3
}

class Backoff {
	/**
	 * @param {{firstDelay?: number, nextDelay?: NextDelay, maxDelay?: number}} [settings]
	 */
	constructor(settings = {}) {
		this.lastEventFailedAt = null
		this.firstDelay = settings.firstDelay || 2e3
		this.nextDelay = settings.nextDelay || defaultNextDelay
		this.maxDelay = settings.maxDelay || 30e3
		this.currentDelay = null
	}

	reportSuccess() {
		this.lastEventFailedAt = null
		this.currentDelay = null
	}

	reportError() {
		this.lastEventFailedAt = Date.now()
		if (this.currentDelay == null) {
			this.currentDelay = this.firstDelay
		} else {
			this.currentDelay = Math.min(this.maxDelay, this.nextDelay(this.currentDelay))
		}
	}

	getTimeUntilNext() {
		if (this.lastEventFailedAt === null) return 0
		let timeSinceFailure = Date.now() - this.lastEventFailedAt
		return Math.max(0, this.currentDelay - timeSinceFailure)
	}

	wait() {
		return new Promise(resolve => {
			setTimeout(() => resolve(), this.getTimeUntilNext())
		})
	}
}

module.exports = Backoff
