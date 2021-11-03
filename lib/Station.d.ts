declare class Station {
	public streamManager: import("./StreamManager")
	public streams: Set<number>
	public timeout: NodeJS.Timeout | null
	public events: import("events").EventEmitter
	public previousNowPlayingID: number | null

	public constructor(streamMananger: import("./StreamManager"))

	public addStream(streamID: number): void
	public recomputeTimeout(): void
	public getSchedule(): import("./Stream")[]
	public findNowPlayingIndex(): number | null
	public findUpNext(): import("./Stream")
}

export = Station
