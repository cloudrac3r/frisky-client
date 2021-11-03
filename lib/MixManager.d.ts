declare class MixManager {
	public frisky: import("./Frisky")
	public store: Map<number, import("./Mix")>
	public mixRequester: import("./MixRequester")

	public constructor(frisky: import("./Frisky"))

	public addFromData(data: import("./types").MixData): void
	public getOrCreate(id: number): import("./Mix")
}

export = MixManager
