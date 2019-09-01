class QSBuilder {
	constructor() {
		this.parts = []
	}
	getString() {
		return encodeURIComponent(JSON.stringify(this.parts))
	}
	getLength() {
		return this.getString().length
	}
	addPart(part) {
		this.parts.push(part)
	}
	addLink(link) {
		this.parts.push({link})
	}
}

module.exports = QSBuilder
