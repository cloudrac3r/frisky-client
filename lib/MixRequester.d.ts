declare class MixRequester {
	public requester: import("./Requester")

	public request(id: number): Promise<import("./types").MixData>
	public update(mix: import("./Mix")): Promise<void>
}

export = MixRequester
