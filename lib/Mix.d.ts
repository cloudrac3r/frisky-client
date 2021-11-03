declare class Mix {
	public id: number
	public data: import("./types").MixData | null
	public episode: import('./Episode') | null

	public constructor(id: number)

	public setData(data: import("./types").MixData): void
	public setEpisode(episode: import("./Episode")): void
}

export = Mix
