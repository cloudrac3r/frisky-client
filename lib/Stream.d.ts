declare class Stream {
	public id: number
	public data: import("./types").StreamData | null
	public mix: import("./Mix") | null

	public constructor(data: import("./types").StreamData)

	public setData(data: import("./types").StreamData): void
	public setMix(mix: import("./Mix")): void
	public getTimeUntil(currentTime?: number): number
}

export = Stream
