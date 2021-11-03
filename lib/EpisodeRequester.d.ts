declare class EpisodeRequester {
	public requester: import("./Requester")

	public request(id: number): Promise<import("./types").EpisodeData>
	public update(episode: import("./Episode")): Promise<void>
}

export = EpisodeRequester
