declare class Episode {
	public id: number
	public data: import("./types").EpisodeData | null

	public constructor(id: number)

	public setData(data: import("./types").EpisodeData): void
}

export = Episode
