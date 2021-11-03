type NextDelay = (n: number) => number
declare class Backoff {
	public lastEventFailedAt: number | null
	public firstDelay: number
	public nextDelay: NextDelay
	public maxDelay: number
	public currentDelay: number | null

	public constructor(settings?: { firstDelay?: number; nextDelay?: NextDelay; maxDelay?: number; })

	public reportSuccess(): void
	public reportError(): void
	public getTimeUntilNext(): number
	public wait(): Promise<number>
}

export = Backoff
