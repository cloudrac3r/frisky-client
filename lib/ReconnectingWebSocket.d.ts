import { EventEmitter } from "events"

declare class ReconnectingWebSocket extends EventEmitter {
	public url: string
	public closedByUs: boolean
	public backoff: import("./Backoff")
	public socket: import("ws") | undefined

	public constructor(url: string)

	private _attemptReconnect(): Promise<void>

	public connect(): void
	public disconnect(): void
}

export = ReconnectingWebSocket
