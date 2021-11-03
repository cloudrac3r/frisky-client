declare class Requester {
	public queue: { link: string; }[]
	public inprogress: { link: string; }[]
	public requestingNow: boolean
	public backoff: import("./Backoff")

	public request(req: { link: string; model: string; id: number }): Promise<any>
	public execute(): void
	public try(builder: import("./QSBuilder")): void
}

export = Requester
