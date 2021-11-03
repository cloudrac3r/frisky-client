declare class EpisodeManager {
	public frisky: import("./Frisky")
	public store: Map<number, import("./Episode")>
	public episodeRequester: import("./EpisodeRequester")

	public constructor(frisky: import("./Frisky"))

	public addFromData(data: import("./types").EpisodeData): void
	public getOrCreate(id: number): import("./Episode")
}

export = EpisodeManager
