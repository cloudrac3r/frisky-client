declare class StreamManager {
	public frisky: import("./Frisky")
	public store: Map<number, import("./Stream")>
	public stations: Map<string, import("./Station")>

	public constructor(frisky: import("./Frisky"))

	public addData(data: import("./types").StreamData): void
	public addToStation(stationName: string, id: number): void
	public getOrCreateStation(stationName: string): import("./Station")
}

export = StreamManager
